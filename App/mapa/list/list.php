<html>
<head>
<script src="../js/list.min.js"></script>
 <!-- CSS  -->
    <link href="../min/plugin-min.css" type="text/css" rel="stylesheet">
    <link href="../min/custom-min.css" type="text/css" rel="stylesheet" >

<link rel="stylesheet" href="../css/list.css">
</head>
<body>
<div id="dist">
  <input class="search" placeholder="Buscar" />
        
<?php
	include_once 'db_functions.php';
        $db = new DB_Functions();
        $dists = $db->getDist();

        if ($dists != false)
            $no_of_dists = mysql_num_rows($dists);
        else
            $no_of_dists = 0;
?>

<table class="striped">
        <thead>
          <tr>
              <th data-field="nom"><button class="sort" data-sort="nom">Nombre</button></th>
              <th data-field="vel"><button class="sort" data-sort="vel">Velocidad</th>
              <th data-field="fac"><button class="sort" data-sort="fac">Facilidades</th>
              <th data-field="pdm"><button class="sort" data-sort="pdm">PDM</th>

          </tr>
        </thead>

        <tbody class="list">
	 <?php
	       if ($no_of_dists > 0){
		?>
	<?php 
		while ($row = mysql_fetch_array($dists)) {
	?>
	           <tr>
                   <td class="nom"><?php echo $row["nom"] ?></td>
                   <td class="vel"><?php echo $row["vel"] ?></td>
                   <td class="fac"><?php echo $row[fac] ?></td>
                   <td class="pdm"><?php echo $row[pdm] ?></td>
                   </tr>
	   <?php }
                } else { ?>
                    <li>
                        No existen registros!
                <?php } ?>

	</tbody>
      </table>

<script type="text/javascript">
var options = {
  valueNames: [ 'nom', 'vel','fac','pdm' ]
};

var distList = new List('dist', options);
</script>
 <!--  Scripts-->
    <script src="../min/plugin-min.js"></script>
    <script src="../min/custom-min.js"></script>
</body>
</html>

