<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace LK\PXEdit;

/**
 * Description of DyanmicLayout
 *
 * @author Maikito
 */
class DyanmicLayout {
    //put your code here
    
    var $verlag = 0;
    
    var $image_presets = [
        'w100xh100' => ['width' => 2310, 'height' => 1272, 'title' => '2310px (Breite) × 1272px (Höhe)'],
        'w50xh50' => ['width' => 1080, 'height' => 600, 'title' => '1080px (Breite) × 600px (Höhe)'],
        'w50xh100' => ['width' => 1080, 'height' => 1272, 'title' => '1080px (Breite) × 1272px (Höhe)'],
        'w33xh50' => ['width' => 762, 'height' => 600, 'title' => '762px (Breite) × 600px (Höhe)'], 
    ];
    
    function __construct($verlagsmodus = 0){ 
      $this -> verlag = $verlagsmodus;
    }
    
    function getImagePresets(){
        return $this -> image_presets;
    }
    
    /**
     * Gets the Image-styles for the Frontend
     * 
     * @return array
     */
    function getImagePresetsParsed(){
      
      $presets = $this->getImagePresets();
      
      $array = array();
      while(list($key, $val) = each($presets)){
        $array[$key] = $val['title'];
      }
      
    return $array;  
    }
    
    function addLayout(\LK\PDF\Doctypes\Doctype $doctype){
        $key = $doctype ->getId();
        $this -> types[$key] = $doctype;
    }
    
    /**
     * Loads a Preset
     * 
     * @param string $preset_id
     * @return \LK\PXEdit\Preset
     */
    function loadPreset($preset_id){
        
        $preset_class_name = "\\LK\PXEdit\\Presets\\" . $preset_id;
        
        // Force an Autoload
        \PXEdit_Autoload($preset_class_name);
        
        if(!class_exists($preset_class_name)){
            $this ->sendError('Preset ' . $preset_class_name . " is not existing.");
        }
        
        $preset = new $preset_class_name($this);   
    
    return $preset;    
    }
    
    
    /**
     * Loads a new preset as a create item
     * 
     * @param string $preset_id
     */
    function createNewPreset($preset_id){
        
        $callback = [];
        $obj = $this ->loadPreset($preset_id);
        $callback['values'] = $obj -> getDefaultValues();
        
        
        $callback['options'] = $obj -> getOptions();
        $callback['options']['category'] = $obj ->getCategory();  
        $callback['options']['status'] = 0;  
        $callback['options']['image_presets'] = $this->getImagePresets();  
        $callback['options']['action'] = 'load-preset';
        $callback['options']['title'] = $obj ->getTitle();
        $callback['options']['id'] = 0;
        $callback['options']['page_title'] = $obj ->getTitle();
        
        $callback['inputs'] = $obj -> getManagedInputs();
        $callback['values'] -> preset = $preset_id;  
        
        $html = array();
        $layouts = $obj -> getAvailableLayouts();
        
        foreach ($layouts as $layout){
            $layout = $this->getLayout($layout);
            $html[] = (string)$layout;
        }

        $callback['image_presets'] = $this -> getImagePresetsParsed();
        $callback['layouts'] = implode('', $html);
        $this ->sendJson($callback);
    }
    
    /**
     * Sends a JSON
     * 
     * @param array $callback 
     */
    function sendJson($callback){
      
      if(!isset($callback['error'])){
        $callback['error'] = 0;
      }
      
      print json_encode($callback);
      exit;
    }
    
    /**
     * Sends an Error
     * 
     * @param string $message
     */
    function sendError($message){
      $this ->sendJson([
          'message' => $message,
          'error' => 1,
      ]);
    }
    
    /**
     * Gets a single Layout
     * 
     * @param string $id Layout-Definition
     */
    function getLayout($id){
      
      $transform = ucfirst(str_replace('-', "_", $id));
      $layout_name = "\\LK\PXEdit\\Layouts\\" . $transform;
        
      // Force an Autoload
      \PXEdit_Autoload($layout_name);
        
      if(!class_exists($layout_name)){
         $this ->sendError('Layout ' . $layout_name . " is not existing.");
      }  
      
      $layout = new $layout_name();
      return $layout;
    } 
    
    /**
     * Gets back the Editor-HTML
     * 
     * @param array $variables
     * @return string HTML of the Editor
     */
    function getEditorTemplate($variables){
      
      if(!isset($variables["pxeditid"])){
          $variables["pxeditid"] = 'demo';
      }
      
      \ob_start();
      while(list($key, $val) = each($variables)){
        $$key = $val;
      }
      
      include __DIR__ . "/../../../template/editor.tpl.php";
      $html = \ob_get_clean();
    
    return $html;  
    }
}
