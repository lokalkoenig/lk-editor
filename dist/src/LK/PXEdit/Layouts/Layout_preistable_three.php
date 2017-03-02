<?php

namespace LK\PXEdit\Layouts;
use LK\PXEdit\Doctype;
/**
 * Description of Layout_preistable_three
 *
 * @author Maikito
 */
class Layout_preistable_three extends Doctype {
    //put your code here
    
    var $id = 'layout-preistable_three';
    var $field_instances = 4;

    function getDefinition() {
      $def = [];
      $def[0] = [
          'width' => 100,
          'height' => 'auto',
      ];

      $def[0]['fields'][] = [
        'width' => 100,
        'height' => 100,
      ];


      $def[1] = [
        'width' => 100,
        'height' => 'calc',
      ];

      $def[1]['fields'][] = [
        'left' => 0,
        'width' => 33,
        'height' => 100,
      ];

      $def[1]['fields'][] = [
        'left' => 33,
        'width' => 33,
        'height' => 100,
      ];

      $def[1]['fields'][] = [
        'left' => 66,
        'width' => 33,
        'height' => 100,
      ];

      return $def;
    }



    function getMockup(){
      return '<h1 class="page-title"></h1>
        <div class="float-100 widget widget-flexibile" data-height="50" data-width="100" data-index="1" data-widget="editor"></div>
        <div class="float-3 float-col" data-height="50">
             <div class="float-100 widget widget-table-fixed" data-height="50" data-width="33" data-index="2" data-widget="table"></div>   
         </div>
          <div class="float-3 float-col" data-height="50">
             <div class="float-100 widget widget-table-fixed" data-height="50" data-width="33" data-index="3" data-widget="table"></div>
         </div>
        <div class="float-3 float-col" data-height="50">
            <div class="float-100 widget widget-table-fixed" data-height="50" data-width="33" data-index="4" data-widget="table"></div>   
        </div>';  
    }
}
