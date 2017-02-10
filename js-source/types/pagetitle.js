$.fn.PXEdit_inputLimitation = function(option) {
    'use strict';
    var self = this,
        that = option || {};

    return (function () {
        var text_remaining,
            textAreas = self,
            i,
            textAreasCount = textAreas.length,
            maxLength,
            maxLength2,
            selector = that.selector || false,
            charTxt = selector?(that.text?' ' + that.text:''):false;

        var textAreasAll = (function () {
            for (i = 0; i < textAreasCount; i++) {

              // on Enter
              textAreas[i].onkeypress = function (e) {
                    if((e.keyCode === 13)) {
                      e.preventDefault();
                    }
                };

               textAreas[i].onkeydown = function (e) {
                    if(!(e.keyCode === 8)) {
                        maxLength = this.attributes['data-maxlength'].value;
                        countText(this, maxLength);
                        return this.innerText.length < maxLength;
                    }
                };
                textAreas[i].onkeyup = function () {
                    maxLength2 = this.attributes['data-maxlength'].value;
                    copyPastePrevent(this, maxLength2);
                    countText(this, maxLength2);
                };

                if($(textAreas[i]).text().length === 0){
                   $(textAreas[i]).addClass('is-empty');
                }
            }
        }());
        
        var countText = function (obj, maxChar) {
            var length = $(obj).text().length;
            PXEdit_changed();
            if(length === 0){
               $(obj).addClass('is-empty');
            }
            else {
               $(obj).removeClass('is-empty');
            }

            return ;
        };

        var copyPastePrevent = function (obj, max) {
            var chopped;
            if ($(obj).text().length > max) {
                chopped = $(obj).text().substring(0, max);
                $(obj).html(chopped);
            }
        };
    }());
};



// Page-Title
(function ($) {
  "use strict";

   // options.value
  $.fn.createPageTitleWidget = function(options) {
    $(this).html('<div data-maxlength="60" contenteditable="true">' +  options.value + '</div>');
    //$(".textarea").limitText({selector: ".textarea_feedback", text : "chars rem"});
    $(this).find('div').PXEdit_inputLimitation({});
  };

}(window.jQuery));
