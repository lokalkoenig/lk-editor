<?php
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

class LK_UploadHandler extends UploadHandler {
    
    function construct(){
        parent::__construct();
    }
    
    function generate_response($content, $print_response = true){
           // one file
           
           foreach ($content["files"] as $file){
               $json = [];
               $json['image_id'] = time();
               $json['image_url'] = $file -> url;
               // set Chmod
               chmod("files/" . $file -> name, 0644);
               
               $json['clear'] = $content;
               $this->response = $json;
               
               $str = json_encode($json);
               $this ->body($str);
               exit;
           }
           print_r($content);
           exit;
    }
}


