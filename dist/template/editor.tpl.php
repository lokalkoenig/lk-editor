<div id="PXEdit" class="pxedit" data-callback="<?php print $callback; ?>" data-callback-id="<?php print $pxeditid; ?>">
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
                <div id="footnote" title=""></div>
                <footer><div class="float-xs-8"><div class="footer-logos">
                                <?php foreach($footer_logos as $logo): ?>
                                  <img src="<?= $logo; ?>" />
                                <?php endforeach; ?>
                            </div>
                  </div>
                </footer>
	</div>

    <div id="available-inputs" class="hidden">
      <div class="form-group">
        <p><label for="choose-type" style="margin-bottom: 0;">Inhaltsart</label></p>
        <button data-widget="editor" class="btn btn-block btn-default">Text</button>
        <button data-widget="image" class="btn btn-block btn-default">Bild</button>
        <button data-widget="table" class="btn btn-block btn-default">Tabelle</button>
       </div>
    </div>

    <div id="available-layouts" class="hidden"></div>
    <div id="available-new-layout" class="hidden"></div>
</div>
<div id="PXEdit-backdrop"></div>
<div id="PXEdit-message" class="layout-menu well well-white"></div>
<div id="PXEdit-message-bkdrp" class="layout-menu-backdrop"></div>
