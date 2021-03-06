<?php

namespace LK\PXEdit\Layouts;
use LK\PXEdit\Doctype;

/**
 * Description of Layout_triple_online
 *
 * @author Maikito
 */
class Layout_triple_online extends Doctype {
    //put your code here
    
    var $id = 'layout-triple-online';
    var $field_instances = 9;

     function getDefinition() {
      $def = ['regions' => 3];

      for($x = 1; $x < 4; $x++){

        $index = $x * 1;

        $def['fields'][] = [
          'skip' => TRUE,
        ];

        // image
        $def['fields'][] = [
          'width' => 33,
          'height' => 50,
          'left' => ($index - 1) * 33,
          'top' => 0,
        ];

        $def['fields'][] = [
          'width' => 33,
          'height' => 50,
          'left' => ($index - 1) * 33,
          'top' => 50,
        ];
      }
     
      return $def;
    }
    
    function getMockup(){
      return '<h1 class="page-title"></h1>
              <div class="float-3 float-col" data-height="100">
                   <div class="float-100 widget" data-height="0" data-width="33" data-index="1" data-widget=""></div>   
                   <div class="float-100 widget widget-edit-disabled" data-height="50" data-width="33" data-index="2" data-widget=""></div>
                   <div class="float-100 widget widget-empty-disabled" data-height="50" data-width="33" data-index="3" data-widget=""></div>
               </div>
                <div class="float-3 float-col" data-height="100">
                   <div class="float-100 widget" data-height="0" data-width="33" data-index="4" data-widget=""></div>   
                   <div class="float-100 widget widget-edit-disabled" data-height="50" data-width="33" data-index="5" data-widget=""></div>
                   <div class="float-100 widget widget-empty-disabled" data-height="50" data-width="33" data-index="6" data-widget=""></div>
               </div>
               <div class="float-3 float-col" data-height="100">
                   <div class="float-100 widget" data-height="0" data-width="33" data-index="7" data-widget=""></div>   
                   <div class="float-100 widget widget-edit-disabled" data-height="50" data-width="33" data-index="8" data-widget=""></div>
                   <div class="float-100 widget widget-empty-disabled" data-height="50" data-width="33" data-index="9" data-widget=""></div>
               </div>';  
    }
}
