<?php

namespace LK\PXEdit\Upload;

/*
 * jQuery File Upload Plugin PHP Class
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

require_once __DIR__ .'/server.class.php';

class ImageUploader extends \UploadHandler {
    
    function construct($options = []){
        parent::__construct($options);
    }
    
    function generate_response($content, $print_response = true){
           // one file
           
           $manager = new \LK\PXEdit\DyanmicLayout();
           $derivates = $manager ->getImagePresets();
      
           foreach ($content["files"] as $file){
               $json = [];
               $json['image_id'] = time();
               $json['image_url'] = $file -> url;
               
               $json['versions'] = [];
               while(list($key, $val) = each($derivates)){
                  $json['versions'][$key] = $file -> url;
               }
               
               // set Chmod
               chmod("files/" . $file -> name, 0644);
               $manager ->sendJson($json);
           }
    }
    
    
    
    
}


