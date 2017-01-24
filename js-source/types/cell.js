/**
Textarea input

@class textarea
@extends abstractinput
@final
@example
<a href="#" id="comments" data-type="textarea" data-pk="1">awesome comment!</a>
<script>
$(function(){
    $('#comments').editable({
        url: '/post',
        title: 'Enter comments',
        rows: 10
    });
});
</script>
**/
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
            PDFForm.setChanged();
            return this.$input.val();
        } 
    });

    Cell.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        /**
        @property tpl
        @default <textarea></textarea>
        **/
        tpl:'<textarea></textarea>',
        /**
        @property inputclass
        @default input-large
        **/
        inputclass: 'input-large',
        /**
        Placeholder attribute of input. Shown when input is empty.

        @property placeholder
        @type string
        @default null
        **/
        placeholder: null,
        /**
        Number of rows in textarea

        @property rows
        @type integer
        @default 7
        **/        
        rows: 7        
    });

    $.fn.editabletypes.cell = Cell;

}(window.jQuery));
