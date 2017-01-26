
(function ($) {
    "use strict";


   $.fn.createEditorWdiget = function(options) {
        var element_id = 'widget_editor_' + options.id;

        var editor_element = this;

        if(typeof options.value === 'undefined'){
            options.value = "<p>Text</p>";
        }

        if(typeof options.autogrow === 'undefined'){
          options.autogrow = false;
        }

        if($(this).hasClass('widget-flexibile')){
          options.autogrow = true;
        }

        var editor_autogrow = options.autogrow;
        var element_class = 'editor-widget editor-widget-editor';
        if(editor_autogrow){
          element_class += ' widget-flexibile';
        }

        $(this).html('<div id="'+ element_id +'" class="'+  element_class +'"><textarea>'+ options.value +'</textarea></div>');

        var reference = this;
        $.trumbowyg.btnsGrps = {
                //formatting: ['strong', 'em', 'underline', 'strikethrough'],
                lists: ['orderedList', 'unorderedList'], // modified to check if override is working
                semantic: ['strong', 'em'],
                btnsDef: {
                 // Customizables dropdowns
                formattingLight: {
                    dropdown: ['h1', 'h2'],
                    ico: 'formatting' // Apply formatting icon
                  }
                },
                headers: {
                       dropdown: ['p', 'blockquote', 'h1', 'h2', 'h3', 'h4'],
                       ico: 'p'
                   }
            };

         $(editor_element).find('textarea').trumbowyg({
               btnsDef: {
                  // Customizables dropdowns
                  Format: {
                      dropdown: ['h1','h2'],
                      ico: 'formatting' // Apply formatting icon
                  }
              },
              btns: [
                    ['bold', 'italic'],
                    ['Format'],
                    'btnGrp-lists'
                ],

              autogrow: editor_autogrow,
              lang: 'de',
              semantic: false,
              removeformatPasted: true
            }).on('tbwinit', function(){

              var content = $(reference).find('.trumbowyg-editor').text();

              if(content === ''){
                $(reference).addClass('editor-empty');
              }
              else {
                $(reference).removeClass('editor-empty');
              }

            }).on('tbwchange', function(){
                var content = $(reference).find('.trumbowyg-editor').text();

                if(content === ''){
                  $(reference).addClass('editor-empty');
                }
                else {
                  $(reference).removeClass('editor-empty');
                }

                PDFForm.setChanged(reference);
            }).on('tbwfocus', function(){
              $(reference).addClass('widget-active');
            }).on('tbwblur', function(){
              $(reference).removeClass('widget-active');
            });
   };

}(window.jQuery));
