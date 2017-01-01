
(function ($) {
    "use strict";
    
      
   $.fn.createImageWidget = function(options) {
        
        // serialize
        if(typeof options === "string"){
            return true;    
        }
        
        var image_id = 'widget_image_' + options.id;
        
        // sizes are multiplied by 3
        var sizes = PDFForm.image_presets;
        
        var width = $(this).attr('data-width');
        var height = $(this).attr('data-height');
        var key = 'w' + width + 'xh' + height;
        
        var sizetitle = sizes[key];
        
        if(typeof options.fid === 'undefined'){
            options.fid = 0;
        }
        
        if(typeof options.url === 'undefined'){
            options.url = "";
        }
        
        // init element
        $(this).html('<div id="'+ image_id +'" data-image-present="' + key  +'" data-fid="'+ options.fid +'" class="editor-widget editor-widget-image"><img src="'+ options.url +'"><div class="progress"><div class="progress-bar progress-bar-primary"></div></div><span class="btn btn-default fileinput-button"><i class="glyphicon glyphicon-plus"></i><span> Bild auswaehlen...</span><br /><small>JPG, PNG (Maximal 2MB, <br />' + sizetitle + '</small><input id="fileupload_'+ image_id +'" type="file" name="files[]"></span></div>');
        var image_reference = $('#widget_image_' + options.id);
        
        // Change this to the location of your server-side upload handler:
        $('#fileupload_' + image_id).fileupload({
            url: PDFForm.callback_url + "?type=image&size=" + key,
            dataType: 'json',
            maxFileSize: 2099000,
            add: function (e, data) {
                var goUpload = true;
                var uploadFile = data.files[0];
                
                if (!(/\.(gif|jpg|jpeg|png)$/i).test(uploadFile.name)) {
                    $('#PXEdit').PXEditor('message', 'Leider gab es einen Fehler beim hochladen der Bilddatei. Bildupload: Bitte laden Sie nur Bilder-Dateien hoch.');
                    goUpload = false;
                }
                if (uploadFile.size > 2000000) { // 2mb
                    $('#PXEdit').PXEditor('message', 'Leider gab es einen Fehler beim hochladen der Bilddatei. Der Dateiupload ist auf 2 MB limitiert.');
                    goUpload = false;
                }
                
                if (goUpload === true) {
                    data.submit();
                }
            },
            done: function (e, data) {
                $(image_reference).parent().removeClass("in-progress");
                
                if(typeof data.result.image_id === 'undefined'){
                    $('#PXEdit').PXEditor('message', "Leider gab es einen Fehler beim hochladen der Bilddatei. Bitte versuchen Sie es erneut.");
                    return ;
                }
                
                $('#PXEdit').PXEditor('changed');
                $(image_reference).attr('data-fid', data.result.image_id);
                $(image_reference).find("img").attr('src', data.result.image_url);
            },
            progressall: function (e, data) {
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
   