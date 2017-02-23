<?php

namespace LK\PXEdit\Layouts;
use LK\PXEdit\Doctype;

/**
 * Description of LayoutFull
 *
 * @author Maikito
 */
class Layout_full extends Doctype {
    //put your code here
    
    var $id = 'layout-full';
    var $field_instances = 1;
    
    function getDefinition() {
      $def = [];
      $def[0] = [
          'width' => 100,
          'height' => 100,
      ];
      
      $def[0]['fields'][] = [
        'width' => 100,
        'height' => 100,
      ];
      
      return $def;
    }

    function getMockup(){
      return '<h1 class="page-title"></h1>'
      . '<div class="float-100 widget" data-height="100" data-width="100" data-index="1" data-widget=""></div>';  
    }
}