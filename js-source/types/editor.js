
(function ($) {
    "use strict";

  $.fn.createEditorWdiget = function(options) {
    
    if(typeof options === 'string'){
      if(options === 'check'){
        editor_widget_check_length(this);
      }
      return ;
    }

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

     // Add Empty Option
    if($(this).hasClass('widget-empty-disabled') && !options.value){
      return ;
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
                      dropdown: ['p','h1','h2'],
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
            }).on('tbwchange', function(){
              PDFForm.setChanged();
            }).on('tbwfocus', function(){
              $(reference).addClass('widget-active');
            }).on('tbwblur', function(){
              $(reference).removeClass('widget-active');
            });
   };

  function editor_widget_check_length(reference){
    var height = $(reference).height() + 5;
    var content_height = 0;

    $(reference).find('.trumbowyg-editor > *').each(function(){
      content_height += $(this).outerHeight(true);
      if(content_height > height){
        $(this).addClass('to-long');
      }
      else {
        $(this).removeClass('to-long');
      }
    });
  }

}(window.jQuery));
