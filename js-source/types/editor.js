
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
              semantic: true,
              removeformatPasted: true
            }).on('tbwchange', function(){
              PDFForm.cleanupMarkup($(reference).find('.trumbowyg-editor'));
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

    // Special Tabellen-Widget
    if($(reference).hasClass('widget-flexibile')){
      var element_height = $(reference).outerHeight(true);
      var container_height = $('.row-editor').height() - $('.row-editor .page-title').outerHeight(true);
      var test = container_height - element_height - parseInt($(reference).css('margin-bottom'));
      $('.row-editor .widget-table-fixed, .row-editor .widget-table-fixed>div').height(test);
    }


    $(reference).find('.trumbowyg-editor > *').each(function(){
      content_height += $(this).outerHeight(true);
      if(content_height > height){
        $(this).addClass('to-long');
      }
      else {
        $(this).removeClass('to-long');
      }
    });

    if($(reference).find('.to-long').length){
      $(reference).addClass('widget-is-overflown');
    }
    else {
      $(reference).removeClass('widget-is-overflown');
    }
  }

}(window.jQuery));
