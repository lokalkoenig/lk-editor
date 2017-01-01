<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace LK\PDF\PXEditPresets;

/**
 * Description of RegionalArgumentation
 *
 * @author Maikito
 */
class RegionalArgumentation extends \LK\PDF\Preset {
    //put your code here
    
    var $category = 'print';
    var $title = 'Regional-Argumentationen';
    
    function getDefaultValues(){
        
        $value = new \stdClass();
        $value -> layout = 'layout-50-50-double';
        $value -> title = 'Regionalargumentation';
        $value -> active = 0;
        $value -> content = array();
        
        $value -> content[] = [
            'id' => 1,
            'widget' => 'image',
            'fid' => 0
        ];
        
        $value -> content[] = [
            'id' => 2,
            'widget' => 'editor',
            'value' => '<h1>Medientitel</h1><h2>Formate</h2><p>Beschreibung</p>'
        ];
        
        $value -> content[] = [
            'id' => 3,
            'widget' => 'editor',
            'value' => '<h1>Medientitel</h1><h2>Formate</h2><p>Beschreibung</p>'
        ];
        
        $value -> content[] = [
            'id' => 4,
            'widget' => 'editor',
            'value' => '<h1>Medientitel</h1><h2>Formate</h2><p>Beschreibung</p>'
        ];
        
    return $value;    
    }
    
    function getWidgetOptions(){
        return array(
            'change_layout' => 0,
            'change_input' => 1
        );
    }   
}


