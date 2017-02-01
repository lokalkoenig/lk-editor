
// Editor Cell
(function ($) {
    "use strict";

    var Cell = function (options) {
      this.init('cell', options, Cell.defaults);
    };

    $.fn.editableutils.inherit(Cell, $.fn.editabletypes.abstractinput);

    $.extend(Cell.prototype, {
      render: function () {
        this.setClass();
        this.setAttr('placeholder');
        this.setAttr('rows');

        //ctrl + enter
        this.$input.keydown(function (e) {
          if (e.ctrlKey && e.which === 13) {
            $(this).closest('form').submit();
          }
        });
      },

      activate: function() {
        $.fn.editabletypes.text.prototype.activate.call(this);
        this.$input.height(this.$input.closest('td').height() + 4);
      },

      input2value: function() {
        PXEdit_changed();
        return this.$input.val();
      }
    });

    Cell.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
      tpl:'<textarea></textarea>',
      inputclass: 'input-large',
      placeholder: null,
      rows: 7
    });

    $.fn.editabletypes.cell = Cell;

}(window.jQuery));
