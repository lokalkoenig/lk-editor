<?php

namespace LK\PXEdit\Layouts;
use LK\PXEdit\Doctype;

/**
 * Description of Layout_5050_right
 *
 * @author Maikito
 */
class Layout_50_50_right extends Doctype {
    //put your code here
    
    var $id = 'layout-50-50-right';
    var $field_instances = 3;

    function getDefinition() {
      $def = ['regions' => 2];

      $def['fields'][] = [
        'width' => 50,
        'height' => 100,
        'left' => 50,
        'top' => 0,
        'last' => TRUE,
      ];
      
      $def['fields'][] = [
        'width' => 50,
        'height' => 50,
        'left' => 0,
        'top' => 0,
      ];

      $def['fields'][] = [
        'width' => 50,
        'height' => 50,
        'left' => 0,
        'top' => 50,
      ];

      return $def;
    }

    function getMockup(){
        
      return '<h1 class="page-title"></h1> 
              <div class="float-2 float-col widget" data-height="100" data-width="50" data-index="1" data-widget=""></div>
               <div class="float-2 float-col" data-height="100">
                       <div class="float-100 widget" data-height="50" data-width="50" data-index="2" data-widget=""></div>   
                       <div class="float-100 widget" data-height="50" data-width="50" data-index="3" data-widget=""></div>   
               </div>';  
    }
}