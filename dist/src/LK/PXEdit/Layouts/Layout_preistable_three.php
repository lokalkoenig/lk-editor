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
      
      $def = ['regions' => 3];

      $def['fields'][] = [
        'width' => 'full',
        'height' => 'auto',
        'left' => 0,
        'top' => 0,
        'last' => TRUE,
      ];
      
      $def['fields'][] = [
        'width' => 33,
        'height' => 'calc',
        'left' => 0,
        'top' => 'calc',
      ];

      $def['fields'][] = [
        'width' => 33,
        'height' => 'calc',
        'left' => 33,
        'top' => 'calc',
      ];
      
      $def['fields'][] = [
        'width' => 33,
        'height' => 'calc',
        'left' => 66,
        'top' => 'calc',
        'last' => TRUE,
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
