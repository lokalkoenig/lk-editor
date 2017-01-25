<?php
require_once 'src/autoload.php';

$variables = [];
$variables['footer_logos'] = [];
$variables['header_logo'] = "pxedit-logo.png";
$variables['callback'] = 'callback.php';
$doc = new \LK\PXEdit\DyanmicLayout();
$html = $doc->getEditorTemplate($variables);

?>

<!DOCTYPE html>
<html>
<head>
        <meta charset='utf-8'>
	<title>Test</title>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <link rel="stylesheet" type="text/css" href="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css">
        <script type="text/javascript" src="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>

        <!-- Editor -->
        <script type="text/javascript" src="js/trumbowyg-min.js"></script>
	<!--<link rel="stylesheet" type="text/css" href="js/trumbowyg/ui/trumbowyg.css"></rel>-->

        <!-- FILEUpload -->
        <script src="js/jquery.fileupload-min.js"></script>

        <!-- Inplace Editor -->
        <script type="text/javascript" src="js/PXEdit-packed-min.js?v<?php print filemtime('js/PXEdit-packed-min.js'); ?>"></script>
        <link rel="stylesheet" type="text/css" href="css/project.css?<?php print filemtime('js/PXEdit-packed-min.js'); ?>"></link>
 </head>
<body class="pdf-editor">

<?php print $html; ?>

  <div class="well well-sm demo">
        <h2 class="text-center">Prototyp: PXEditor</h2>

        <ul class="small">
            <li>Das Speichern ist nur vorbereitet.</li>
            <li>Bild und Bildgroessen sind vorbereitet, jedoch werden die Bilder nicht zurechtgeschnitten. Die Bildgroessenhinweise sind aber produktionsreif, aber nicht Pflicht.</li>
            <li>Das Online-Medium ist speziell, 2/3 sind Platzhalter, da dieses Format ein Komponentenformat ist. Spaeter kann der MA individuell bis zu 3 Online-Formate in einem Dokument zusammenfassen.</li>
        </ul>

        <hr />

        <h4 class="text-center">Verlagsmodus</h4>

        <p>
            <button class="btn btn-default PXEdit-create" data-preset="OnlineArgumentation">Online Argument.</button>
            <button class="btn btn-default PXEdit-create" data-preset="RegionalArgumentation">Regional Argument.</button>
        </p>

        <p>
            <button class="btn btn-default PXEdit-create" data-preset="OnlineMedium">Online-Medium (Part)</button>
        </p>

        <p>
            <button class="btn btn-default PXEdit-create" data-preset="Preisliste">Preisliste</button>
            <button class="btn btn-default PXEdit-create btn-2click" data-preset="OpenDokument">Eigenes Dokument</button>
        </p>

        <hr />
        <h4 class="text-center">Mitarbeitermodus</h4>

        <p>
            <button class="btn btn-default PXEdit-create" data-preset="OnlineMediumCollection">Online-Medium (Collection)</button>
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

          .pdf-editor {
              background: #34495e;
          }
        </style>

        <script>


         $(document).ready(function(){
            // react on Document-Create, for
              $('.PXEdit-create').click(function(){
                  PDFForm.loading();
                  var preset = $(this).attr('data-preset');

                  PDFForm.loadDocument({'preset': preset}, function(){
                    console.log("The CB sais Yes");
                  });
               });
         });

         jQuery(document).ready(function(){
            jQuery('.PXEdit-create.btn-2click').click();
         });

        </script>
</body>
</html>

