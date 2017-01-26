/*
 * PXEdit Version 1.0
 * @author maiktito
 */

 var PDFForm = null;
$ = jQuery;

(function ($) {
    "use strict";


      PDFForm = {
       // Current layout
       current_layout: null,

       // callback
       cb: function(){},

       // Version
       version: '0.1.4',

       // Version Date
       version_date: '2017-01-11',

        // Data
        data: null,

        // Changed
        changed: false,

        // Editor can change Layout
        change_layout: true,

        // Can change input
        change_input: true,

        options: {
          'id': 0,
          'action': '',
          'page_title': '',
          'footnote': 1,
          'verlagsmodus': 1,
          'change_catgegory': 0,
          'message_on_setup': '',
          'change_layout': 1,
          'change_input': 1,
          'change_layout_via_menu': 0,
          'sample_data': {},
          'image_presets': {},
        },

        inputs: {},

        callback_url: '',

        callback_id: '',

        // Preset
        preset: '',

        // Formats
        formats: {
            'editor': 'Text',
            'image': 'Bild',
            'table': 'Tabelle'
        },

        setPreset: function(value){
            this.preset = value;
        },

        setChanged: function(element){
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
          var url = this.callback_url;
          send_data.hash = this.callback_id;

          $.ajax({
                dataType: "json",
                url: url,
                type: 'POST',
                data: send_data,
                success: function(data){

                    if(data.error){
                      reference.createMessage(data.message);
                      return ;
                    }

                    callback(data);
                },
                error: function(xhr, message){
                   reference.createMessage("<p><strong>Fehler:</strong> Leider ist beim Speichern das Dokuments etwas schief gegangen.</p>");
                }
          });
        },

        /**
         * Resets the Editor-Interface
         */
        resetEditor: function(){
          this.changed = false;

          $('#PXEdit-change-input, #layoutModal #current-layout, #PXEdit-document-remove').hide();
          $('#PXEdit #footnote').html('<div class="widget"></div>').hide();
          $('#PXEdit #pdf-visibile-editor').html('');

          this.setPreset('');

          // Change layout - CTA
          if(this.options.change_layout === 1 || this.options.change_layout_via_menu === 1){
            $('#PXEdit-change-input').show();
          }

          // Show input-changer
         if(this.options.change_input === 1){
            $('#layoutModal #current-layout').show();
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
                    <hr /><button type="button" class="btn btn-success btn-close"><span class="glyphicon glyphicon-ok"></span> Speichern und Weiter</button>';

          this.createMessage(msg);

          // get active layout
          var current = this.getActiveLayout();
          $('#PXEdit-message .layouts .layout-template[data-id="'+ current +'"]').addClass('active');
        },

        showLayoutChooserCallout: function(){
         var msg = '<div class="pxedit-layout-changer"><p><strong>Layout und Inhalt auswählen</strong></p>\n\
                    <hr /><div class="layouts-scaled"><div class="layouts small-format-presentation">'+ $('#available-layouts').html() +'</div></div>\n\
                    ';

          msg += '<hr /><div class="clearfix collapse in small-format-presentation" id="current-layout">\n\
            <p style="margin-bottom: 0"><strong>Inhalt auswählen</strong></p>\n\
            <p class="small">Bitte wählen Sie für den jeweiligen Bereich eine Inhaltsart aus.</p>\n\
            <div class="row">\n\
            <div class="col-xs-6"><p style="margin-bottom: 0"><label>Bereiche *</label></p>\n\
            <div id="pdf-current-layout"><!-- Current Layout --></div>\n\
            </div><div class="col-xs-6 col-select"></div></div></div></div>';

          msg += '<hr /><button type="button" class="btn btn-success btn-change-layout" disabled><span class="glyphicon glyphicon-ok"></span> Layout ändern</button>';

          this.createMessage(msg);
          var current = this.getActiveLayout();
          $('.pxedit-layout-changer .col-select').html($('#available-inputs').html()).hide();
          this.showLayoutChooser_select_layout(current);
        },

        showLayoutChooser_select_layout: function(layout){

          var current = this.getActiveLayout();

          $('#PXEdit-message .layouts .layout-template.active').removeClass('active');
          $('#PXEdit-message .layouts .layout-template[data-id="'+ layout +'"]').addClass('active');
          $('#pdf-current-layout').html($('#available-layouts .layout-template[data-id=' +  layout + ']').clone());
          $('#pdf-current-layout .layout-template').addClass('active');

          var data = this.data;
          var reference = this;

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
          $('#pdf-current-layout .widget').click(function(event){
            $('#pdf-current-layout .widget.selected').removeClass('selected');

            $(this).addClass("selected");
            var widget_type = $(this).attr('data-widget');
            var widget_changed = $(this).attr("data-change-widget");

            $(".col-select button").removeClass('btn-primary active');
            $(".col-select button[data-widget='"+ widget_type +"']").addClass('btn-primary');
            $(".col-select button[data-widget='"+ widget_changed +"']").addClass('active');
            $(".col-select").show();

            event.preventDefault();
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

              if($('#pdf-current-layout .widget.changed').length || current !== layout){
                $('.btn-change-layout').removeAttr('disabled');
              }
          });

          $('.btn-change-layout').click(function(event){
            event.stopImmediatePropagation();
            $('#available-new-layout').html($('#pdf-current-layout .layout-template').html());
            $('#PXEdit-message').removeClass('open');

            setTimeout(function(){
              var msg = '<p><strong>Hinweis</strong></p>\n\
                      <hr /><p>Durch das Ändern der Vorlage oder Eingabeformate gehen bereits eingegebene Daten verloren.</p>\n\
                      <button type="button" class="btn btn-success btn-close"><span class="glyphicon glyphicon-ok"></span> Speichern und Weiter</button>';
              reference.createMessage(msg);
            }, 1000);
          });

          $('#pdf-current-layout .widget').first().click();
        },

        transformWidgets: function(){
          //reference.saveLayoutChanges($('#available-new-layout'));
        },




        /**
         * Adds the necessary listeners
         * to the editor
         */
        addListener: function() {
          var reference = this;

          $('#PXEdit-document-save').click(function(){
            reference.saveDialoge();
          });

          $('#PXEdit-document-remove').click(function(){
            reference.removeDialoge();
          });

          $('body').on('click', ".btn-pxedit-save", function(){
            reference.saveDialogeFeedback();
          });

            // cta change layout
          $('#PXEdit #PXEdit-change-input').click(function(){
            if(reference.options.change_layout){
              reference.showLayoutChooserCallout();
              return ;
            }

                if(reference.options.change_layout_via_menu){
                  reference.showLayoutCallout();
                }
            });

            // close
            $('#PXEdit #document-reset').click(function(){
              if(reference.changed === false){
                  reference.close();
              }
              else {
                reference.createMessage('<p>Sie haben ungespeicherte Änderungen. Möchten Sie den Editor wirklich beenden?</p><hr /><p><button class="btn btn-danger" id="PXEdit-cancel">Änderungen verwerfen</button></p>');
              }
            });

            $('body').on('click', "#PXEdit-cancel", function(){
              reference.close();
            });

            $('body').on('click', ".btn-pxedit-remove", function(){
              reference.removeDialogeSubmit();
            });

            // change layout
            $('#PXEdit-message').on("click", ".layout-template:not(.active)", function(){

              if($('.pxedit-layout-changer').length === 0){
                $('#PXEdit-message .layout-template.active').removeClass('active');
                $(this).addClass('active');
                // call layout-changes to set the new Layout
                reference.saveLayoutChanges(this);
              }
              else {
                reference.showLayoutChooser_select_layout($(this).data('id'));
              }
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

            $('#PXEdit').addClass('open').fadeIn();
            $('#PXEdit').removeClass('loading');

            if(this.options.message_on_setup){
              this.createMessage(this.options.message_on_setup);
            }

            if(this.options.footnote){
              $('#PXEdit #footnote').show();
              $('#PXEdit #footnote .widget').editable({
                type: 'footnote'
              });
            }

            this.setActiveLayout(data.layout);
            this.createWidgets(data.content);

            if(this.options.id){
              $('#PXEdit-document-remove').show();
            }

            if(typeof data.sample === 'object' && !this.options.id){
                this.setOptions({'sample_data' : data.sample});
                this.showLayoutCallout();
            }
        },

        saveAndClose: function(){
          var reference = this;
          var data = this.generateSave();
          this.loading();
          $('#PXEdit-message').removeClass('open');

          data.action = 'save-document';

          this.performAjax(data, function(data){
            $('#PXEdit').removeClass('open').fadeOut();
            reference.cb();
            reference.createMessage(data.message, 2500);
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
                      'value': $(this).find('.trumbowyg-editor').html()
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
              'title':  this.options['title'],
              'status': this.options['status'],
              'category': this.options['category'],
              'layout': this.getActiveLayout(),
              'footnote': $('#footnote').text(),
              'page_title': $('.row-editor h1.page-title').text(),
              'content': data,
              'preset': this.preset
            };

            if(this.options.id){
              save_data.id = this.options.id;
            }

        return save_data;
        },

        removeDialoge: function(){
          if(this.options.id === 0){
            return ;
          }

          this.createMessage('<p><strong>Dokument löschen</strong></p><hr />Sind Sie sicher, dass Sie das aktuelle Dokument verwerfen möchten?<p>\n\
          <hr /><p><button class="btn btn-danger btn-pxedit-remove">Löschen</button></p>');
        },

        removeDialogeSubmit: function(){
          this.createMessage('');
          var reference = this;

          if(this.options.id){
            this.performAjax({'action': 'remove-document', 'id': this.options.id}, function(data){
              reference.destroy();
              reference.cb(data);
              reference.createMessage(data.message, 2500);
            });
          }
        },

        saveDialoge: function(){

          var markup = '<div class="pxedit-save-container"><p><strong>Dokument speichern</strong></p><hr />';

          for (var key in this.inputs) {
            var obj = this.inputs[key];

            if(obj.type === 'text'){
                markup += '<div class="form-group"><label for="title">'+ obj.label +'</label>\n\
               <input class="form-control save-ables" data-key="'+ key +'" type="text" class="form-control" value="' + this.options[key]  +'" />';

                if(obj.desc !== ''){
                  markup += '<p class="help-block">Wird in der Auswahl der Dokumente als Titel verwendet.</p>';
                }

                markup += '</div>';
            }

             if(obj.type === 'select'){
                markup += '<div class="form-group"><label for="title">'+ obj.label +'</label>\n\
                <select class="form-control save-ables" data-key="'+ key +'" class="form-control" value="' + this.options[key]  +'">';

                for (var select_key in obj.options) {
                  var label = obj.options[select_key];

                  if(this.options[key] === select_key){
                    markup += '<option value="'+ select_key + '" selected>'+ label +'</option>';
                  }
                  else {
                    markup += '<option value="'+ select_key + '">'+ label +'</option>';
                  }
                }

                markup += '</select>';

                if(obj.desc !== ''){
                  markup += '<p class="help-block">' + obj.desc + '</p>';
                }

                markup += '</div>';
            }

            if(obj.type === 'checkbox'){
              if(this.options[key] === 1 || this.options[key] === "1"){
                markup += '<div class="checkbox"><label><input value="1" class="save-ables" checked="checked" type="checkbox" data-key="'+ key +'"> '+ obj.label +'</label></div>';
              }
              else {
                markup += '<div class="checkbox"><label><input value="1" class="save-ables" type="checkbox" data-key="'+ key +'"> '+ obj.label +'</label></div>';
              }
            }
          }

         markup += '<hr /><p><button class="btn btn-primary btn-pxedit-save">Speichern</button></p></div>';
         this.createMessage(markup);
        },

        saveDialogeFeedback: function(){

          var errors = 0;

          for (var key in this.inputs) {
            var obj = this.inputs[key];
            var value = $('.pxedit-save-container .save-ables[data-key="'+ key +'"]').val();
            $('.pxedit-save-container .save-ables[data-key="'+ key +'"]').removeClass('has-error');

            if(obj.required === 1){
              if(!value){
                  $('.pxedit-save-container .save-ables[data-key="'+ key +'"]').addClass('has-error').focus();
                  errors++;
              }
            }

            // different jQuery handling on Checkboxes
            if(obj.type === 'checkbox'){
              if($('.pxedit-save-container .save-ables[data-key="'+ key +'"]').is(":checked")){
                this.options[key] = 1;
              }
              else {
                this.options[key] = 0;
              }
            }
            else {
              this.options[key] = value;
            }
          }

          if(errors === 0){
            this.saveAndClose();
          }
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

            $('#PXEdit h1.page-title').createPageTitleWidget({'value': this.options.page_title});

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

              var new_data_item = {'widget': widget_type, 'id': (x + 1) };
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


        close: function(){
          this.destroy();
          $('.layout-menu').removeClass('open');
        },

        destroy: function(){
          $('#PXEdit').removeClass('open').fadeOut();
        },

        /**
         * Loads a Document from a ressource
         * This is the starting-point for the integration
         *
         * @param {Object} data
         * @returns {undefined}
         */
        loadDocument: function(data, cb){
          this.loading();
          this.cb = cb;
          var reference = this;

          data.hash = this.callback_id;

          $.ajax({
                dataType: "json",
                url: reference.callback_url,
                data: data,
                success: function(data){

                    if(data.error){
                      reference.createMessage(data.message);
                      return ;
                    }

                    reference.inputs = data.inputs;
                    reference.setPreset(data.preset);
                    reference.setOptions(data.options);
                    reference.setup(data.values, data.layouts);
                },
                error: function(){
                  reference.createMessage("Leider gab einen einen Fehler beim laden des Dokuments.");
                }
            });
        }
    };

    // Editable Defaults
    $.fn.editable.defaults.mode = "inline";
    $.fn.editable.defaults.onblur = "submit";
    $.fn.editable.defaults.emptytext = "";
    $.trumbowyg.svgPath = false;

    // selfregister events & listeners
    jQuery(document).ready(function(){
      var editor = PXEdit();

      editor.addListener();
      editor.callback_url = $("#PXEdit").data('callback');
      editor.callback_id = $("#PXEdit").data('callback-id');

      console.log('PXEdit v' + editor.version  + ' ('+ editor.version_date + ')');

      // debug
      document.onkeyup = function(e) {
            // CTR + I
            //console.log(e.keyCode);
            if(e.ctrlKey && e.keyCode == 83) {

            }

            if(e.ctrlKey && e.keyCode == 73) {
                var data = editor.generateSave();
                console.clear();
                console.log(JSON.stringify(data, null, 4));
            }
            // CTR + Q
            if(e.ctrlKey && e.keyCode == 81) {
                console.clear();
                console.log(JSON.stringify(editor, null, 4));
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

        if(message === ''){
          $('.layout-menu').removeClass('open');
          return ;
        }

        $('.layout-menu').html('<span class="close">&times;</span>' + message);

        // when error-message is shown and Editor is closed
        if($('#PXEdit').hasClass('loading') && !$('#PXEdit').hasClass('open')){
          $('#PXEdit').removeClass('loading');
        }

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


/**
 * Returns the PXEditor
 *
 * @returns {PDFForm}
 */
function PXEdit(){
  return PDFForm;
}

function PXEdit_changed(){
 var form = PXEdit();
 form.setChanged();
}
