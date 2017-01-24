
(function ($) {
  "use strict";
  
   // options.value
   $.fn.createPageTitleWidget = function(options) {
       $(this).html('<div>' +  options.value + '</div>'); 
       $(this).children('div').editable({
        type: 'text',
       });
   };
   
}(window.jQuery));