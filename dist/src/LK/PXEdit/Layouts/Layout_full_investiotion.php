<?php

namespace LK\PXEdit\Layouts;
use LK\PXEdit\Doctype;

/**
 * Description of Layout-full-investiotion
 *
 * @author Maikito
 */
class Layout_full_investiotion extends Layout_full {

    var $id = 'layout-full-investiotion';

    function getMockup(){
      return '<h1 class="page-title"></h1>'
      . '<div class="float-100 widget widget-table-fixed" data-height="100" data-min-cols="3" data-max-cols="5" data-width="100" data-index="1" data-widget=""></div>';
    }
}
