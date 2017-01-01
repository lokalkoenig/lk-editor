

(function ($) {
    "use strict";
    
    // Editable Defaults
    $.fn.editable.defaults.mode = "inline";
    $.fn.editable.defaults.onblur = "submit";
    $.fn.editable.defaults.emptytext = "";
    
    
    $.fn.createWidget = function(options){
        $(this).attr('data-widget', options.widget);
        
        if(options.widget === 'image'){
            $(this).createImageWidget(options);
        }
        
        if(options.widget === 'editor'){
            $(this).createEditorWdiget(options);
        }
        
        if(options.widget === 'table'){
            $(this).createTableWdiget(options);
        }
        
        
        $(this).children('div').height($(this).height());
        
    return this;    
    };
    
    $.fn.createMessage = function(message){
        $("<div class='message-overlay'><div><div><div class='well well-white'><span class='close'>&times;</span>" +  message + "</div></div></div></div>").insertAfter(this);
        setTimeout(function(){
            $(".message-overlay>div").addClass('in');
        }, 200);
    };
    
    $.fn.changeWidgetForm = function(selected) {
        var current = $(this).attr('data-widget');
        
        $(this).children('.label').text(PDFForm.formats[selected]); 
        $(this).attr("data-change-widget", "").removeClass('changed');
                
        if(current !== selected){
            $(this).attr("data-change-widget", selected).addClass('changed');
        }
        
        // check if changed
        var changed = $('#pdf-current-layout .widget.changed').length;
        $("#document-save-settings").show();
        
    };
    
}(window.jQuery));
    
 
