<?php

namespace LK\PXEdit\Layouts;
use LK\PXEdit\Doctype;

/**
 * Description of Layout_5050_double
 *
 * @author Maikito
 */
class Layout_50_50_double extends Doctype {
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
