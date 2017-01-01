<?php

require_once 'autoload.php';

$docs = new LK\PDF\DyanmicLayout();
$html = $docs ->getDefinitions();
$image_presets = $docs -> getImagePresets();

        $footer_logos = array(
            "/sites/default/files/styles/verlags-logos-klein/public/verlagslogo/ft.png",
            '/sites/default/files/styles/verlags-logos-klein/public/verlagslogo/br.png?itok=cu0U17XP',
            '/sites/default/files/styles/verlags-logos-klein/public/verlagslogo/ct.png?itok=F6FMOtnd',
            '/sites/default/files/styles/verlags-logos-klein/public/verlagslogo/sa.png?itok=tQSG6389',
            '/sites/default/files/styles/verlags-logos-klein/public/verlagslogo/kt.png?itok=aghT9tC9',
            '/sites/default/files/styles/verlags-logos-klein/public/verlagslogo/franken-aktuell.png?itok=Ts6hLCyY'
        );
        
        $header_logo = "/sites/default/files/styles/verlags-logos-klein/public/mgo_logo_quer.png?itok=C0S5IL9q";
?>

<!DOCTYPE html>
<html>
<head>
	<title>Test</title>
        
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <link rel="stylesheet" type="text/css" href="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css">
        <script type="text/javascript" src="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
        
        <!-- Editor -->
        <script type="text/javascript" src="js/trumbowyg/trumbowyg.js"></script>
	<link rel="stylesheet" type="text/css" href="js/trumbowyg/ui/trumbowyg.css"></rel>
        
        <!-- FILEUpload -->
        <script src="js/fileupload/jquery.ui.widget.js"></script>
        <script src="js/fileupload//jquery.iframe-transport.js"></script>
        <script src="js/fileupload/jquery.fileupload.js"></script>
        
        <!-- Inplace Editor -->
        <script type="text/javascript" src="js/bootstrap-editable.js"></script>
        
        <script type="text/javascript" src="js/x-edit-editor.js?<?php print time(); ?>"></script>
        <script type="text/javascript" src="js/PXEdit/editor.js?<?php print time(); ?>"></script>
        <script type="text/javascript" src="js/PXEdit/image.js?<?php print time(); ?>"></script>
        <script type="text/javascript" src="js/PXEdit/cell.js?<?php print time(); ?>"></script>
        <script type="text/javascript" src="js/PXEdit/table.js?<?php print time(); ?>"></script>
        <script type="text/javascript" src="js/LK-PDF-Editor.js?<?php print time(); ?>"></script>
     
        <link rel="stylesheet" type="text/css" href="css/project.css?<?php print time(); ?>"></link>
 </head>
