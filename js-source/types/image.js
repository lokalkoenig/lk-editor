
// Image-widget
(function ($) {
    "use strict";

   $.fn.createImageWidget = function(options) {

    // serialize
    if(typeof options === "string"){
      var data = {
        'widget': 'image',
        'url': $(this).children('.editor-widget-image').data('url'),
        'fid': $(this).children('.editor-widget-image').data('fid'),
        'preset': $(this).children('.editor-widget-image').attr('data-image-present'),
        'zoom': $(this).children('.editor-widget-image').data('zoom'),
        'points': $(this).children('.editor-widget-image').data('points'),
      };

      return data;
    }

    var image_id = 'widget_image_' + $(this).data('index');
    var editor = PXEdit();
    
    // sizes are multiplied by 3
    var width = $(this).attr('data-width');
    var height = $(this).attr('data-height');
    var key = 'w' + width + 'xh' + height;
    var sizetitle = editor.options.image_presets[key].title;

    options.editable = 1;

    if($(this).hasClass('widget-edit-disabled')){
      options.editable = 0;
    }

    if(typeof options.fid === 'undefined' || options.fid === "0" || options.fid === 0){
      options.url = '';
      options.fid = 0;
    }
  
    if(options.editable === 0){
      $(this).html('<div id="'+ image_id +'" data-editable="0" data-image-present="' + key  +'" data-fid="'+ options.fid +'" data-url="'+ options.url +'" class="editor-widget editor-widget-image"></div>');
    }
    else {
      // init element
      $(this).html('<div id="'+ image_id +'" data-editable="1" data-image-present="' + key  +'" data-fid="'+ options.fid +'" data-url="'+ options.url +'" class="editor-widget editor-widget-image"><div class="progress"><div class="progress-bar progress-bar-primary"></div></div>\n\
      <div class="btn btn-default fileinput-button">\n\
        <div class="image-new">\n\
          <i class="glyphicon glyphicon-plus"></i><span> Bild auswählen...<br />\n\
          <small>JPG, PNG (Maximal 2MB, <br />' + sizetitle + '</small>\n\
        </div>\n\
        <div class="image-uploaded">Sie können das Bild verschieben und durch das Mausrad den sichtbaren Ausschnitt vergrößern. <strong class="pull-right">Anderes Bild auswählen</strong></div>\n\
      <input id="fileupload_'+ image_id +'" type="file" name="files[]"></span></div></div>');
    }
  
    var image_reference = $('#' + image_id);
  
    if(options.url){
      $(image_reference).addClass('has-image');
      $(image_reference).data('zoom', options.zoom);
      $(image_reference).data('points', options.points);
    }

    if(options.fid){
      $(image_reference).find('img').hide();

      setTimeout(function(){
        initializeCroppieTool(image_reference);
      }, 100);
    }

    if(options.editable === 0){
      return ;
    }

    // Change this to the location of your server-side upload handler:
    $('#fileupload_' + image_id).fileupload({
      url: editor.callback_url + "?type=image&size=" + key,
      dataType: 'json',
      maxFileSize: 2099000,
      add: function (e, data) {
        var goUpload = true;
        var uploadFile = data.files[0];

        if (!(/\.(jpg|jpeg|png)$/i).test(uploadFile.name)) {
            editor.createMessage('Leider gab es einen Fehler beim hochladen der Bilddatei. Bildupload: Bitte laden Sie nur Bilder-Dateien hoch.');
            goUpload = false;
        }
        if (uploadFile.size > 2000000) { // 2mb
            editor.createMessage('Leider gab es einen Fehler beim hochladen der Bilddatei. Der Dateiupload ist auf 2 MB limitiert.');
            goUpload = false;
        }

        if (goUpload === true) {
            data.submit();
        }
      },
      done: function (e, data) {
        $(image_reference).removeClass("in-progress");

        if(typeof data.result.image_id === 'undefined'){
          editor.createMessage("Leider gab es einen Fehler beim hochladen der Bilddatei. Bitte versuchen Sie es erneut.");
          return ;
        }

        editor.setChanged(true);
        $(image_reference).attr('data-fid', data.result.image_id);
        $(image_reference).data('fid', data.result.image_id);
        $(image_reference).data('url', data.result.url);
        $(image_reference).addClass('has-image');
        editor.createMessage("Das Bild wurde erfolgreich hochgeladen und in das Dokument eingepasst. Sie können die Position des Bildes durch Verschieben verändern.", 4000);
        initializeCroppieTool(image_reference, true);
      },
      progressall: function (e, data) {
         $(image_reference).addClass("in-progress");

         var progress = parseInt(data.loaded / data.total * 100, 10);
         $(image_reference).find('.progress-bar').css(
              'width',
              progress + '%'
         );
      }
    }).on('fileuploadsubmit', function (e, data) {
      data.size = key;
      $(image_reference).parent().addClass("in-progress");
    });

    return this;
  };
}(window.jQuery));


var initializeCroppieTool = function(element, reset){

  var element_options = $(element).data();
  var id = $(element).attr('id');
  var crop_id = id + '_crop';

  if($('#' + crop_id).length !== 0){
    $('#' + crop_id).remove();
  }

  if(element_options.url !== ''){
    $('#' + crop_id).remove();
    $(element).append('<div id="'+ crop_id +'" class="editor-croppie"></div>');
      var croppie_div = $('#' + crop_id).croppie({
        //url: options.url,
        viewport: { width: $(element).width(), height: $(element).height() },
        boundary: { width: $(element).width(), height: $(element).height() },
        showZoomer: false,

        update: function (data) { }
      });

      var croppiechangelistener = function(){
        $('#' + crop_id).on('update', function(ev, data) {
          PXEdit_changed(true);
          $(element).data('zoom', data.zoom);
          $(element).data('points', data.points);
        });
      };
      
      if(typeof element_options.points !== 'undefined' && reset !== true){
        croppie_div.croppie('bind', {url: element_options.url, 'points': element_options.points}).then(function(){
          croppiechangelistener();
        });
      }
      else {
        croppie_div.croppie('bind', {url: element_options.url}).then(function(){
          croppiechangelistener();
          croppie_div.croppie('setZoom', '0.1');
        });
      }
   }
};
