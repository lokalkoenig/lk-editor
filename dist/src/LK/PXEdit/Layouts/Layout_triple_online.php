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
    
    var $id = 'layout-tripple-online';
    var $field_instances = 9;
    
    function getMockup(){
      return '<div class="float-3 float-col" data-height="100">
                   <div class="float-100 widget" data-height="0" data-width="33" data-index="1" data-widget=""></div>   
                   <div class="float-100 widget" data-height="50" data-width="33" data-index="2" data-widget=""></div>   
                   <div class="float-100 widget" data-height="50" data-width="33" data-index="3" data-widget=""></div>   
               </div>
                <div class="float-3 float-col" data-height="100">
                   <div class="float-100 widget" data-height="0" data-width="33" data-index="4" data-widget=""></div>   
                   <div class="float-100 widget" data-height="50" data-width="33" data-index="5" data-widget=""></div>   
                   <div class="float-100 widget" data-height="50" data-width="33" data-index="6" data-widget=""></div>   
               </div>
               <div class="float-3 float-col" data-height="100">
                   <div class="float-100 widget" data-height="0" data-width="33" data-index="7" data-widget=""></div>   
                   <div class="float-100 widget" data-height="50" data-width="33" data-index="8" data-widget=""></div>   
                   <div class="float-100 widget" data-height="50" data-width="33" data-index="9" data-widget=""></div>   
               </div>';  
    }
}
