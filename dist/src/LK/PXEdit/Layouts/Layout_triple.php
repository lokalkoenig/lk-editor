<?php

namespace LK\PXEdit\Layouts;
use LK\PXEdit\Doctype;

/**
 * Description of Layout_triple
 *
 * @author Maikito
 */
class Layout_triple extends Doctype {
    //put your code here
    
    var $id = 'layout-tripple';
    var $field_instances = 6;
    
    function getMockup(){
      return '<h1 class="page-title"></h1> 
              <div class="float-3 float-col" data-height="100">
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
