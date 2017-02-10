
// Footnote-type, based on
// Page-Title
(function ($) {
  "use strict";

   // options.value
  $.fn.createFootnoteWidget = function(options) {
    $(this).html('<div data-maxlength="120" contenteditable="true">' +  options.value + '</div>');
    //$(".textarea").limitText({selector: ".textarea_feedback", text : "chars rem"});
    $(this).find('div').PXEdit_inputLimitation({});
  };

}(window.jQuery));