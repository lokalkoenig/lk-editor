
(function ($) {
  "use strict";
  
   $.fn.createOnlineMediumChooserWidget = function(options, item_changed) {
      
      // serialize
      if(typeof options === 'string' && options === 'serialize'){
        
       var value = $(this).find('select').val();
        
       var data = {
          'widget': 'online_medium_chooser',
          'value': value
        };
        
      return data;  
      }
      
      // choose a medium
      if(typeof options === 'string' && options === 'choose-medium'){
        
        var data = {};
        data.values = PDFForm.generateSave();
        data.item = item_changed;
        data.action = 'preset-action';
        
        PDFForm.performAjax(data, function(data){
          PDFForm.createWidgets(data);  
        });
        
        return ;  
      }
      
      $(this).addClass('online-medium-chooser');
      var element_id = 'widget_editor_' + options.id;
      $(this).html('<div id="'+ element_id +'" class="editor-widget"><select data-element-id="'+ options.id +'"><option value="0">- Auswahl Online-Format -</option></select></div>');
      
      var select_options = PDFForm.options.online_medium_chooser_values;
      var widget = this;
      var selected = parseInt(options.value);
      
      Object.keys(select_options).forEach(function (key) {
         if(selected == key){
            $(widget).find('select').append('<option selected value="'+ key +'">' + select_options[key] + '</option>'); 
         } 
         else {
            $(widget).find('select').append('<option value="'+ key +'">' + select_options[key] + '</option>'); 
         }
      });
   };
   
   
   $(document).ready(function(){
    $('#PXEdit').on('change', ".online-medium-chooser select", function(){
      var element = jQuery(this).closest('.widget');
      $(element).createOnlineMediumChooserWidget('choose-medium', $(this).attr('data-element-id'));
    });  
   });
    
}(window.jQuery));