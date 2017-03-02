<?php

namespace LK\PXEdit\Presets;
use LK\PXEdit\Preset;


/**
 * Description of OnlineMedium
 *
 * @author Maikito
 */
class OnlineMedium extends Preset {
    //put your code here
    var $category = 'online';
    var $title = 'Online-Werbeformen';


    function getId() {
        parent::getId();
    }


    function getDefaultValues(){

        $value = new \stdClass();
        $value -> layout = "layout-triple-one";
        $value -> title = $this -> title;
        $value -> active = 0;
        $value -> content = array();

        $value -> content[] = [
            'id' => 1,
            'widget' => 'image',
            'fid' => 0
        ];

        $value -> content[] = [
            'id' => 2,
            'widget' => 'editor',
            'value' => '<h2>Name der Werbeform</h2><p>Beschreibung</p>'
        ];

    return $value;
    }

    function getAvailableLayouts() {

      return [
          'layout-triple-one',
      ];
    }

    function getWidgetOptions(){
        return [
          'change_layout' => 0,
          'change_input' => 0,
          'footnote' => 0,
          'title_edit' => 0,
          'page_title' => 'Online-Werbeformen',
        ];
    }
}

