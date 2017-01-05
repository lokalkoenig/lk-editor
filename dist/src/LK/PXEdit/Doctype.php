<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace LK\PXEdit;

/**
 * Description of Doctype
 *
 * @author Maikito
 */
abstract class Doctype {
    
    var $id = null;
    var $field_instances = 0;
    
    abstract function getMockup();
    
    function getId(){
        return $this -> id;
    }    
    
    function isGeneralDoctype(){
        return true;
    }
    
    function __toString() {
        
        $id = $this ->getId();
        $mockup = $this ->getMockup();
        $general = $this ->isGeneralDoctype();
        $html = '<div class="layout-template ' . $id . '" data-id="'. $id .'" data-general="'. $general .'">' . $mockup . '</div>';
 
    return $html;    
    }  
}