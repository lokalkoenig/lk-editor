<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

include 'src/autoload.php';


// REQUEST load present
//GET present == present ID


$callback = [];
$callback['version'] = 1;
$callback['PDXEditor'] = __DIR__;
$callback['args'] = $_GET;

$docs = new LK\PXEdit\DyanmicLayout();

if(isset($_GET['preset']) 
    && is_string($_GET['preset'])){
    $docs ->createNewPreset($_GET['preset']);
}

if(isset($_POST['action']) 
    && is_string($_POST['action']) 
    && $_POST['action'] === 'preset-action'
  ){
  
    $preset = $docs ->loadPreset($_POST['values']['preset']);
    $preset -> performCallback($_POST);    
}


if(isset($_GET['type']) 
    && is_string($_GET['type']) 
    && $_GET['type'] == "image"){
    
    $upload_handler = new LK\PXEdit\Upload\ImageUploader();
    exit;
}


if(isset($_POST['action']) && is_string($_POST['action']) && $_POST['action'] === 'save-document'){
    
    // save to whatever
    $time = time();
    $data = $_POST;
    
    $save = $data;
    $content = json_encode($save);
    file_put_contents("saves/".  $time . ".json", $content);
    
    $callback['fn'] = $time . ".json";
    $callback['save'] = $save;   
    $callback['message'] = "Ihr Dokument wurde gespeichert.";    
}


print json_encode($callback);
exit;

