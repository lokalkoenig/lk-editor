<?php

namespace LK\PXEdit\Presets;
use LK\PXEdit\Preset;

class Preisliste extends Preset {
    //put your code here
    
    var $category = 'sonstiges';
    var $title = 'Preisliste';
    
    function getDefaultValues(){
      
        $manager = $this->getManager();
        
        $sample_table = [
                0 => [
                    'Position',
                    'Preis',
                ],
                1 => [
                    'Werbeform 1',
                    '200,00 EUR',
                ],
                1 => [
                    'Rabatt',
                    '- 10%',
                ]
        ];
        
        
        $layout = new \LK\PDF\Doctypes\Layout_preistable_three();
        
        $manager ->addLayout($layout);
        $manager ->addLayout(new \LK\PDF\Doctypes\Layout_preistable_two());
        $manager ->addLayout(new \LK\PDF\Doctypes\Layout_preistable_one());
        
        $value = new \stdClass();
        $value -> layout = $layout ->getId();
        $value -> title = 'Preisliste';
        $value -> active = 0;
        
        $value -> content = array();
        $value -> content[] = [
            'id' => 1,
            'widget' => 'editor',
            'value' => '<h1>Preisliste</h1><p>Erklärung zur Preisliste</p>',
        ];
        
        $value -> content[] = [
            'id' => 1,
            'widget' => 'table',
            'title' => '',
            'rows' => $sample_table,
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
        
        $value -> sample = [];
        
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