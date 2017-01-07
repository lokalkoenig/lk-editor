<?php

namespace LK\PXEdit\Presets;
use LK\PXEdit\Preset;

/**
 * Description of OnlineMediumCollection
 *
 * @author Maikito
 */
class OnlineMediumCollection extends Preset {
  
  var $title = "Online Medien";
  var $category = 'online';
  
  
  /**
   * 
   */
  function getOnlineMediumOptions(){
    //$manager = $this->getManager();
    
    $options = [
        '5' => 'Format Online B-Media',
        '10' => 'Format Y',
        '12' => 'Format Z',
    ];
    
  return $options;  
  }
  
  function getDefaultValues() {
    
    $value = new \stdClass();
    $value -> layout = "layout-triple-online";
    $value -> title = $this -> title;
    $value -> active = 1;
    $value -> content = array();
        
    $module = new \LK\PXEdit\Layouts\Layout_triple_online();
    $value -> mockup = $module ->getMockup();
    
    $value -> content[] = [
      'id' => 1,
      'widget' => 'online_medium_chooser',
      'value' => 5,  
    ];
    
    $value -> content[] = [
      'id' => 2,
      'widget' => 'image',
      'editable' => false,  
      'fid' => 0
    ];
    
    $value -> content[] = [
      'id' => 3,
      'widget' => 'editor',
      'value' => ''  
    ];
    
    /////////
    
    $value -> content[] = [
      'id' => 4,
      'widget' => 'online_medium_chooser',
      'value' => 0,    
    ];
    
    $value -> content[] = [
      'id' => 5,
      'widget' => 'image',
      'editable' => false,
      'fid' => 0
    ];
    
    $value -> content[] = [
      'id' => 6,
      'widget' => 'editor',
      'value' => ''  
    ];
    
    /////////
  
    $value -> content[] = [
      'id' => 7,
      'widget' => 'online_medium_chooser',
      'value' => 0  
    ];
    
    $value -> content[] = [
      'id' => 8,
      'widget' => 'image',
      'editable' => false,
      'value' => ''
    ];
    
    $value -> content[] = [
      'id' => 9,
      'widget' => 'editor',
      'value' => ''  
    ];
    
    return $value;  
  }
  
  function getWidgetOptions(){
    return array(
      'change_layout' => 0,
      'change_input' => 0,
      'online_medium_chooser_values' => $this->getOnlineMediumOptions(),  
      //'message_on_setup' => "<p>Bitte wählen Sie aus den vorhandenen Online-Medien pro Spalte aus. Sie können den Inhalt bearbeiten.</p>",  
    );
  }    
}
