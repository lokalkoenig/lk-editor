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
     * Get the Preset-Default-Title
     * 
     * @return string
     */
    function getTitle(){
      return $this->title;
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
     * Get the managed inputs to be filled by
     * the people
     * 
     * @return array
     */
    function getManagedInputs(){
      
      $inputs = [];
      $inputs['title'] = [
          'type' => 'text',
          'label' => 'Titel des Dokuments',
          'desc' => 'Wird in der Auswahl der Dokumente als Titel verwendet.',
          'value' => $this ->getTitle(),
          'required' => 1
      ];
      
     $inputs['status'] = [
          'type' => 'checkbox',
          'label' => 'Dokument für Mitarbeiter freischalten',
          'desc' => '',
          'value' => 0,
          'required' => 0
     ];
      
    return $inputs;  
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
            'message_on_setup' => '',
            'footnote' => 1,
        ];
        
        $options = $this ->getWidgetOptions();
     
        while(list($key, $val) = each($standard)){
            if(!isset($options[$key])){
               $options[$key] = $val; 
            }
        }
    
    return $options;    
    }
    
    public function getCategory(){
        return $this -> category;
    }
    
    /**
     * Performs an preset callback
     * and send back JSON
     * 
     * @param array $array
     */
    function performCallback($array){
      
      $manager = $this->getManager();
      $manager ->sendJson($array);
    }
    
    public function getAvailableLayouts(){
      return array();
    }
    
    abstract function getWidgetOptions();
    abstract function getDefaultValues();    
}
