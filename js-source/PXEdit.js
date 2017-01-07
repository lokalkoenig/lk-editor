/* 
 * PXEdit Version 1.0
 * @author maiktito
 */

 var PDFForm = null;

(function ($) {
    "use strict";
        
        
      PDFForm = {
        // Current layout  
        current_layout: null,
       
       // Version
       version: 1.01,
       
       // Version Date
       version_date: '2017-01-07',
       
        // Data
        data: null,
        
        // Changed
        changed: false,
        
        // Editor can change Layout
        change_layout: true,
        
        // Can change input
        change_input: true,
        
        options: {
          'verlagsmodus': 1,
          'change_catgegory': 0,
          'message_on_setup': '',
          'change_layout': 1,
          'change_input': 1,
          'change_layout_via_menu': 0,
          'sample_data': {},
          'image_presets': {},
        },
        
        callback_url: '',
        
        // Preset
        preset: '',
        
        // Formats
        formats: {
            'editor': 'Editor', 
            'image': 'Bild', 
            'table': 'Tabelle'
        },
        
        setPreset: function(value){
            this.preset = value;
        },
        
        setChanged: function(){
            this.changed = true;
        },
        
        // Sets Editor options
        setOptions: function(options){
            for (var key in options) {
                this.options[key] = options[key];
            }
        },
        
        /**
         * Performs an AJAX request
         * 
         * @param {Object} send_data
         * @param {function} callback
         */
        performAjax: function(send_data, callback){
            
          this.loading();  
          var reference = this;
          
           $.ajax({
                dataType: "json",
                method: "POST",
                url: this.callback_url,
                data: send_data,
                success: function(data){
                    if(data.error){
                      reference.createMessage(data.message);
                      return ;
                    }
                  
                    callback(data);
                },
                error: function(xhr, message){
                   reference.createMessage("<strong>Fehler:</strong> " + message);
                }
          });
        },
        
        /**
         * Resets the Editor-Interface 
         */
        resetEditor: function(){
          this.changed = false;
          
          $('#PXEdit #PXEdit-change-input, #current-layout').hide();
          $('#PXEdit #footnote').html('<div class="widget"></div>');  
          $('#PXEdit #pdf-visibile-editor').html('');
             
          this.setPreset('');
          
          // Change layout
          if(this.options.change_layout === 1 || this.options.change_layout_via_menu === 1){
            $('#PXEdit #PXEdit-change-input').show();
          }
          
          // Show input-changer 
         if(this.options.change_input === 1){
            $('#PXEdit #current-layout').show();
          }
        },
        
        /**
         * Returns the active layout
         * 
         * @returns {string}
         */
        getActiveLayout: function(){
          return this.current_layout;
        },
        
        /**
         * Sets the current layout
         * 
         * @returns {undefined}
         */
        setActiveLayout: function(layout){
          this.current_layout = layout;
        },
        
        
        /**
         * Gets the current selected Mockup
         * 
         * @returns {string} Mockup
         */
        getMockup: function(){
          var layout = this.getActiveLayout();
          return $('.layout-template.' + layout).html();
        },
        
        /**
         * Shows the Callout to change the layout 
         */
        showLayoutCallout : function(){
          
          var msg = '<p><strong>Wählen Sie ein Layout für das Dokument aus</strong></p>\n\
                    <p>Das Layout können Sie später jederzeit über <button class="btn btn-default btn-sm" style="pointer-events: none;"><span class="glyphicon glyphicon-cog"></span></button> Einstellungen verändern.</p>\n\
                    <hr /><div class="layouts small-format-presentation">'+ jQuery('#available-layouts').html() +'</div>\n\
                    <hr /><button type="button" class="btn btn-default btn-close"><span class="glyphicon glyphicon-ok"></span> Speichern und Weiter</button>';
          
          this.createMessage(msg);
          
          // get active layout
          var current = this.getActiveLayout();
          $('.layout-menu .layouts .layout-template[data-id="'+ current +'"]').addClass('active');
        },
        
        /**
         * Adds the necessary listeners
         * to the editor
         */
        addListener: function() {
          var reference = this;
          
            // cta change layout
            $('#PXEdit #PXEdit-change-input').click(function(){
                if(reference.options.change_layout){
                  reference.openSettings();
                  return ;
                }
                
                if(reference.options.change_layout_via_menu){
                  reference.showLayoutCallout();
                }
            });

            // close
            $('#PXEdit #document-reset').click(function(){
              if(reference.changed === false){
                  $('#PXEdit').fadeOut();
              }
              else {
                 $("#PXEdit").createMessage('Sie haben ungespeicherte Änderungen. Möchten Sie den Editor wirklich beenden?<br /></br ><button class="btn btn-danger" onclick=" $(\'#PXEdit\').fadeOut();">Änderungen verwerfen</button>');  
              }
            });

            // change layout
            $('#PXEdit .layout-menu').on("click", ".layout-template:not(.active)", function(){
               $('#PXEdit .layout-menu .layout-template.active').removeClass('active');
               $(this).addClass('active');

              // call layout-changes to set the new Layout
              reference.saveLayoutChanges(this);
          });

          $('#PXEdit-save-document').click(function(){
              reference.saveTitleForm();
          });
        
        },
        
        /**
         * Sets up the Editor-App
         * 
         * @param {object} data
         * @returns {undefined}
         */
        setup: function(data, layouts){
            this.resetEditor();
            
            $('#available-layouts').html(layouts);
            
            if(this.options.verlagsmodus){
                $('#dokument-title').val(data.title);
                $('#dokument-freigabe').prop('checked', false);
                
                if(data.active){
                    $('#dokument-freigabe').prop('checked', true);
                }
            }
            
            this.setPreset(data.preset);
            
            $('#PXEdit').fadeIn();
            $('#PXEdit').removeClass('loading');
            
            if(this.options.message_on_setup){
              this.createMessage(this.options.message_on_setup);
            }
            
            $('#PXEdit #footnote .widget').editable({
               type: 'text',
            });
            
            this.setActiveLayout(data.layout);
            this.createWidgets(data.content);
            
            if(typeof data.sample === 'object'){
                this.setOptions({'sample_data' : data.sample});
                this.showLayoutCallout();
            }
        },
        
        saveAndClose: function(){
            
            if(this.options.verlagsmodus){
                $('#saveModal').modal('hide');
            }
            
            var reference = this;
            var data = this.generateSave();
            data.preset = this.preset;
            
            $.ajax({
                type: "POST",
                url: this.callback_url + "?save=1",
                data: {'data': data},
                success: function(){
                    reference.createMessage("Das Dokument wurde gespeichert.", 2000); 
                    
                    setTimeout(function(){
                       jQuery('#PXEdit').fadeOut();
                    }, 500);
                },
                dataType: 'json'
              });
        },
        generateSave: function(){
            
            var data = {};
            var x = 0;
            
            $('.row-editor .widget').each(function(){
                var type = $(this).attr('data-widget');
                
                if(type == 'online_medium_chooser'){
                  data[x] = $(this).createOnlineMediumChooserWidget('serialize');
                }
                
                if(type == 'editor'){
                    data[x] = {
                      'widget': 'editor',
                      'value': $(this).find('.editable').html()
                    };
                }
                
                if(type == 'image'){
                    data[x] = $(this).createImageWidget('serialize');
                }
                
                if(type == 'table'){
                    data[x] = $(this).createTableWdiget('serialize');
                }
                
                data[x].id = (x + 1);
                x++;    
            });
           
            var save_data = {
              'title':  $('#dokument-title').val(),
              'active': $('#dokument-freigabe').prop('checked'),
              'layout': $('.row-editor').attr('data-layout'),
              'footnote': $('#footnote').text(),
              'content': data,
              'preset': this.preset
            };
            
            
        return save_data;    
        },
        saveTitleForm: function(){
           $('#dokument-title').parent().removeClass('has-error');
           
           if($('#dokument-title').val() === ""){
                $('#dokument-title').parent().addClass('has-error');
                $('#dokument-title').focus();
                return ;
           }
            
           this.saveAndClose();
        },
        
        /**
         * Creates the necessary widgets
         * 
         * @param {object} data
         * @returns {undefined}
         */
        createWidgets: function(data){
            // reset widgets
            jQuery('#PXEdit .row-editor').remove();
            jQuery('#PXEdit #pdf-visibile-editor').html("<div class='row-editor'><div>");
            jQuery('#PXEdit .row-editor').attr("data-layout", this.getActiveLayout());
            jQuery('#PXEdit .row-editor').html(this.getMockup());
            
            var reference = this;
            this.data = data;
           
            var x = 0;
            jQuery('.row-editor .widget').each(function(){
               if(typeof data[x] === "undefined"){
                   reference.openSettings();
               } 
               else {
                   reference.createNewWidget(this, data[x]);
               } 
               x++;
            });
            
            // if Editor has still loading state
            this.loading(-1);
        },
     
        // saves the layout and rerender
        saveLayoutChanges: function (element){
            var save = this.generateSave();
            var data = save.content;
            
            var new_data = {};
            var layout = $(element).attr('data-id');
            
            this.changed = true;
            var reference = this;
            
            var x = 0;
            $(element).find('.widget').each(function(){
              var widget_type = $(this).attr('data-widget');
              var widget_type_change = $(this).attr('data-change-widget');
              
              if(widget_type_change){
                widget_type = widget_type_change;
              }
              
              // find the widget-type in the sample-data
              if(!widget_type){
                widget_type = reference.options.sample_data[layout][x]['widget'];
              }
              
              var new_data_item = {'widget': widget_type};
              var result = reference.searchWidget(widget_type, data, x, true);
              
              if(result){
                  new_data_item = result;
              }
              else {
                // get sample-data if type is not matching
                if(typeof reference.options.sample_data[layout] === 'object'){
                    var result = reference.searchWidget(widget_type, reference.options.sample_data[layout], x);
                    
                    if(result){
                      new_data_item = result;
                    }
                }
              }
              
              new_data[x] = new_data_item;
              x++;
            });
            
            this.loading(500);
            this.setActiveLayout(layout);
            this.createWidgets(new_data);
        },
        
        loading: function(timeout){
           
          if(typeof timeout === 'number'){
            if(timeout < 0){
              $('#PXEdit').removeClass('loading');   
              return ;
            }
            
            setTimeout(function(){
               $('#PXEdit').removeClass('loading');   
            }, timeout);
           } 
          
          $('#PXEdit').addClass('loading');   
        },
        
        /**
         * Creates a message
         * 
         * @param {string} $message
         * @param {number} timeout
         */
        createMessage: function($message, timeout){
           $("#PXEdit").createMessage($message, timeout);
        },
        
        
        /**
         * Creates a new input-widget
         * 
         * @param {reference} element
         * @param {Object} options
         * @returns {undefined}
         */
        createNewWidget: function(element, options){
          $(element).attr('data-widget', options.widget);

          if(options.widget === 'image'){
            $(element).createImageWidget(options);
          }

          if(options.widget === 'editor'){
            $(element).createEditorWdiget(options);
          }
        
          if(options.widget === 'table'){
            $(element).createTableWdiget(options);
          }
          
          if(options.widget === 'online_medium_chooser'){
            $(element).createOnlineMediumChooserWidget(options);
          }
          
          if(!$(element).hasClass("widget-flexibile")){
            $(element).children('div').height($(element).height());
          }
        },
        
        /**
         * TBI
         * 
         * @param {type} widget_type
         * @param {type} data
         * @returns {Boolean}
         */
        searchWidget: function(widget_type, data, position, mustbeposition){
          
          if(typeof data !== "object"){
            return false;
          }
          
          var length = Object.keys(data).length;
          
          if(typeof position === 'number'){
            for (var i = 0; i < length; i++) {
              if(widget_type === data[i]['widget'] && i === position){
                return data[i];
              }
            } 
          }
          
          if(typeof mustbeposition === 'boolean' && mustbeposition){
            return false;
          }
          
          for (var i = 0; i < length; i++) {
            if(widget_type === data[i]['widget']){
              return data[i];
            }
          }
          
        return false;
        },
        
        openSettings: function(options){
            
            var layout = this.current_layout;
            var data = this.data;
            
            if(typeof options === 'object'){
                 layout = options['layout'];
                 data = options['content'];
            }
            
            var reference = this;
            
            // take the current layout from the repo
            $('#pdf-current-layout').html(jQuery('#available-layouts .layout-template[data-id=' +  layout + ']').clone());
            $('#layoutModal .col-select').hide();
            
            // add available layouts
            $('#pdfdoc-alter-layout').html(jQuery('#available-layouts').html());
            
            $('#pdfdoc-alter-layout .layout-template[data-id=' +  layout + ']').addClass('active');
            $('#layoutModal').modal('show');
            
            $('#pdf-current-layout .widget').each(function(){
                   var index = parseInt($(this).attr("data-index")) - 1;
                   
                   $(this).attr("data-change-widget", "");
                   
                   if(typeof data[index] === "undefined"){
                        $(this).attr("data-widget", "").html("<span class='label label-primary'>???</span>");
                   }
                   else {
                       $(this).attr("data-widget", data[index].widget);
                       var label = reference.formats[data[index].widget];
                       
                       $(this).html("<span class='label label-primary'>" +  label + "</span>");
                   }
            });
            
            
            // Click a widget
            $('#pdf-current-layout .widget').click(function(){
                $('#pdf-current-layout .widget.selected').removeClass('selected');
               
                $(this).addClass("selected");
                var widget_type = $(this).attr('data-widget');
                var widget_changed = $(this).attr("data-change-widget");
                
                $(".col-select button").removeClass('btn-primary active');
                $(".col-select button[data-widget='"+ widget_type +"']").addClass('btn-primary');
                $(".col-select button[data-widget='"+ widget_changed +"']").addClass('active');
                $(".col-select").show();
            });
            
            // open first one
            $('#pdf-current-layout .widget:first-child').click();
            $('#pdfdoc-alter-layout .layout-template:not(.active)').click(function(event){
                   event.stopPropagation();
                   
                  var id = $(this).attr('data-id');
                  var content = {};
                  if(typeof reference.options.sample_data[id]){
                    content = reference.options.sample_data[id];
                  }
                  
                  $("#document-save-settings").show();
                  reference.openSettings({'layout': $(this).attr('data-id'), 'content': content });
            });
            
            // Click on a change button
            $('.col-select button').click(function(event){
                event.stopImmediatePropagation();
                
                $('.col-select button').removeClass('active');
                $(this).addClass('active');
                
                var element = $('#pdf-current-layout .widget.selected');
                var selected = $(this).attr('data-widget');
                var current = $(element).attr('data-widget');
                
                $(element).children('.label').text(PDFForm.formats[selected]); 
                $(element).attr("data-change-widget", "").removeClass('changed');
                
                if(current !== selected){
                    $(element).attr("data-change-widget", selected).addClass('changed');
                }
                
                $("#document-save-settings").show();
            });
            
            $('#document-save-settings').click(function(event){
                // check if all the fields are done
                var isError = false;
                event.stopImmediatePropagation();
                
                $('#pdf-current-layout .widget').each(function(){
                    var widget_type = $(this).attr('data-widget');
                    var widget_type_changed = $(this).attr('data-change-widget');
                    
                    if(widget_type === '' && widget_type_changed === ''){
                        isError = true;
                    }
                });
                
                if(isError === true){
                    reference.createMessage('Bitte definieren Sie alle Regionen Ihres Layouts.');
                    return ;
                }
                
                
                $(this).off();
                
                reference.saveLayoutChanges($('#pdf-current-layout .layout-template'));
                
                $('#layoutModal').modal('hide');
                $("#document-save-settings").show();
            });
        }
    };
    
    
    
    $(document).ready(function(){
        
        // react on Document-Create
        $('.PXEdit-create').click(function(){
            PDFForm.loading();
            var preset = $(this).attr('data-preset');
            
            $.ajax({
                dataType: "json",
                url: PDFForm.callback_url,
                data: {'preset': preset},
                success: function(data){
                    
                    if(data.error){
                      PDFForm.createMessage(data.message);
                      return ;
                    }
                  
                    PDFForm.setPreset(preset);
                    PDFForm.setOptions(data.options);
                    PDFForm.setup(data.values, data.layouts);
                }
            });
        });
    });
    
     // Editable Defaults
    $.fn.editable.defaults.mode = "inline";
    $.fn.editable.defaults.onblur = "submit";
    $.fn.editable.defaults.emptytext = "";
    
    $.trumbowyg.svgPath = 'css/icons.svg';
    
    // selfregister events & listeners
    jQuery(document).ready(function(){
      PDFForm.addListener();
      PDFForm.callback_url = $("#PXEdit").attr('data-callback');
      console.log('+__ Welcome to PXEdit v' + PDFForm.version  + ' ('+ PDFForm.version_date + ') __+');
      
      // debug
      document.onkeyup = function(e) {
            // CTR + I
            if(e.ctrlKey && e.keyCode == 73) {
                var data = PDFForm.generateSave();
                console.clear();
                console.log(JSON.stringify(data, null, 4));
            }
            // CTR + Q
            if(e.ctrlKey && e.keyCode == 81) {
                console.clear();
                console.log(JSON.stringify(PDFForm, null, 4));
            }
      };
      
      $('.layout-menu').on('click', '.close, .btn-close', function(){
          $(this).closest('.layout-menu').removeClass('open'); 
      });
    });  
    
    
    /**
     * Creates a message, which can be auto-closed automatically
     * 
     * @param {string} message
     * @param {number} autoclose
     */
    $.fn.createMessage = function(message, autoclose){
        $('.layout-menu').html('<span class="close">&times;</span>' + message);
      
        setTimeout(function(){
            $('.layout-menu').addClass('open');
        }, 200);
        
        if(typeof autoclose === 'number'){
            setTimeout(function(){
              $('.layout-menu').removeClass('open');
            }, autoclose);
        }
    };
    
    
    
    
}( jQuery ));    

