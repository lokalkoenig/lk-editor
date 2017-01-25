<?php

namespace LK\PXEdit\Presets;
use LK\PXEdit\Preset;

/**
 * Description of OnlineArgumentation
 *
 * @author Maikito
 */
class OnlineArgumentation extends Preset {
    //put your code here
    
    var $category = 'online';
    var $title = 'Onlineargumentation';
    
    function getDefaultValues(){
        
        $sample_table = [
                0 => [
                    'Spalte 1',
                    'Spalte 2',
                ],
                1 => [
                    'Inhalt',
                    'Inhalt',
                ]
        ];
        
        $text_value = '<h2>Subtitel</h2><p>Text</p>';
        
        $value = new \stdClass();
        $value -> layout = 'layout-50-50-right';
        $value -> title = $this -> title;
        $value -> active = 0;
        
        $value -> content = array();
        
        $value -> content[] = [
            'id' => 1,
            'widget' => 'editor',
            'value' => $text_value
        ];
        
        $value -> content[] = [
            'id' => 2,
            'widget' => 'image',
        ];
        
        $value -> content[] = [
            'id' => 3,
            'widget' => 'table',
            'title' => '<h2>Tabelle</h2>',
            'rows' => $sample_table,
        ];
        
        $value -> sample = [
            'layout-50-50-right' => $value -> content,
            'layout-50-50-left' => [
                0 => [
                  'id' => 1,
                  'widget' => 'table',
                  'title' => '<h2>Tabelle</h2>',
                  'rows' => $sample_table,  
                ],
                1 => [
                  'id' => 2,
                  'widget' => 'image',
                  'fid' => 0
                ],
                2 => [
                  'id' => 2,
                  'widget' => 'editor',
                  'value' => $text_value 
                ]
            ],
            'layout-50-50' => [
              0 => [
                  'id' => 1,
                  'widget' => 'editor',
                  'value' => $text_value  
              ],
              1 => [
                'id' => 1,
                'widget' => 'table',
                'title' => '<h2>Tabelle</h2>',
                'rows' => $sample_table,  
              ],  
            ],
            'layout-full' => [
              0 => [
                  'id' => 1,
                  'widget' => 'editor',
                  'value' => $text_value
              ]  
            ],
        ];
        
                
    return $value;    
    }
    
    public function getAvailableLayouts(){
      return [
        'layout-50-50-right',
        'layout-50-50-left',
        'layout-full',
        'layout-50-50'  
      ];
    }
    
    function getWidgetOptions(){
        return array(
            'layout_content' => 1,
            'change_layout' => 1,
            'change_input' => 1
        );
    }   
}
