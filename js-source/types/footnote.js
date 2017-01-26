
(function ($) {
    "use strict";

    var Footnote = function (options) {
      this.init('Footnote', options, Footnote.defaults);
    };

    $.fn.editableutils.inherit(Footnote, $.fn.editabletypes.abstractinput);

    $.extend(Footnote.prototype, {
        render: function () {
            this.setClass();
            this.setAttr('placeholder');
            this.$input.attr('maxlength', 120);
        },

        activate: function() {
            $.fn.editabletypes.text.prototype.activate.call(this);
        },

        input2value: function() {
            PXEdit_changed();
            return this.$input.val();
        }
    });

    Footnote.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
      tpl:'<input type="text">',
      inputclass: '',
      placeholder: '',
    });

    $.fn.editabletypes.footnote = Footnote;

}(window.jQuery));
