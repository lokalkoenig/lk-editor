<?php

/**
 * 
 * @param type $className
 * @return type
 */
function PXEdit_Autoload($className) {
    
    $explode = explode('\\', $className);
   
    if($explode[0] != "LK"):
      return ;
    endif;
    
    if(in_array($explode[1], array('PXEdit'))){
        require __DIR__ . '/' .$className . '.php';
    }  
}

spl_autoload_register("PXEdit_Autoload");
