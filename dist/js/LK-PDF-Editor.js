/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 var PDFForm = null;

(function ($) {
    "use strict";
        
        
      PDFForm = {
        // Current layout  
        current_layout: null,
       
        // Data
        data: null,
        
        // image formats
        image_presets: {},
        
        // Changed
        changed: false,
        
        // Editor can change Layout
        change_layout: true,
        
        // Can change input
        change_input: true,
        
        options: {
          'verlagsmodus': 1,
          'change_catgegory': 0,
          'change_layout': 1,
          'change_input': 1,
          'sample_data': {}
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
         * Sets up the Editor-App
         * 
         * @param {object} data
         * @returns {undefined}
         */
        setup: function(data, layouts){
            this.callback_url = $("#PXEdit").attr('data-callback'); //'callback.php';
            
            if(typeof data == 'string' && data == 'loading'){
                $('#PXEdit').addClass('loading');
                this.changed = false;
                this.setPreset('');
                
                $('#pdf-visibile-editor').html('');
                $('#PXEdit').fadeIn();
                return ;
            }
            
            $('#available-layouts').html(layouts);
            $('#PXEdit').attr('data-change-layout', this.options.change_layout);
            $('#PXEdit').attr('data-change-input', this.options.change_input);
            
            this.changed = false;
            
            if(this.options.verlagsmodus){
                $('#dokument-title').val(data.title);
                $('#dokument-freigabe').prop('checked', false);
                
                if(data.active){
                    $('#dokument-freigabe').prop('checked', true);
                }
            }
            
            $('#PXEdit').fadeIn();
            $('#PXEdit').removeClass('loading');
            
            this.init(data);
        },
        
        saveAndClose: function(){
            
            if(this.options.verlagsmodus){
                $('#saveModal').modal('hide');
            }
            
            var data = this.generateSave();
            data.preset = this.preset;
            //data.debug = this;
            
            $.ajax({
                type: "POST",
                url: this.callback_url + "?save=1",
                data: {'data': data},
                success: function(){
                    $('#PXEdit').fadeOut();
                    $('#PXEdit').createMessage("Wir speichern die Daten gerade."); 
                },
                dataType: 'json'
              });
        },
        generateSave: function(){
            
            var data = {};
            var x = 0;
            
            $('.row-editor .widget').each(function(){
                var type = $(this).attr('data-widget');
                
                if(type == 'editor'){
                    data[x] = {
                      'widget': 'editor',
                      'value': $(this).find('.editable').html()
                    };
                }
                
                if(type == 'image'){
                    data[x] = {
                      'widget': 'image',
                      'url': $(this).find('img').attr('src'),
                      'fid': $(this).children('.editor-widget-image').attr('data-fid'),
                      'preset': $(this).children('.editor-widget-image').attr('data-image-present'),
                    };
                }
                
                if(type == 'table'){
                    data[x] = $(this).createTableWdiget('serialize');
                }
                
                x++;    
            });
           
            var save_data = {
              'title':  $('#dokument-title').val(),
              'active': $('#dokument-freigabe').prop('checked'),
              'layout': $('.row-editor').attr('data-layout'),
              'footnote': $('#footnote').text(),
              'content': data
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
        init: function(saved_content){
            this.current_layout = saved_content.layout;
            this.data = saved_content.content;
            
            // footnote
            $('#footnote').html('<div class="widget"></div>');  
            $('#footnote .widget').editable({
               type: 'text',
            });
            
            jQuery('.row-editor').remove();
            jQuery('#pdf-visibile-editor').html("<div class='row-editor'><div>");
            
            if(typeof saved_content.mockup === 'string'){
               jQuery('.row-editor').attr("data-layout", saved_content.layout).html(saved_content.mockup);
            }
            else {
               if(saved_content.layout === ''){
                   this.openSettings();
                   return ;
                } 
                
               jQuery('.row-editor').attr("data-layout", saved_content.layout).html(jQuery('#available-layouts .layout-template.' + saved_content.layout).html());
            }
            
            
            if(typeof saved_content.sample == 'object'){
                this.options['sample_data'] = saved_content.sample;   
            
                jQuery('.layout-menu').addClass('open');
                jQuery('.layout-menu .layouts').html(jQuery('#available-layouts').html());
                
                jQuery('.layout-menu .layouts .layout-template[data-id="'+ saved_content.layout +'"]').addClass('active');
                jQuery('.row-editor').addClass('editor-' +  saved_content.layout);
            }
            
            var data = saved_content.content;
            var reference = this;
            var x = 0;
            jQuery('.row-editor .widget').each(function(){
               if(typeof data[x] === "undefined"){
                   reference.openSettings();
               } 
               else {
                   $(this).createWidget(data[x]);
               } 
               x++;
            });
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
              
              var new_data_item = {};
              var result = reference.searchWidget(widget_type, data);
             
              //console.log(result);
              //typeof data[x] === 'object' && data[x]['widget'] === widget_type
              if(result){
                  new_data_item = result;
              }
              else {
                // get sample-data if available
                new_data_item.widget = widget_type;
                
                // get sample-data if type is not matching
                if(
                  typeof reference.options.sample_data[layout] === 'object' 
                  && reference.options.sample_data[layout][x]['widget'] === widget_type
                  ){
                    new_data_item = reference.options.sample_data[layout][x];
                }
              }
              
              new_data[x] = new_data_item;
              x++;
            });
            
            this.loading(500);
            this.init({'layout': layout, 'content': new_data });
        },
        
        loading: function(timeout){
           $('#PXEdit').addClass('loading');   
          
           setTimeout(function(){
               $('#PXEdit').removeClass('loading');   
           }, timeout);
        },
        
        /**
         * TBI
         * 
         * @param {type} widget_type
         * @param {type} data
         * @returns {Boolean}
         */
        searchWidget: function(widget_type, data){
          
          if(typeof data !== "object"){
            return false;
          }
          
          var length = Object.keys(data).length;
          
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
                
                $('#pdf-current-layout .widget.selected').changeWidgetForm($(this).attr('data-widget'));
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
                    $('#PXEditor').PXEditor('message', 'Bitte definieren Sie alle Regionen Ihres Layouts.');
                    return ;
                }
                
                
                $(this).off();
                
                reference.saveLayoutChanges($('#pdf-current-layout'));
                $('#layoutModal').modal('hide');
                $("#document-save-settings").show();
            });
        }
    };
    
    $(document).ready(function(){
        $('body').on("click", ".message-overlay", function(){
            $(this).fadeOut(200, function(){
                $(this).remove();
            });
        });
        
        $('.alert .close').click(function(){
            $(this).parent().addClass('slideUp');
        });
        
        $('#document-reset').click(function(){
            if(PDFForm.changed == false){
                $('#PXEdit').fadeOut();
            }
            else {
               $(".pdf").createMessage('Sie haben ungespeicherte Änderungen. Möchten Sie den Editor wirklich beenden?<br /></br ><button class="btn btn-danger" onclick=" $(\'#PXEdit\').fadeOut();">Änderungen verwerfen</button>');  
            }
        });
        
     $.fn.PXEditor = function(action, message) {
         
         if(action === 'changed'){
             PDFForm.setChanged();
         }
         
         if(action === 'message'){
            $("#PXEdit").createMessage(message);
         }
      };  
      
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
      }
        
        $('#PXEdit .close-layout-menu').click(function(){
            $('.layout-menu').removeClass('open');
        });
        
        $('#PXEdit .layout-menu').on("click", ".layout-template:not(.active)", function(){
             $('#PXEdit .layout-menu .layout-template.active').removeClass('active');
             $(this).addClass('active');
            
            // call layout-changes to set the new Layout
            PDFForm.saveLayoutChanges(this);
        });
        
        $('#PXEdit-save-document').click(function(){
            PDFForm.saveTitleForm();
        });
        
        // react on Document-Create
        $('.PXEdit-create').click(function(){
            PDFForm.setup('loading');
            var preset = $(this).attr('data-preset');
            PDFForm.setPreset(preset);
            
            $.ajax({
                dataType: "json",
                url: PDFForm.callback_url,
                data: {'preset': preset},
                success: function(data){
                     PDFForm.setOptions(data.options);
                     PDFForm.setup(data.values, data.layouts);
                }
            });
        });
    });
}( jQuery ));    

