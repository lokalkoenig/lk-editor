<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace LK\PXEdit;

/**
 * Description of Preset
 *
 * @author Maikito
 */

abstract class Preset {
  
    // category
    var $category;
    var $title;
    var $manager;
    
    
    function __construct(\LK\PXEdit\DyanmicLayout $manager) {
      $this ->setManager($manager);
    }
    
    /**
     * Gets the Manager
     * 
     * @return \LK\PXEdit\DyanmicLayout
     */
    function getManager(){
      return $this -> manager;
    }
    
    
    /**
     * Sets the Manager
     * 
     * @param \LK\PXEdit\DyanmicLayout $manager
     */
    function setManager(\LK\PXEdit\DyanmicLayout $manager){
      $this -> manager = $manager;
    }
    
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
            'table_text' => false,
            'table_columns' => 'flexibile'
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
