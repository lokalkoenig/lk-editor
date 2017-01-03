<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace LK\PDF;

abstract class Preset {
  
    // category
    var $category;
    var $title;
    
    /**
     * Get Editor Options
     * 
     * @return Arraw Options for the Editor
     */
    public function getOptions(){
        
        $standard = [
            'change_layout' => 1,
            'change_input' => 1,
            'change_category' => 0,
        ];
        
        $options = $this ->getWidgetOptions();
     
        while(list($key, $val) = each($standard)){
            if(!isset($options[$key])){
               $options[$key] = $val; 
            }
        }
    
    return $options;    
    }
    
    function getCategory(){
        return $this -> category;
    }
    
    public function getAvailableLayouts(){
      return array();
    }
    
    abstract function getWidgetOptions();
    abstract function getDefaultValues();
    
}



/**
 * Description of DyanmicLayout
 *
 * @author Maikito
 */
class DyanmicLayout {
    //put your code here
    
    // types
    var $types = array();
    
    
    var $image_presets = [
        'w100xh100' => '2310px (Breite) &times 1272px (Hoehe)',
        'w50xh50' => '1080px (Breite) &times 600px (Hoehe)',
        'w50xh100' => '1080px (Breite) &times 1272px (Hoehe)',
        'w33xh50' => '762px (Breite) &times 600px (Breite)'
    ];
    
    function __construct(){
        $this ->addLayout(new Doctypes\LayoutFull());  // 1
        $this ->addLayout(new Doctypes\Layout_5050()); // 2
        $this ->addLayout(new Doctypes\Layout_5050_right()); // 3
        $this ->addLayout(new Doctypes\Layout_5050_left()); // 4
        $this ->addLayout(new Doctypes\Layout_5050_double()); // 5
        $this ->addLayout(new Doctypes\Layout_triple()); // 6
    }
    
    function getImagePresets(){
        return $this -> image_presets;
    }
    
    function addLayout(\LK\PDF\Doctypes\Doctype $doctype){
        $key = $doctype ->getId();
        $this -> types[$key] = $doctype;
    }
    
    /**
     * Gets a single Layout
     * 
     * @param string $id Layout-Definition
     */
    function getDefintion($id){
      
      if(!isset($this->types[$id])){
        return false;
      }
      
      return $this->types[$id];
    }
    
    function getDefinitions(){
        $html = '';
        
        foreach($this -> types as $type){
            $html .= (string)$type;
        }
        
    return $html;    
    }    
}
