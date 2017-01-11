<?php

namespace LK\PXEdit\Presets;
use LK\PXEdit\Presets\OnlineArgumentation;

class OpenDokument extends OnlineArgumentation {
    //put your code here
    
    var $category = 'sonstiges';
    var $title = 'Freies Dokument';
    
    function getDefaultValues(){
        
        $value = parent::getDefaultValues();
        $value -> layout = 'layout-full';
        $value -> content[] = [
            'id' => 1,
            'widget' => 'editor',
            'value' => '<h1>Freies Dokument</h1><h2>Überschrift</h2><p>Sie können das Format frei auswählen.</p>'
        ];
         
    return $value;    
    }
    
    /**
     * Gets the Managed inputs for the Documents
     * @return array
     */
    function getManagedInputs(){
      $inputs = parent::getManagedInputs();
      $inputs['category'] = [
          'type' => 'select',
          'label' => 'Kategorie',
          'desc' => 'Sie können das Dokument frei in die Kategorien einordnen.',
          'options' => [
            'print' => 'Print',
            'online' => 'Ónline',
            'sonstiges' => 'Sonstiges',  
          ],
          'value' => $this -> category,
          'required' => 1,
      ];
    
      return $inputs;
    }
 
    function getWidgetOptions(){
        return array(
            'change_layout' => 1,
            'change_input' => 1,
            'change_category' => 1
        );
    }   
}