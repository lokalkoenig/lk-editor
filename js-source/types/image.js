
(function ($) {
    "use strict";
    
      
   $.fn.createImageWidget = function(options) {
        
        // serialize
        if(typeof options === "string"){
            
            //console.log($(this).children('.editor-widget-image').attr('id'));
            var versions = $(this).children('.editor-widget-image').data('versions');
            
            var data = {
                'widget': 'image',
                'url': $(this).find('img').attr('src'),
                'fid': $(this).children('.editor-widget-image').attr('data-fid'),
                'preset': $(this).children('.editor-widget-image').attr('data-image-present'),
                'versions': versions
            };
            
            data.editable = parseInt($(this).children('.editor-widget-image').data('editable'));
        
        return data;    
        }
        
        var image_id = 'widget_image_' + options.id;
        
        var editor = PXEdit();
        
        // sizes are multiplied by 3
        var width = $(this).attr('data-width');
        var height = $(this).attr('data-height');
        var key = 'w' + width + 'xh' + height;
        var sizetitle = editor.options.image_presets[key].title;
        
        if(typeof options.editable === 'undefined'){
          options.editable = 1;
        }
        
        options.editable = parseInt(options.editable);
        
        if(typeof options.fid === 'undefined' || options.fid === "0" || options.fid === 0){
            options.url = '';
            options.fid = 0;
            options.versions = {};
        }
        else {
          options.url =  options.versions[key];
        }
        
        if(options.editable === 0){
          $(this).html('<div id="'+ image_id +'" data-editable="0" data-image-present="' + key  +'" data-fid="'+ options.fid +'" class="editor-widget editor-widget-image"><img src="'+ options.url +'"></div>');
          $(this).children('div').data('versions', options.versions);
          return ;  
        }
        
        // init element
        $(this).html('<div id="'+ image_id +'" data-editable="1" data-image-present="' + key  +'" data-fid="'+ options.fid +'" class="editor-widget editor-widget-image"><img src="'+ options.url +'"><div class="progress"><div class="progress-bar progress-bar-primary"></div></div><span class="btn btn-default fileinput-button"><i class="glyphicon glyphicon-plus"></i><span> Bild auswählen...</span><br /><small>JPG, PNG (Maximal 2MB, <br />' + sizetitle + '</small><input id="fileupload_'+ image_id +'" type="file" name="files[]"></span></div>');
        var image_reference = $('#widget_image_' + options.id);
        $(this).children('div').data('versions', options.versions);
        
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
                
                editor.setChanged();
                
                $(image_reference).data('versions', data.result['versions']);
                $(image_reference).attr('data-fid', data.result.image_id);
                $(image_reference).find("img").attr('src', data.result['versions'][key]);
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
        });;
        
       return this;
    };
}(window.jQuery));
   