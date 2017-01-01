<?php

namespace LK\PDF\PXEditPresets;

class Preisliste extends \LK\PDF\Preset {
    //put your code here
    
    var $category = 'sonstiges';
    var $title = 'Preisliste';
    
    function getDefaultValues(){
        $value = new \stdClass();
        $value -> layout = 'layout-full';
        $value -> title = 'Preisliste';
        $value -> active = 0;
        
        $value -> content = array();
        $value -> content[] = [
            'id' => 1,
            'widget' => 'table',
            'title' => '<h1>Preisliste</h1><p>Erklärung zur Preisliste</p>',
            'rows' => [
                0 => [
                    'Spalte 1',
                    'Spalte 2',
                    'Spalte 3'
                ],
                1 => [
                    'Inhalt',
                    'Inhalt',
                    'Inhalt'
                ]
            ]
        ];
        
    return $value;    
    }
    
    function getWidgetOptions(){
        return array(
            'change_layout' => 0,
            'change_input' => 0
        );
    }   
}