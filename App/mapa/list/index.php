<?php
	include_once 'db_functions.php';
        $db = new DB_Functions();
        $dists = mysql_query("select * FROM gmc_users");


        if ($dists != false)
            $no_of_dists = mysql_num_rows($dists);
        else
            $no_of_dists = 0;

	echo $no_of_dists;
?>

