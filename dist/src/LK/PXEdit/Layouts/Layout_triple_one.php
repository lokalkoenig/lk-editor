<?php

namespace LK\PXEdit\Layouts;
use LK\PXEdit\Doctype;

/**
 * Description of Layout_triple_one
 *
 * @author Maikito
 */
class Layout_triple_one extends Doctype {
    //put your code here
    
    var $id = 'layout-triple-one';
    var $field_instances = 2;
    
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
