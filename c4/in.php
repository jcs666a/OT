<!DOCTYPE html>
<html>
    <head>
        <title>GCM Telmex</title>
	<link rel="shortcut icon" href="images/favico.gif">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="css/style.css" type="text/css" charset="utf-8"/>
        <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css" charset="utf-8"/>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
        <script type="text/javascript">
            $(document).ready(function(){
                
            });
            function sendPushNotification(id){
                var data = $('form#'+id).serialize();
                $('form#'+id).unbind('submit');                
                $.ajax({
                    url: "send_message.php",
                    type: 'GET',
                    data: data,
                    beforeSend: function() {
                         
                    },
                    success: function(data, textStatus, xhr) {
                          $('.txt_message').val("");
                    },
                    error: function(xhr, textStatus, errorThrown) {
                         
                    }
                });
                return false;
            }
            function sendBroadcast(){
                var data = $('form#').serialize();
                $('form#').unbind('submit');                
                $.ajax({
                    url: "index.php",
                    type: 'GET',
                    data: data,
                    beforeSend: function() {
                         
                    },
                    success: function(data, textStatus, xhr) {
                          $('.txt_message').val("");
                    },
                    error: function(xhr, textStatus, errorThrown) {
                         
                    }
                });
                return false;
            }
	$(function() {
                $("#navigation a").stop().animate({"marginLeft":"-85px"},1000);
                $("#navigation > li").hover(
                    function () {
                        $("a",$(this)).stop().animate({"marginLeft":"-2px"},200);
	                    },
                    function () {
                        $("a",$(this)).stop().animate({"marginLeft":"-85px"},200);
	                    }
	                );
	            });
        </script>
        <style type="text/css">
            .container{
                width: 950px;
                margin: 0 auto;
                padding: 0;
            }
            h1{
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                font-size: 24px;
                color: #777;
            }
            div.clear{
                clear: both;
            }
            ul.devices{
                margin: 0;
                padding: 0;
            }
            ul.devices li{
                float: left;
                list-style: none;
                border: 1px solid #dedede;
                padding: 10px;
                margin: 0 15px 25px 0;
                border-radius: 3px;
                -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.35);
                -moz-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.35);
                box-shadow: 0 1px 5px rgba(0, 0, 0, 0.35);
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                color: #555;
            }
            ul.devices li label, ul.devices li span{
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                font-size: 12px;
                font-style: normal;
                font-variant: normal;
                font-weight: bold;
                color: #393939;
                display: block;
                float: left;
            }
            ul.devices li label{
                height: 25px;
                width: 50px;                
            }
            ul.devices li textarea{
                float: left;
                resize: none;
            }
            ul.devices li .send_btn{
                background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#0096FF), to(#005DFF));
                background: -webkit-linear-gradient(0% 0%, 0% 100%, from(#0096FF), to(#005DFF));
                background: -moz-linear-gradient(center top, #0096FF, #005DFF);
                background: linear-gradient(#0096FF, #005DFF);
                text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3);
                border-radius: 3px;
                color: #fff;
            }
	.broad{
		float: center;
                list-style: none;
                border: 1px solid #dedede;
                padding: 10px;
                margin: 0 15px 25px 0;
                border-radius: 3px;
                -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.35);
                -moz-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.35);
                box-shadow: 0 1px 5px rgba(0, 0, 0, 0.35);
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                color: #555;

	}
	body{
                background:url("images/material.jpg")no-repeat center fixed;
		-webkit-background-size: cover;
		-moz-background-size: cover;
		-o-background-size: cover;
	 	background-size: cover;
	        }
        .header{
                width:600px;
                height:56px;
                position:absolute;
                top:0px;
                left:25%;
	        }
        a.back{
                width:256px;
                height:73px;
                position:fixed;
                bottom:15px;
                right:15px;
	        }
        .scroll{
                width:133px;
                height:61px;
                position:fixed;
                bottom:15px;
                left:150px;
	        }
        .info{
                text-align:right;

	        }
        </style>
    </head>
    <body>
	<div class="header"></div>
		        <div class="scroll"></div>
		        <ul id="navigation">
		            <li class="inicio"><a href="index.php" title="Inicio"></a></li>
		            <li class="usuarios"><a href="index.php?action=usuario" title="Usuario"></a></li>
		            <li class="equipajes"><a href="index.php?action=equipaje" title="Fielder"></a></li>
		            <li class="servicios"><a href="index.php?action=servicio" title="Servicio"></a></li>
		            <li class="logout"><a href="index.php?exit=true" title="Cerrar Sesión"></a></li>
		        </ul>
        <?php
        include_once 'db_functions.php';
        $db = new DB_Functions();
        $users = $db->getAllUsers();
	$gcms = $db->getAllGcmIds();
        if ($users != false)
            $no_of_users = mysql_num_rows($users);
        else
            $no_of_users = 0;
	$gcmRegIds = array();
        while ($row = mysql_fetch_array($gcms)){
        array_push($gcmRegIds, $row['gcm_regid']);
}
	include_once './GCM.php';    
  	$gcm = new GCM();
	$pushMessage = $_POST['message'];
	if(isset($gcmRegIds) && isset($pushMessage)) {

        $message = array('price' => $pushMessage);
	$gcm->send_notification($gcmRegIds, $message);
}
        ?>
        <div class="container">
            <h1>Dispositivos Registrados: <?php echo $no_of_users; ?></h1>
         <form name="" class="broad" method="post" onsubmit="return sendBroadcast()">
                                <h3>Enviar a todos</h3>
				<div class="clear"></div>
                                <div class="send_container">
                                    <textarea rows="3" name="message" cols="25" class="txt_message" placeholder="Type message here"></textarea>
                                    <input type="hidden" name="regId" value="<?php echo $gcmRegIds ?>"/>
                                    <input type="submit" class="send_btn" value="Enviar" onclick=""/>
                                </div>
                            </form>
	    <hr/>
            <ul class="devices">
                <?php
                if ($no_of_users > 0) {
                    ?>
                    <?php
                    while ($row = mysql_fetch_array($users)) {
                        ?>
                        <li>
                            <form id="<?php echo $row["id"] ?>" name="" method="post" onsubmit="return sendPushNotification('<?php echo $row["id"] ?>')">
                                <label>Nombre: </label> <span><?php echo $row["name"] ?></span>
                                <div class="clear"></div>
                                <label>Email:</label> <span><?php echo $row["email"] ?></span>
                                <div class="clear"></div>
                                <div class="send_container">                                
                                    <textarea rows="3" name="message" cols="25" class="txt_message" placeholder="Type message here"></textarea>
                                    <input type="hidden" name="regId" value="<?php echo $row["gcm_regid"] ?>"/>
                                    <input type="submit" class="send_btn" value="Enviar" onclick=""/>
                                </div>
                            </form>
                        </li>
                    <?php }
                } else { ?> 
                    <li>
                        No existen registros!
                    </li>
                <?php } ?>
            </ul>
        </div>
    </body>
</html>
