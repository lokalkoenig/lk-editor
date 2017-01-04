<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

include 'autoload.php';


// REQUEST load present
//GET present == present ID


$callback = [];
$callback['version'] = 1;
$callback['PDXEditor'] = __DIR__;
$callback['args'] = $_GET;

$docs = new LK\PDF\DyanmicLayout();

if(isset($_GET['preset']) 
    && is_string($_GET['preset'])){
    
    $preset = "\\LK\\PDF\\PXEditPresets\\" . $_GET['preset'];
    $callback['preset_class'] = $preset;
 
    if(class_exists($preset)){
        $obj = new $preset($docs);
        
        $callback['values'] = $obj -> getDefaultValues();
        $callback['options'] = $obj -> getOptions();
        
        $html = array();
        $layouts = $obj -> getAvailableLayouts();
        
        $callback['test'] = $docs;
        
        foreach ($layouts as $layout){
            $type = $docs ->getDefintion($layout);
            $callback['type'] = $layout;
            
            $html[] = (string)$type;
        }
        
        $callback['layouts'] = implode('', $html);
    }
}

if(isset($_GET['type']) 
    && is_string($_GET['type']) 
    && $_GET['type'] == "image"){
    
    $upload_handler = new LK_UploadHandler();
    exit;
}


if(isset($_GET['save']) && is_string($_GET['save'])){
    
    // save to whatever
    $time = time();
    $data = $_POST['data'];
    
    $save = $data;
    $content = json_encode($save);
    file_put_contents("saves/".  $time . ".json", $content);
    
    $callback['fn'] = $time . ".json";
    $callback['save'] = $save;   
}


print json_encode($callback);
exit;

