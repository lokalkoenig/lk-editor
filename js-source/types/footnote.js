
// Footnote-type, based on
// Page-Title
(function ($) {
  "use strict";

   // options.value
  $.fn.createFootnoteWidget = function(options) {
    $(this).html('<div data-maxlength="200" contenteditable="true">' +  options.value + '</div>');
    $(this).find('div').PXEdit_inputLimitation({});
  };

}(window.jQuery));