<body class="pdf-editor">
	
    
    
    
      <div id="PXEdit" data-callback="callback.php">
        <div class="backdrop"></div>    
            <div class="container pdf">
                
                <div class="settings-panel">
                    <button class="btn btn-default btn-sm" title="Schliessen" id="document-reset">
                            <span class="glyphicon glyphicon-remove"></span><span class="label-in">Editor schliessen<span
                    </button>
                    <button id="PXEdit-change-input" class="btn btn-default btn-sm" onclick="PDFForm.openSettings();">
                            <span class="glyphicon glyphicon-cog"></span><span class="label-in">Einstellungen<span
                    </button>
                    <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#saveModal" title="Speichern Sie hier ihr Dokument" id="document-save">
                            <span class="glyphicon glyphicon-ok"></span><span class="label-in">Speichern</span>
                    </button>
                </div>    
            
		<header>
			<span class="label label-primary pull-right label-editor">PDF-Editor</span>
                        <div class="logo">
                            <img src="<?php print $header_logo; ?>" />
                        </div>    
          	</header>
            
                <div id="pdf-visibile-editor"></div>
                <footer>
                        <div class="float-xs-8">
                            <div class="footer-logos">
                                <?php foreach($footer_logos as $logo): ?>
                                  <img src="<?php print $logo; ?>" />  
                                <?php endforeach; ?>
                            </div> 
                        </div>
                         <div class="float-xs-4 text-right">
                             <div class="footnote-table" style="display: none;">
                                 <div class="footnote-cell">
                                    <div id="footnote" title="Die Fussnote wird in allen Dokumente angezeigt und kann nicht entfernt werden" class="editor-widget" data-widget="text">Footnote</div>
                                 </div>
                             </div>
                        </div>    
                </footer>
	</div>
     
    
    
    <!-- Modals -->
    
    <div class="modal fade" tabindex="-1" id="saveModal" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">Dokument speichern</h4>
            </div>
            <div class="modal-body">
                <p>Er hörte leise Schritte hinter sich. Das bedeutete nichts Gutes. Wer würde ihm schon folgen, spät in der Nacht und dazu noch in dieser engen Gasse mitten im übel beleumundeten Hafenviertel?</p>
                
                <div class="form-group">
                    <label for="title">Titel des Dokuments</label>
                    <input type="text" class="form-control" id="dokument-title" value="" placeholder="Titel" required="required" />
                    <p class="help-block">Wird in der Auswahl der Dokumente als Titel verwendet.</p>
                </div>
                
                 <div class="form-group select-category">
                    <label for="category">Kategorie</label>
                    <select class="form-control" name="category" id="dokument-category">
                        <option value="0"></option>
                        <option value="print">Print</option>
                        <option value="online">Online</option>
                        <option value="sonstiges">Sonstiges</option>
                    </select>
                    <p class="help-block">Es stehen die Kategorien Print, Online und Sonstiges zur Auswahl.</p>
                </div>
                
                <div class="form-group">
                      <div class="checkbox">
                        <label>
                          <input type="checkbox" id="dokument-freigabe"> Dokument fuer Mitarbeiter freischalten
                        </label>
                      </div>
                  </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Schließen</button>
              <button type="button" class="btn btn-primary" id="PXEdit-save-document">Speichern</button>
            </div>
          </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
      </div><!-- /.modal -->
      
    <!-- LayoutModals -->  
      
    <div class="modal fade" tabindex="-1" id="layoutModal" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">Layout auswählen</h4>
            </div>
            <div class="modal-body">
                <p>Sie können andere Eingeformate für die Regionen das Layouts auswählen.</p>
                
               
                <div class="clearfix collapse in" id="current-layout">
                    <div class="row">
                        
                        <div class="col-xs-4">
                             <p><label>Aktuelles Layout</label></p>
                             
                             <div id="pdf-current-layout"><!-- Current Layout --></div>
                        </div>
                        
                        <div class="col-xs-8 col-select">
                             <div class="form-group">
                                <p><label for="choose-type">Eingabetyp ändern</label></p>
                               
                               <div class="btn-group" role="group">
                                   <button data-widget="editor" class="btn btn-default">Editor</button>   
                                   <button data-widget="image" class="btn btn-default">Bild</button>   
                                   <button data-widget="table" class="btn btn-default">Tabelle</button>
                                </div>
                               </div>
                               <p class="small"><small>* Durch das Ändern der Vorlage oder Eingabeformate gehen bereits eingegebene Daten verloren.</small></p> 
                        </div>
                    </div>
                </div>    
                
                <div id="vkudoc-option-change-layout">
                    <hr />
                    <p><a role="button" data-toggle="collapse" href="#change-layout"><span class="glyphicon glyphicon-chevron-right"></span> <strong>Anderes Layout auswählen</strong></a></p>
                    <div class="clearfix collapse" id="change-layout">
                        <p>Bitte wählen Sie ein anderes Layout für Ihr Dokument aus.</p>
                        <div id="pdfdoc-alter-layout"></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Abbrechen</button>
              <button type="button" class="btn btn-primary" id="document-save-settings">Ändern</button>
            </div>
          </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
      </div><!-- /.modal -->
    </div>  
    <div id="available-layouts" class="hidden">
         <?php print $html; ?> 
    </div>
   
    
    <div class="well well-sm demo">
        <h2 class="text-center">Prototyp: PXEditor</h2>
       
        <ul class="small">
            <li>Das Speichern ist nur vorbereitet.</li>
            <li>Bild und Bildgroessen sind vorbereitet, jedoch werden die Bilder nicht zurechtgeschnitten. Die Bildgroessenhinweise sind aber produktionsreif, aber nicht Pflicht.</li>
            <li>Nur beim Punkt Eigenes Dokument kann man das Layout veraendern. Dieses kann man auch frei einordnen.</li>
            <li>Das Online-Medium ist speziell, 2/3 sind Platzhalter, da dieses Format ein Komponentenformat ist. Spaeter kann der MA individuell bis zu 3 Online-Formate in einem Dokument zusammenfassen.</li>
        </ul>
        <p>  
            
            <button class="btn btn-default PXEdit-create" data-preset="OnlineMedium">Online-Medium</button>
            <button class="btn btn-default PXEdit-create" data-preset="RegionalArgumentation">Regional Argumentation</button>
        </p>      
        <p>      
            <button class="btn btn-default PXEdit-create btn-2click" data-preset="Preisliste">Preisliste</button>
            <button class="btn btn-default PXEdit-create" data-preset="OpenDokument">Eigenes Dokument</button>
        </p>  
    </div>  
    <!--  
      TODOS:
      - Make category mandatory to choose on free document
      - Table preset
     --> 
      <style>
          .demo {
            border-radius: 0;
            background: White;
            width: 360px;
            font-size: small;
            margin: 0 auto;
            margin-top: 100px; 
          }
        </style>  
      
     <script>    
        jQuery(document).ready(function(){
           <?php while(list($key, $val) = each($image_presets)) :?> 
                PDFForm.image_presets['<?php print $key ?>'] = '<?php print $val; ?>';   
           <?php endwhile; ?>  
               
           //$('.btn-2click').trigger('click');    
        });
    </script>  
      
</body>
</html>

