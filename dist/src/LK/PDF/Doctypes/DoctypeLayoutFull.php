<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace LK\PDF\Doctypes;

class LayoutFull extends Doctype {
    //put your code here
    
    var $id = 'layout-full';
    var $field_instances = 1;
    
    function getMockup(){
      return '<div class="float-100 widget" data-height="100" data-width="100" data-index="1" data-widget=""></div>';  
    }
}


class Layout_5050 extends Doctype {
    //put your code here
    
    var $id = 'layout-50-50';
    var $field_instances = 2;
    
    function getMockup(){
        
      return '<div class="float-2 widget" data-height="100" data-width="50" data-index="1" data-widget=""></div>
            <div class="float-2 widget" data-height="100" data-width="50" data-index="2" data-widget=""></div>';  
    }
}

class Layout_5050_right extends Doctype {
    //put your code here
    
    var $id = 'layout-50-50-right';
    var $field_instances = 3;
    
    function getMockup(){
        
      return ' <div class="float-2 float-col widget" data-height="100" data-width="50" data-index="3" data-widget=""></div>
               <div class="float-2 float-col" data-height="100">
                       <div class="float-100 widget" data-height="50" data-width="50" data-index="1" data-widget=""></div>   
                       <div class="float-100 widget" data-height="50" data-width="50" data-index="2" data-widget=""></div>   
               </div>';  
    }
}

class Layout_5050_left extends Doctype {
    //put your code here
    
    var $id = 'layout-50-50-left';
    var $field_instances = 3;
    
    function getMockup(){
        
      return '<div class="float-2 float-col" data-height="100">
                   <div class="float-100 widget" data-height="50" data-width="50" data-index="1" data-widget=""></div>   
                   <div class="float-100 widget" data-height="50" data-width="50" data-index="2" data-widget=""></div>   
               </div>
               <div class="float-2 float-col widget" data-height="100" data-width="100" data-index="3" data-widget=""></div>';  
    }
}


class Layout_5050_double extends Doctype {
    //put your code here
    
    var $id = 'layout-50-50-double';
    var $field_instances = 4;
    
    function getMockup(){
        
      return '<div class="float-2 float-col" data-height="100">
                   <div class="float-100 widget" data-height="50" data-width="50" data-index="1" data-widget=""></div>   
                   <div class="float-100 widget" data-height="50" data-width="50" data-index="2" data-widget=""></div>   
               </div>
                <div class="float-2 float-col" data-height="100">
                   <div class="float-100 widget" data-height="50" data-width="50" data-index="3" data-widget=""></div>   
                   <div class="float-100 widget" data-height="50" data-width="50" data-index="4" data-widget=""></div>   
               </div>';  
    }
}


class Layout_triple extends Doctype {
    //put your code here
    
    var $id = 'layout-tripple';
    var $field_instances = 6;
    
    function getMockup(){
      return '<div class="float-3 float-col" data-height="100">
                   <div class="float-100 widget" data-height="50" data-width="33" data-index="1" data-widget=""></div>   
                   <div class="float-100 widget" data-height="50" data-width="33" data-index="2" data-widget=""></div>   
               </div>
                <div class="float-3 float-col" data-height="100">
                   <div class="float-100 widget" data-height="50" data-width="33" data-index="3" data-widget=""></div>   
                   <div class="float-100 widget" data-height="50" data-width="33" data-index="4" data-widget=""></div>   
               </div>
               <div class="float-3 float-col" data-height="100">
                   <div class="float-100 widget" data-height="50" data-width="33" data-index="5" data-widget=""></div>   
                   <div class="float-100 widget" data-height="50" data-width="33" data-index="6" data-widget=""></div>   
               </div>';  
    }
}


/**
 * Online Formate with placeholder values
 * 
 * @author Maik Gramatte
 * @since 1.0
 */
class Layout_triple_one extends Doctype {
    //put your code here
    
    var $id = 'layout-tripple_one';
    var $field_instances = 2;
    
    function isGeneralDoctype(){
        return false;
    }
    
    function getMockup(){
      return '<div class="float-3 float-col" data-height="100">
                   <div class="float-100 widget" data-height="50" data-width="33" data-index="1" data-widget=""></div>   
                   <div class="float-100 widget" data-height="50" data-width="33" data-index="2" data-widget=""></div>   
               </div>
                <div class="float-3 float-col" data-height="100">
                   <div class="float-100 widget-placeholder" data-height="50" data-width="33"></div>   
                   <div class="float-100 widget-placeholder" data-height="50" data-width="33"></div>   
               </div>
               <div class="float-3 float-col" data-height="100">
                   <div class="float-100 widget-placeholder" data-height="50" data-width="33"></div>   
                   <div class="float-100 widget-placeholder" data-height="50" data-width="33"></div>   
               </div>';  
    }
}



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