<?php ob_start();
class DB_Connect{
    function __construct(){}
    function __destruct(){}
    public function connect(){
        $con=pg_connect("host=10.105.116.52 port=5432 dbname=giberish_tmx user=postgres password=ki11thema11 options='--client_encoding=UTF8'");
        return $con;
    }
    public function close(){pg_close();}
}
class db_Postgre{
    private $db;            private $row_db=NULL;
    private $result=NULL;   private $ar=array();
    private $oid;           private $i=0;
    function __construct(){
        $this->db = new DB_Connect();
        $this->db->connect();
    }
    function __destruct(){ }
    public function getIdOT($gcm_regid,$id_usr){
        $this->i=0;$this->ar=array();$this->oid='NADA';
        $this->result=pg_query("SELECT id_usr
                                FROM gcm_users
                                WHERE id_usr=".$id_usr.";") or die('ERROR: '.pg_last_error());
        while($this->row_db=pg_fetch_array($this->result,NULL,PGSQL_ASSOC))
            $this->ar[$this->i]=$this->row_db;
        foreach($this->ar as $key=>$row)
            $this->oid='Existe';
        if($this->oid=='NADA')
            $this->result=pg_query("INSERT INTO gcm_users(gcm_regid,id_usr)
                    VALUES('".$gcm_regid."','".$id_usr."')") or die('ERROR: '.pg_last_error());
        $this->result=pg_query("INSERT INTO history_init(id_usr)
                        VALUES(".$id_usr.")") or die('ERROR: '.pg_last_error());
        return 'Listo...';
    }
    public function TrackingFielders($telefono,$latitud,$longitud,$id_fielder){
        $this->result=pg_query("INSERT INTO fielders_coordinates_unica(latitud,longitud,telefono,created_at,id_fielder)
                VALUES('".$latitud."','".$longitud."','".$telefono."',NOW(),'".$id_fielder."');") or die('ERROR AL INSERTAR DATOS: '.pg_last_error());
        return $id_fielder.': '.$latitud.','.$longitud.' : '.$telefono.' -> listo';
    }
}

if($_GET['track']=='SI'){
    $db = new db_Postgre();
    if(isset($_POST['latitud'])){
        $telefono=trim($_POST['telefono']);
        $latitud=trim($_POST['latitud']);
        $longitud=trim($_POST['longitud']);
        $id_fielder=trim($_POST['id_fielder']);
        if($latitud!='' && $longitud!='' && $id_fielder!=''){
            echo $db->TrackingFielders($telefono,$latitud,$longitud,$id_fielder);
        }
        else{
            echo 'Uno de los post requeridos esta vacio WEY Lat:'.$latitud.' Lon:'.$longitud.' Id:'.$id_fielder;
        }
    }
    else{
        echo 'No mandaste los post WEY';
    }
}
if($_POST['pDf']=='ñrRp3}.'){ //Crea GCM o no
//  $db = new db_Postgre();
//  $res = $db->getIdOT($_POST["gcm"],$_POST["idu"]);
    echo 'todo en orden: '.$_POST["gcm"].' - '.$_POST["idu"].' - '.$_POST['pDf'];
}
else if($_POST['pDf']=='4ýhHGr{'){ //Crea megaobjeto!
    $jsan=file_get_contents('http://10.105.116.52:9090/telmex/get/region/'.$_POST["idu"]);
    $abj =json_decode($jsan);
    $dse =$abj->apiResponse;
    function areas($a){
        $area='';
             if($a==1) $area='Acapulco';
        else if($a==2) $area='Balbuena';
        else if($a==3) $area='Chilpancingo';
        else if($a==4) $area='Cuautitlan-Morelos';
        else if($a==5) $area='Ermita-Tlahuac';
        else if($a==6) $area='Lindavista';
        else if($a==7) $area='Lomas';
        else if($a==8) $area='Mixcoac';
        else if($a==9) $area='Morelos';
        else if($a==10)$area='Satélite';
        else if($a==11)$area='Sotelo';
        else if($a==12)$area='Texcoco-Zaragoza';
        else if($a==13)$area='Toluca';
        else if($a==14)$area='Universidad';
        else if($a==15)$area='Valle-San Juán';
        else if($a==16)$area='Aguascalientes';
        else if($a==17)$area='Celaya';
        else if($a==18)$area='Ciudad Victoria';
        else if($a==19)$area='Irapuato';
        else if($a==20)$area='León';
        else if($a==21)$area='Matamoros';
        else if($a==22)$area='Monterrey 1';
        else if($a==23)$area='Monterrey 2';
        else if($a==24)$area='Monterrey Foraneas';
        else if($a==25)$area='Nuevo Laredo';
        else if($a==26)$area='Querétaro';
        else if($a==27)$area='Reynosa';
        else if($a==28)$area='Sabinas';
        else if($a==29)$area='Saltillo';
        else if($a==30)$area='San Luis Potosí';
        else if($a==31)$area='Tampico';
        else if($a==32)$area='Torreón';
        else if($a==33)$area='Zacatecas';
        else if($a==34)$area='Chihuahua';
        else if($a==35)$area='Ciudad Juárez';
        else if($a==36)$area='Ciudad Obregón';
        else if($a==37)$area='Colima';
        else if($a==38)$area='Culiacán';
        else if($a==39)$area='Durango';
        else if($a==40)$area='Guadalajara Centro';
        else if($a==41)$area='Guadalajara Oriente';
        else if($a==42)$area='Guadalajara Poniente';
        else if($a==43)$area='Hermosillo';
        else if($a==44)$area='Jalisco';
        else if($a==45)$area='La Paz';
        else if($a==46)$area='Los Mochis';
        else if($a==47)$area='Mazatlan';
        else if($a==48)$area='Morelia';
        else if($a==49)$area='Nogales';
        else if($a==50)$area='Puerto Vallarta';
        else if($a==51)$area='Tepic';
        else if($a==52)$area='Zamora';
        else if($a==53)$area='Campeche';
        else if($a==54)$area='Cancún';
        else if($a==55)$area='Coatzacoalcos';
        else if($a==56)$area='Córdoba';
        else if($a==57)$area='Jalapa';
        else if($a==58)$area='Mérida';
        else if($a==59)$area='Oaxaca';
        else if($a==60)$area='Pachuca';
        else if($a==61)$area='Poza Rica';
        else if($a==62)$area='Puebla';
        else if($a==63)$area='Tlaxcala-Puebla';
        else if($a==64)$area='Tuxtla Guitierrez';
        else if($a==65)$area='Veracrúz';
        else if($a==66)$area='Villahermosa';
        else if($a==70)$area='Tlaxcala';
        else if($a==67)$area='Ensenada';
        else if($a==68)$area='Mexicali';
        else if($a==69)$area='Tijuana';
        $area=strtoupper($area);
        return $area;
    }
    function divis($d){
        $div='';
             if($d==1)
            $div="METRO";
        else if($d==2)
            $div="NORTE";
        else if($d==3)
            $div="OCCIDENTE";
        else if($d==4)
            $div="SUR";
        else if($d==5)
            $div="TELNOR";
        return $div;
    }
    function colorTecs($i){
        switch($i){
            case 1:
                $colorLe = "5FB404";
                break;  
            case 2:
                $colorLe = "FF8000";
                break;
            case 3:
                $colorLe = "0080FF";
                break;
            case 4:
                $colorLe = "8000FF";
                break;
            case 5:
                $colorLe = "B40404";
                break;
            case 6:
                $colorLe = "FF00FF";
                break;
            case 7:
                $colorLe = "01DFD7";
                break;
            case 8:
                $colorLe = "FFBF00";
                break;
        }
        return $colorLe;
    }
    function imageTecs($i){
        switch($i){
            case 1:
                $colorLe = "poiATM.png";
                break;  
            case 2:
                $colorLe = "poiFTTH.png";
                break;
            case 3:
                $colorLe = "poiIpDislam.png";
                break;
            case 4:
                $colorLe = "poiND.png";
                break;
            case 5:
                $colorLe = "poiTBA.png";
                break;
            case 6:
                $colorLe = "poiVSDLIPD.png";
                break;
            case 7:
                $colorLe = "poiVSDLTBA.png";
                break;
            case 8:
                $colorLe = "poiWIMAX.png";
                break;
        }
        return $colorLe;
    }
/*
    $colores[0]='#69D2E7';
    $colores[1]='#A7DBD8';
    $colores[2]='#F38630';
    $colores[3]='#E3AAD6';
    $colores[4]='#93DFB8';
    $colores[5]='#FA6900';
    $colores[6]='#FFBDD8';
    $colores[7]='#B5D8EB';
    $colores[8]='#FB6900';
    $colores[9]='#007E80';
*/
    $i=0;
    foreach($dse as $key=>$value){
        if($i==0){
            $megaObjeto['Datos']['Nombre']=$value[0]->idUsuario->nombre;
            $megaObjeto['Datos']['Rol']['id']=$value[0]->idUsuario->role->idRole;
            $megaObjeto['Datos']['Rol']['rol']=$value[0]->idUsuario->role->role;
            $megaObjeto['Datos']['Expediente']=$value[0]->idUsuario->expediente;
            $megaObjeto['Datos']['UserID']=$_POST["idu"];
        }
        foreach($value as $k=>$val){
            $zonas=explode("-",$val->regionTrabajo);

/*          Distritos-LINDAVISTA 6 ma_0046 */

            $megaObjeto['Regiones']['Region'][$k]['Nomenclatura']=$val->regionTrabajo;
            $megaObjeto['Regiones']['Region'][$k]['Llave']='Distritos-'.areas($zonas[1]);
            $megaObjeto['Regiones']['Region'][$k]['Division']=$zonas[0];
            $megaObjeto['Regiones']['Region'][$k]['Area']=$zonas[1];
            $polAreas[]=areas($zonas[1]);
            if(strlen($zonas[2])<2){
                $megaObjeto['Datos']['Regiones']['Areas'][$zonas[1]]['CualesDistritos']='Todos';
                $carea=file_get_contents('http://10.105.116.52:9090/telmex/clientes/existentes/area/'.$zonas[1]);
                if($carea === FALSE)
                    $tel='Error 404';
                else{
                    $carea=json_decode($carea);
                    $carea=$carea->apiResponse[0];
                    if(count($carea)>0){
                        $ix=0;
                        foreach($carea as $ki=>$vl){
                            if($vl->latitud!='' && $vl->longitud!=''){
                                $tel[$ix]['Telefono']=$vl->telefono;
                                $tel[$ix]['CampoA']=$vl->campoa;
                                $tel[$ix]['CampoB']=$vl->campob;
                                $tel[$ix]['CampoC']=$vl->campoc;
                                $tel[$ix]['tcode']=$vl->tcode;
                                $tel[$ix]['idCampana']=$vl->idCampaña;
                                $tel[$ix]['idOferta']=$vl->idOferta;
                                $tel[$ix]['Latitud']=$vl->latitud;
                                $tel[$ix]['Longitud']=$vl->longitud;
                                $tel[$ix]['Cliente']=$vl->cliente;
                                $tel[$ix]['Colonia']=$vl->colonia;
                                $tel[$ix]['Estado']=$vl->estado;
                                $ix++;
                            }
                        }
                    }
                    else
                    $tel=count($carea);
                }
                $megaObjeto['Regiones']['Areas'][$zonas[1]]['NoClientes']=0;
                $megaObjeto['Regiones']['Areas'][$zonas[1]]['Clientes']=$tel;unset($tel);
                $megaObjeto['Regiones']['Areas'][$zonas[1]]['url']='http://10.105.116.52:9090/telmex/clientes/existentes/area/'.$zonas[1];
            }
            else{
                $polDistritos[]=$zonas[2];
                $megaObjeto['Regiones']['Region'][$k]['Distrito']=$zonas[2];
                $cdist=file_get_contents('http://10.105.116.52:9090/telmex/clientes/existentes/dist/'.$zonas[1].'/'.$zonas[2]);
                if($cdist === FALSE)
                    $tel='Error 404';
                else{
                    $cdist=json_decode($cdist);
                    $cdist=$cdist->apiResponse[0];
                    if(count($cdist)>0){
                        $ix=0;
                        foreach($cdist as $ki=>$vl){
                            if($vl->latitud!='' && $vl->longitud!=''){
                                $tel[$ix]['Telefono']=$vl->telefono;
                                $tel[$ix]['CampoA']=$vl->campoa;
                                $tel[$ix]['CampoB']=$vl->campob;
                                $tel[$ix]['CampoC']=$vl->campoc;
                                $tel[$ix]['tcode']=$vl->tcode;
                                $tel[$ix]['idCampana']=$vl->idCampaña;
                                $tel[$ix]['idOferta']=$vl->idOferta;
                                $tel[$ix]['Latitud']=$vl->latitud;
                                $tel[$ix]['Longitud']=$vl->longitud;
                                $tel[$ix]['Cliente']=$vl->cliente;
                                $tel[$ix]['Colonia']=$vl->colonia;
                                $tel[$ix]['Estado']=$vl->estado;
                                $ix++;
                            }
                        }
                    }
                    else
                    $tel=count($cdist);
                }
                $megaObjeto['Regiones']['Areas'][$zonas[1]]['Distritos'][$zonas[2]]['NoClientes']=0;
                $megaObjeto['Regiones']['Areas'][$zonas[1]]['Distritos'][$zonas[2]]['Clientes']=$tel;unset($tel);
                $megaObjeto['Regiones']['Areas'][$zonas[1]]['Distritos'][$zonas[2]]['url']='http://10.105.116.52:9090/telmex/clientes/existentes/dist/'.$zonas[1].'/'.$zonas[2];
            }
        }
        $i++;
//Mensajes
        $nmsgs=file_get_contents('http://10.105.116.52:9090/telmex/get/nomsg/'.$_POST["idu"]);
        $nmsgs=json_decode($nmsgs);
        $nmsgs=$nmsgs->apiResponse[0];
        $megaObjeto['Mensajes']['Nuevos']=$nmsgs;
        $nmsgs=file_get_contents('http://10.105.116.52:9090/telmex/get/msgAll/'.$_POST["idu"]);
        $nmsgs=json_decode($nmsgs);
        $nmsgs=$nmsgs->apiResponse[0];
        $megaObjeto['Mensajes']['Todos']=$nmsgs;
//Tecnologías
        $tecsi=file_get_contents('http://10.105.116.52:9090/getCatalog/CatTecnologias');
        $tecsi=json_decode($tecsi);
        $tecsi=$tecsi->apiResponse;
        $pintaAll=$megaObjeto['Regiones']['Areas'];
        foreach($pintaAll as $ke=>$vol){
            $tecsa=file_get_contents('http://10.105.116.52:9090/telmex/infraestructura/tecnolgia/area/'.$ke.'/-99');
            $tecsa=json_decode($tecsa);
            foreach($tecsa->apiResponse[0]->distritos as $y=>$v){
                $megaObjeto['Tecnologias'][$ke][$v->claveDistrito][$v->tecnologias[0]->tecnologia]['id']=$v->tecnologias[0]->idTecnologia;
                $megaObjeto['Tecnologias'][$ke][$v->claveDistrito][$v->tecnologias[0]->tecnologia]['color']=colorTecs($v->tecnologias[0]->idTecnologia);
                $megaObjeto['Tecnologias'][$ke][$v->claveDistrito][$v->tecnologias[0]->tecnologia]['imagen']=imageTecs($v->tecnologias[0]->idTecnologia);
                $megaObjeto['Tecnologias'][$ke][$v->claveDistrito][$v->tecnologias[0]->tecnologia]['centros'][$y]['latitud']=$v->centro->latitud;
                $megaObjeto['Tecnologias'][$ke][$v->claveDistrito][$v->tecnologias[0]->tecnologia]['centros'][$y]['longitud']=$v->centro->longitud;
                $megaObjeto['Tecnologias'][$ke][$v->claveDistrito][$v->tecnologias[0]->tecnologia]['idDistrito']=$v->idDistrito;
                $megaObjeto['Tecnologias'][$ke]['PorTipo']['EnArea'][$v->tecnologias[0]->tecnologia]=$v->tecnologias[0]->idTecnologia;
                $megaObjeto['Tecnologias'][$ke]['PorTipo']['AreaName']=areas($ke);
                if(in_array($v->claveDistrito,$polDistritos))
                    $megaObjeto['Tecnologias'][$ke]['PorTipo']['Distritos'][$v->claveDistrito][$v->tecnologias[0]->tecnologia]=$v->tecnologias[0]->idTecnologia;
            }
            $tecsa=file_get_contents('http://10.105.116.52:9090/telmex/infraestructura/tecnolgia/distrito/totales/'.$ke.'');
            $tecsa=json_decode($tecsa);
            $megaObjeto['Graficos']['TecDist'][areas($ke)]=$tecsa->apiResponse;
            $tecsa=file_get_contents('http://10.105.116.52:9090/telmex/infraestructura/tecnolgia/totales/'.$ke.'');
            $tecsa=json_decode($tecsa);
            $megaObjeto['Graficos']['TecTot'][areas($ke)]=$tecsa->apiResponse;
        }
    }
    unset($nmsgs);
    unset($tecsa);
    unset($tecsi);
    unset($pintaAll);
//Poligonos Distritos
    $postData = array(
        'distritos'=>array(
            'name'=>$polDistritos,
            'idArea'=>6,
            'color'=>'#ff9000'
        )
    );
    $ch = curl_init('http://10.105.116.52:9090/getDistrito/geoJson');
    curl_setopt_array($ch, array(
        CURLOPT_POST => TRUE,
        CURLOPT_RETURNTRANSFER => TRUE,
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json'
        ),
        CURLOPT_POSTFIELDS=>json_encode($postData)
    ));
    $response = curl_exec($ch);
    if($response === FALSE){
        die(curl_error($ch));
    }
    $responseData = json_decode($response);
    foreach($responseData->apiResponse[0]->features as $y=>$v){
        $zon=explode("-",$v->properties->area);
        $zon=$zon[1];
        $megaObjeto['Poligonos']['Distritos'][$zon]=$v;
    }
//Poligonos Areas
    foreach($polAreas as $y=>$v){
        $jsan=file_get_contents('http://10.105.116.52:9090/getAreaByName/geoJson/'.$v);
        $jsan=str_replace('"color":"blue"','"color":"#E0E4CC"',$jsan);
        $abj =json_decode($jsan);
        $dse =$abj->apiResponse[0]; // ->features[0]
        $megaObjeto['Poligonos']['Areas'][$v]=$dse;
        unset($jsan);unset($abj);unset($dse);
    }
    echo json_encode($megaObjeto);
}
else if($_POST['pDf']=='}+ṕv$3ds'){ //Comprueba el login
    echo file_get_contents('http://10.105.116.52:9090/telmex/get/user/'.$_POST['pw'].'/'.$_POST['ky']);
}
else if($_POST['pDf']=='9kl*ñ1"'){ //Obtiene información de tecnología
    echo file_get_contents('http://10.105.116.52:9090/telmex/infraestructura/tecnolgia/equipos/acceso/info/'.$_POST['DS'].'/'.$_POST['ID']);
}

ob_end_flush(); ?>