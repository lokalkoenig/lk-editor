// Table Widget
(function ($) {
  "use strict";

  $.fn.createTableWdiget = function(options, additional) {

    var tableFixed = $(this).hasClass('widget-table-fixed');

    if(typeof options === "string"){

      if(options === 'check'){
        check_table_out_of_bounds(this);
        return ;
      }

      // Remove-Col
      if(options === 'removecol'){
        var data = $(this).createTableWdiget("serialize");
        var col = additional;

        for (var i = 0; i < data.rows.length; i++) {
         delete data.rows[i][col];
        }

        PXEdit_changed();
        $(this).createTableWdiget(data);
        return ;
      }

      // Add col
      if(options === 'addcol'){
        var data = $(this).createTableWdiget("serialize");
        var length = Object.keys(data.rows[0]).length;

        for (var i = 0; i < data.rows.length; i++) {
          if(i === 0) {
            data.rows[i][length] = '<p><strong>Neue Spalte</strong></p>';
          }
          else {
            data.rows[i][length] = '<p></p>';
          }
        }

        PXEdit_changed();
        $(this).createTableWdiget(data);
        check_table_out_of_bounds(this);
        return ;
      }

      // set preset
      if(options === "setpreset"){
        $(this).find('.option-table li.active').removeClass('active');

        // mark active table preset
        $(this).find('.option-table li[data-preset="'+ additional+'"]').addClass('active');
        $(this).find('table').attr('data-preset', additional);
        PXEdit_changed();
        check_table_out_of_bounds(this);
        return ;
      }

      // remove row
      if(options === "removerow"){
        var data = $(this).createTableWdiget("serialize");
        var new_data = [];

        var x = 0;
        for (var i = 0; i < data.rows.length; i++) {
          if(additional !== i){
            new_data[x] = data.rows[i];
            x++;
          }
        }

        data.rows = new_data;
        PXEdit_changed();
        $(this).createTableWdiget(data);
        check_table_out_of_bounds(this);
        return true;
      }

      // add-row
      if(options === "addrow"){
        var data = $(this).createTableWdiget("serialize");
        var new_set = {};
        var length = Object.keys(data.rows[0]).length;

        for(var i = 0; i < length; i++){
          new_set[i] = "<p></p>";
        }

        data.rows[data.rows.length] = new_set;
        PXEdit_changed();
        $(this).createTableWdiget(data);
        check_table_out_of_bounds(this);
        return true;
      }

      // serialize
      if(options === "serialize"){

        var title =  $(this).find('.text h2>div').text();

        if(tableFixed) {
          title = '';
        }

        var data = {
          'widget': 'table',
          'title': title,
          'rows': []
        };

        var e = 0;
        $(this).find("tr").each(function(){
          var row = {};

          var x = 0;
          $(this).children('td').each(function(){
            row[x] = $(this).find('.trumbowyg-editor').html();
            x++;
          });

          data.rows[e] = row;
          e++;
        });

        return data;
       }

      return true;
   }

   var col_max = parseInt($(this).data('max-cols'));
   var col_min = parseInt($(this).data('min-cols'));
   
   if(!col_max) {
     col_max = 4;
   }

   if(!col_min) {
    col_min = 2;
   }

   if(typeof options.title === "undefined"){
      options.title = '<h2>Tabelle</h2>';
   }

    // add a heading here
    if(typeof options.rows === "undefined"){
    options.rows = [
        {
          0: 'Spalte 1',
          1: 'Spalte 2',
          2: 'Spalte 3'
        },
        {
          0: 'Inhalt 1',
          1: 'Inhalt 2',
          2: 'Inhalt 3'
        }
      ];
    }

    
    $(this).addClass('widget-table');

    var markup = '<div>';
    markup += '<div class="text"></div>';
    markup += '<span class="glyphicon glyphicon-cog table-options"></span>';

    // We limit the maximum length to
    var length = Object.keys(options.rows[0]).length;
    var element = this;

    if(length < col_max){
      markup += '<div class="option2"><span data-action="add-col" title="Spalte hinzufügen" class="PXEdit-table-add-col glyphicon glyphicon-plus"></span></div>';
    }

    markup += '<table class="table table-'+ length + '">';
    var x = 0;

    for (var i = 0; i < options.rows.length; i++) {
      markup += '<tr>';
      for (var key in options.rows[i]) {

        var int_key = parseInt(key);
        var cell = '<textarea class="table-edit">' + options.rows[i][key] + '</textarea>';

        if(i === 0 && int_key >= col_min){
          cell = '<span class="option"><span data-col="'+  int_key  + '" title="Spalte löschen" class="PXEdit-table-col-remove glyphicon glyphicon-minus"></span></span>' + cell;
        }

        if(int_key === (length - 1) && i > 1){
          cell = '<span data-row="'+  i  + '" title="Zeile löschen" class="PXEdit-table-row-remove glyphicon glyphicon-minus"></span>' + cell;
        }
        markup += '<td><div>'+  cell +'</td>';
      }
      markup += '</tr>';
    }

    markup += '</table><span data-action="add-row" title="Zeile hinzufügen" class="PXEdit-table-row-add glyphicon glyphicon-plus"></span></div>';
    $(this).html(markup);

    $(this).find("div.text").each(function(){
      $(this).createEditorWdiget({'id': options.id + "text", 'value': options.title, 'autogrow': true});
    });

    $(this).find("textarea.table-edit").each(function(){

      var td = this;
      $(this).trumbowyg({
        btns: [['bold', 'italic']],
        autogrow: true,
        lang: 'de',
        semantic: true,
        removeformatPasted: true
      })
      // Fobus
      .on('tbwfocus', function(){
        $(td).closest('.trumbowyg-box').addClass('widget-active');
        $(td).closest('.widget').removeClass('widget-options');
      })
      // Blur
      .on('tbwblur', function(){
        $(td).closest('.trumbowyg-box').removeClass('widget-active');
      })
      // Change
      .on('tbwchange', function(){
        PDFForm.cleanupMarkup($(td).closest('.trumbowyg-box').find('.trumbowyg-editor'));
        PXEdit_changed();
      });
    });

    // Ueberschrift
    if($(this).find('div.text').length === 1){

      var maxlength = 24;

      var parent_height = parseInt($(this).data('width'));
      if(parent_height === 50){
        maxlength = 35;
      }
      
      if(parent_height === 100){
        maxlength = 80;
      }

      $(this).find('div.text').html('<h2><div data-maxlength="'+ maxlength +'" contenteditable="true">'+ options.title +'<div></h2>');
      $(this).find('div.text h2>div').text($(this).find('div.text h2>div').text()).PXEdit_inputLimitation();
    }
  };

// Listener
$(function(){

  // Show Options
  $("#PXEdit").on('click', '.glyphicon-cog', function(){
    $(this).closest('.widget').toggleClass('widget-options');
  });

  $("#PXEdit").on('click', '.option-table li', function(){
    $(this).closest('.widget').createTableWdiget('setpreset', $(this).attr('data-preset'));
  });

  // Remove col
  $("#PXEdit").on('click', '.PXEdit-table-col-remove', function(){
    $(this).closest('.widget').createTableWdiget('removecol',  parseInt($(this).attr('data-col')));
  });

  // Add col
  $("#PXEdit").on('click', '.PXEdit-table-add-col', function(){
    $(this).closest('.widget').createTableWdiget('addcol');
  });

  // Add row
  $("#PXEdit").on('click', '.PXEdit-table-row-add', function(){
    $(this).closest('.widget').createTableWdiget('addrow');
  });

  // Remove row
  $("#PXEdit").on('click', 'table .PXEdit-table-row-remove', function(){
    $(this).closest('.widget').createTableWdiget('removerow', parseInt($(this).attr('data-row')));
  });
});

}(window.jQuery));


function check_table_out_of_bounds(element){

  // Fixed Table, used in Price-Calculations
  var max_height = $(element).height();
  max_height -= $(element).find('.text').height();

  var table_height = $(element).find('table').height();

  if((max_height - table_height) <= 20){
    $(element).addClass('widget-overflow');
    var calculation = max_height;

    $(element).find('.to-long').removeClass('to-long');
    $(element).find('tr').each(function(){
      var tr_height = $(this).height();
      calculation -= tr_height;
      
      if(calculation < 0){
        $(this).addClass('to-long');
      }
    });

    if($(element).find('.to-long').length){
       $(element).addClass('widget-is-overflown');
    }
    else {
       $(element).removeClass('widget-is-overflown');
    }
  }
  else {
    $(element).removeClass('widget-overflow widget-is-overflown');
    $(element).find('.to-long').removeClass('to-long');
  }
}
