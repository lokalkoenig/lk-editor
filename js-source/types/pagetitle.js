
(function ($) {
  "use strict";

   // options.value
   $.fn.createPageTitleWidget = function(options) {
       $(this).html('<div>' +  options.value + '</div>');
       $(this).children('div').editable({
        type: 'pagetitle'
       });
   };

}(window.jQuery));

(function ($) {
    "use strict";

    var Pagetitle = function (options) {
      this.init('Pagetitle', options, Pagetitle.defaults);
    };

    $.fn.editableutils.inherit(Pagetitle, $.fn.editabletypes.abstractinput);

    $.extend(Pagetitle.prototype, {
        render: function () {
            this.setClass();
            this.setAttr('placeholder');
            this.$input.attr('maxlength', 60);
        },
        activate: function() {
            $.fn.editabletypes.text.prototype.activate.call(this);
        },
        input2value: function() {
          var editor = PXEdit();
          editor.setChanged();
          editor.options.page_title = this.$input.val();
          return this.$input.val();
        }
    });

    Pagetitle.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
      tpl:'<input type="text">',
      inputclass: '',
      placeholder: '',
    });

    $.fn.editabletypes.pagetitle = Pagetitle;

}(window.jQuery));
