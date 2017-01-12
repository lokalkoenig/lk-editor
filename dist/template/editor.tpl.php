<div id="PXEdit" data-callback="<?php print $callback; ?>" data-callback-id="<?php print $pxeditid; ?>">
            <div class="container pdf">
                <div class="settings-panel">
                    <button class="btn btn-default btn-sm" title="Schliessen" id="document-reset">
                            <span class="glyphicon glyphicon-remove"></span><span class="label-in">Editor schließen<span
                    </button>
                    <button id="PXEdit-change-input" class="btn btn-default btn-sm">
                            <span class="glyphicon glyphicon-cog"></span><span class="label-in">Einstellungen<span
                    </button>
                    <button class="btn btn-primary btn-sm" title="Speichern Sie hier ihr Dokument" id="PXEdit-document-save">
                            <span class="glyphicon glyphicon-ok"></span><span class="label-in">Speichern</span>
                    </button>
                    <button class="btn btn-danger btn-sm" title="Löschen Sie das Dokument" id="PXEdit-document-remove">
                            <span class="glyphicon glyphicon-trash"></span><span class="label-in">Löschen</span>
                    </button>
                </div>    
            
		<header>
			<span class="label label-primary pull-right label-editor">PDF-Editor</span>
                        <div class="logo">
                            <img src="<?php print $header_logo; ?>" />
                        </div>    
          	</header>
            
                <div id="pdf-visibile-editor"></div>
                <div id="footnote" title="">
                  
                </div>
                <footer>
                        <div class="float-xs-8">
                            <div class="footer-logos">
                                <?php foreach($footer_logos as $logo): ?>
                                  <img src="<?php print $logo; ?>" />  
                                <?php endforeach; ?>
                            </div> 
                        </div>
                </footer>
	</div>
    <div id="available-layouts" class="hidden"></div>
</div>  
<div id="PXEdit-backdrop"></div>   
<div id="PXEdit-message" class="layout-menu well well-white"></div>
<div id="PXEdit-message-bkdrp" class="layout-menu-backdrop"></div>

<div class="modal fade" tabindex="-1" id="layoutModal" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content small-format-presentation">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">Layout auswählen</h4>
            </div>
            <div class="modal-body">
                <p>Sie können andere Eingeformate für die Regionen das Layouts auswählen.</p>
                
                <div id="vkudoc-option-change-layout">
                    <p><strong>Layout festlegen</strong></p>
                    <div class="clearfix" id="change-layout">
                        <p>Bitte wählen Sie ein Layout für Ihr Dokument aus.</p>
                        <div id="pdfdoc-alter-layout"></div>
                    </div>
                    
                    <hr />
                </div>
               
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
                
                
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Abbrechen</button>
              <button type="button" class="btn btn-primary" id="document-save-settings">Ändern</button>
            </div>
          </div>
        </div>
</div>
