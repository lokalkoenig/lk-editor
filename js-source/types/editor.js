/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function ($) {
    "use strict";
    
    
   $.fn.createEditorWdiget = function(options) {
        var element_id = 'widget_editor_' + options.id;
        
        if(typeof options.value === 'undefined'){
            options.value = "<p>Text</p>";
        }
        
        $(this).html('<div id="'+ element_id +'" class="editor-widget editor-widget-editor"><div>'+ options.value +'</div></div>');
        $('#' + element_id + ">div").editable({ type: 'editor' });
   };
    
 
    
    var Editor = function (options) {
        this.init('editor', options, Editor.defaults);
    };

    $.fn.editableutils.inherit(Editor, $.fn.editabletypes.abstractinput);

    $.extend(Editor.prototype, {
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
        
        html2value: function(html) {
           return $('<div>').html(html);
        },
        /**
        Sets value of input.

        @method value2input(value) 
        @param {mixed} value
       **/
       value2input: function(value) {
           
           if(value === null){
               this.$input.val("<p>Text</p>");
               return ;
           }
           
           if(typeof value === "object"){
                this.$input.val(value.html());
           }
           else {
               this.$input.val(value);
           }
        },
       
        destroy: function() {
            //alert(1);
        },
        
          /**
        Returns value of input. Value can be object (e.g. datepicker)

        @method input2value() 
        **/
        input2value: function() { 
           PDFForm.setChanged();
           
           
           return this.$input.val();
        }, 
        overflow: function(){
           
        },
        activate: function() {
            //$.fn.editabletypes.editor.prototype.activate.call(this);
          
            $.trumbowyg.btnsGrps = {
                //formatting: ['strong', 'em', 'underline', 'strikethrough'],
                lists: ['orderedList', 'unorderedList'], // modified to check if override is working
                semantic: ['strong', 'em'],
                headers: {
                       dropdown: ['p', 'blockquote', 'h1', 'h2', 'h3', 'h4'],
                       ico: 'p'
                   }
            };
                
            $(this.$input).trumbowyg({
              btns: [
                    ['bold', 'italic'],
                    ['h1', 'h2'],
                    'btnGrp-lists',
                    ['horizontalRule']
                ],
              autogrow: true,
              removeformatPasted: true
            });
        }
    });

    Editor.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
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
        placeholder: "Text",
        /**
        Number of rows in textarea

        @property rows
        @type integer
        @default 7
        **/        
        rows: 7,
        escape: false,        
    });

    $.fn.editabletypes.editor = Editor;

}(window.jQuery));

