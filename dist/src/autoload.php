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
      $include_file = str_replace('\\', '/', $className);
      require __DIR__ . '/' .$include_file . '.php';
    }  
}

spl_autoload_register("PXEdit_Autoload");
