<?php

namespace LK\PXEdit\Layouts;
use LK\PXEdit\Doctype;

/**
 * Description of Layout_5050
 *
 * @author Maikito
 */
class Layout_50_50 extends Doctype {
    //put your code here
    
    var $id = 'layout-50-50';
    var $field_instances = 2;

    function getDefinition() {
      $def = ['regions' => 2];
      $def['fields'][] = [
        'width' => 50,
        'height' => 100,
        'left' => 0,
        'top' => 0,
      ];

      $def['fields'][] = [
        'width' => 50,
        'height' => 100,
        'left' => 50,
        'top' => 0,
      ];

      return $def;
    }

    function getMockup(){
        
      return '<h1 class="page-title"></h1>
            <div class="float-2 widget" data-height="100" data-width="50" data-index="1" data-widget=""></div>
            <div class="float-2 widget" data-height="100" data-width="50" data-index="2" data-widget=""></div>';  
    }
}