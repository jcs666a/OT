
<?php
$file = fopen ("http://www.example.com/", "r");
if (!$file) {
    echo "<p>Imposible abrir el archivo remoto.\n";
    exit;
}
while (!feof ($file)) {
    $line = fgets ($file, 1024);
    /* Esto solo trabaja si el titulo y sus tags estan en una línea */
    if (preg_match ("@\<title\>(.*)\</title\>@i", $line, $out)) {
        $title = $out[1];
        break;
    }
}
fclose($file);
?>
