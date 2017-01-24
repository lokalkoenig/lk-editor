<?php

namespace LK\PXEdit\Layouts;
use LK\PXEdit\Doctype;

/**
 * Description of Layout_5050_left
 *
 * @author Maikito
 */
class Layout_50_50_left extends Doctype {
    //put your code here
    
    var $id = 'layout-50-50-left';
    var $field_instances = 3;
    
    function getMockup(){
        
      return '<h1 class="page-title"></h1>
              <div class="float-2 float-col" data-height="100">
                   <div class="float-100 widget" data-height="50" data-width="50" data-index="1" data-widget=""></div>   
                   <div class="float-100 widget" data-height="50" data-width="50" data-index="2" data-widget=""></div>   
               </div>
               <div class="float-2 float-col widget" data-height="100" data-width="50" data-index="3" data-widget=""></div>';  
    }
}