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
  
  function getAvailableLayouts() {
    return [
     'layout-triple-online'   
    ];
  }
  
  function getDefaultValues() {
    
    $value = new \stdClass();
    $value -> layout = "layout-triple-online";
    $value -> title = $this -> title;
    $value -> active = 1;
    $value -> content = array();
    
    $value -> content[] = [
      'id' => 1,
      'widget' => 'online_medium_chooser',
      'value' => 0,  
    ];
    
    $value -> content[] = [
      'id' => 2,
      'widget' => 'image',
      'editable' => 0,  
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
      'editable' => 0,
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
      'editable' => 0,
      'value' => ''
    ];
    
    $value -> content[] = [
      'id' => 9,
      'widget' => 'editor',
      'value' => ''  
    ];
    
    return $value;  
  }
  
  /**
   * @inheritDoc
   */
  function performCallback($args){
  
    $values = $args['values']['content'];
    
    $item = $args['item'];
    $medium_id = $values[$item - 1]['value'];
    $medium = $this->getOnlineMediumDetails($medium_id);
    
    // replace the information on the places
    $values[$item + 0] = $medium[0];
    $values[$item + 0]['id'] = $item + 1;
    $values[$item + 1] = $medium[1]; 
    $values[$item + 1]['id'] = $item + 2;
    
    $this ->getManager()->sendJson($values);
  }
  
 /**
  * Gets detailed JSON
  * 
  * @param int $id
  * @return Array JSON-Info
  */
  function getOnlineMediumDetails($id){
    
   $content = []; 
   $content[] = [
      'id' => 2,
      'widget' => 'image',
      'editable' => 0,  
      'fid' => 5,
      'versions' => [
          'w33xh50' => ('https://dummyimage.com/762x600/f0f0f0/2cb51d.png'),
      ] 
    ];
    
    $content[] = [
      'id' => 3,
      'widget' => 'editor',
      'value' => '<h1>Medium ' . time() . '</h1><h2>Format XYZ</h2><p>Dieser Inhalt wird vom Server geladen und kann dann bearbeitet werden.</p>',
    ];
   

  return $content;  
  }

  function getWidgetOptions(){
    return array(
      'change_layout' => 0,
      'change_input' => 0,
      'online_medium_chooser_values' => $this->getOnlineMediumOptions(),  
      'message_on_setup' => "<p><strong>Hinweis</strong></p><p>Bitte wählen Sie aus den vorhandenen Online-Medien pro Spalte aus. Sie können den Inhalt bearbeiten.</p>",  
    );
  }    
}
