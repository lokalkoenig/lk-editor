// Table Widget
(function ($) {
  "use strict";

  $.fn.createTableWdiget = function(options, additional) {

    if(typeof options === "string"){

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
          data.rows[i][length] = 'Neu';
        }

        PXEdit_changed();
        $(this).createTableWdiget(data);
        return ;
      }

      // set preset
      if(options === "setpreset"){
        $(this).find('.option-table li.active').removeClass('active');

        // mark active table preset
        $(this).find('.option-table li[data-preset="'+ additional+'"]').addClass('active');
        $(this).find('table').attr('data-preset', additional);
        PXEdit_changed();
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
        return true;
      }

      // add-row
      if(options === "addrow"){
        var data = $(this).createTableWdiget("serialize");
        var new_set = {};
        var length = Object.keys(data.rows[0]).length;

        for(var i = 0; i < length; i++){
            new_set[i] = "";
        }

        data.rows[data.rows.length] = new_set;
        PXEdit_changed();
        $(this).createTableWdiget(data);
        return true;
      }

      // serialize
      if(options === "serialize"){

        var data = {
          'widget': 'table',
          'tablepreset': $(this).find('table').attr('data-preset'),
          'title': $(this).find('.editor-widget-editor .trumbowyg-editor').html(),
          'rows': []
        };

        var e = 0;
        $(this).find("tr").each(function(){
          var row = {};

          var x = 0;
          $(this).children('td').each(function(){
            row[x] = $(this).children('.table-edit').html();
            x++;
          });

          data.rows[e] = row;
          e++;
        });

        return data;
       }

      return true;
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

    var tableFixed = $(this).hasClass('widget-table-fixed');
    $(this).addClass('widget-table');

    var markup = '<div><div class="text ">'+ options.title +'</div><span class="glyphicon glyphicon-cog table-options"></span>';

    // We limit the maximum length to
    var length = Object.keys(options.rows[0]).length;

    if(length < 4){
      markup += '<div class="option2"><span data-action="add-col" title="Spalte hinzufügen" class="PXEdit-table-add-col glyphicon glyphicon-plus"></span></div>';
    }

    markup += '<ul class="option-table"><li data-preset="table-normal">Fett</li><li data-preset="table-simple">Normal</li><li data-preset="table-advanced">Erweitert</li></ul>';

    if(typeof options.tablepreset === 'undefined'){
      options.tablepreset = 'table-normal';
    }

    markup += '<table class="table table-'+ length + '">';
    var x = 0;

    for (var i = 0; i < options.rows.length; i++) {
      markup += '<tr>';
      for (var key in options.rows[i]) {

        var int_key = parseInt(key);
        var cell = '<span class="table-edit">' + options.rows[i][key] + '</span>';

        if(i === 0 && int_key >= 2){
          cell = '<span class="option"><span data-col="'+  int_key  + '" title="Spalte löschen" class="PXEdit-table-col-remove glyphicon glyphicon-minus"></span></span>' + cell;
        }

        if(int_key === (length - 1) && i > 1){
          cell = '<span data-row="'+  i  + '" title="Zeile löschen" class="PXEdit-table-row-remove glyphicon glyphicon-minus"></span>' + cell;
        }
        markup += '<td>'+  cell +'</td>';
      }
      markup += '</tr>';
    }

    markup += '</table><span data-action="add-row" title="Zeile hinzufügen" class="PXEdit-table-row-add glyphicon glyphicon-plus"></span></div>';
    $(this).html(markup);

    $(this).find("div.text").each(function(){
      $(this).createEditorWdiget({'id': options.id + "text", 'value': options.title, 'autogrow': true});
    });

    // register
    $(this).find(".table-edit").each(function(){
      $(this).editable({
         type: 'cell'
      });
    });

    $(this).createTableWdiget('setpreset', options.tablepreset);
  };

}(window.jQuery));

// Listener
jQuery('document').ready(function(){

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

  // keycode TAB listener
  $("#PXEdit").keydown(function(event) {
    if(event.keyCode === 9 && $(event.target).is("textarea")){
      table_widget_check_tab(event);
    }
  });
});

// Tab function
function table_widget_check_tab(event){

  var table = $(event.target).closest('.widget').first();
  var test = $(event.target).closest('td').next('td').length;
  var target = $(event.target).closest('td').next('td');

  // test if there is a new row
  if(test === 0){
    target = $(event.target).closest('tr').next('tr').children('td').first();

    // when we need to add a new line
    if(target.length === 0){
      // We trigger another element to save the current
      $(table).find('tr').last().children('td').first().children('.table-edit').trigger('click');

      setTimeout(function(){
         $(table).createTableWdiget('addrow');
         var target = $(table).find('tr').last().children('td').first();
         $(target).children('.table-edit').trigger('click');
      }, 200);

      return ;
    }
  }

  $(target).children('.table-edit').trigger('click');

  setTimeout(function(){
    $(target).find('textarea').focus();
  }, 200);
}
