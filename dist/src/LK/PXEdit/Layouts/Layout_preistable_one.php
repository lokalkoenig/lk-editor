<?php

namespace LK\PXEdit\Layouts;
use LK\PXEdit\Doctype;

/**
 * Description of Layout_preistable_one
 *
 * @author Maikito
 */
class Layout_preistable_one extends Doctype {
    //put your code here
    
    var $id = 'layout-preistable_one';
    var $field_instances = 2;

    function getDefinition() {
      $def = [];
      $def = ['regions' => 1];

      $def['fields'][] = [
        'width' => 'full',
        'height' => 'auto',
        'left' => 0,
        'top' => 0,
        'last' => TRUE,
      ];

      $def['fields'][] = [
        'width' => 'full',
        'height' => 'calc',
        'left' => 0,
        'top' => 'calc',
      ];

      return $def;
    }

    function getMockup(){
      return '<h1 class="page-title"></h1>
             <div class="float-100 widget widget-flexibile" data-height="50" data-width="100" data-index="1" data-widget="editor"></div>
              <div class="float-100 widget widget-table-fixed" data-height="50" data-width="100" data-index="2" data-widget="table"></div>   
      ';  
    }
}
