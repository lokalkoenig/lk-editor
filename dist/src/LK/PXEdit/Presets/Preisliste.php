<?php

namespace LK\PXEdit\Presets;
use LK\PXEdit\Preset;

class Preisliste extends Preset {
    //put your code here
    
    var $category = 'sonstiges';
    var $title = 'Preiskalkulation';
    
    function getDefaultValues(){
      
        $sample_table = [
                0 => [
                    '<p><strong>Position</strong></p>',
                    '<p><strong>Preis</strong></p>',
                ],
                1 => [
                    '<p>Werbeform 1</p>',
                    '<p>200,00 EUR</p>',
                ],
                1 => [
                    '<p>Rabatt</p>',
                    '<p>- 10%</p>',
                ]
        ];
        
        $value = new \stdClass();
        $value -> layout = 'layout-preistable_three';
        $value -> title = 'Preiskalkulation';
        $value -> active = 0;
        
        $value -> content = array();
        $value -> content[] = [
            'id' => 1,
            'widget' => 'editor',
            'value' => '<p>Erklärung zur Preiskalkulation</p>',
        ];
        
        $value -> content[] = [
            'id' => 2,
            'widget' => 'table',
            'title' => '',
            'rows' => $sample_table,
        ];
        
        $value -> content[] = [
            'id' => 3,
            'widget' => 'table',
            'title' => '',
            'rows' => $sample_table,
        ];
        
        $value -> content[] = [
            'id' => 4,
            'widget' => 'table',
            'title' => '',
            'rows' => $sample_table,
        ];
        
        $value -> sample = [
            'layout-preistable_three' => $value -> content,
            'layout-preistable_two' => $value -> content,
            'layout-preistable_one' => $value -> content,
        ];
        
    return $value;    
    }
    
    function getWidgetOptions(){
        return array(
            'change_layout' => 0,
            'change_input' => 0,
            'table_text' => 0,
            'table_columns' => 0,
            'change_layout_via_menu' => 1
        );
    }   
    
    public function getAvailableLayouts(){
      return [
        'layout-preistable_three',
        'layout-preistable_two',
        'layout-preistable_one',  
      ];
    }
    
}