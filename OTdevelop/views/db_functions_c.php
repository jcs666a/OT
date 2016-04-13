<?php ob_start();
$ipServ='http://10.105.116.52:9090/';
if($_POST['pDf']=='ñrRp3}.'){ //Crea GCM o no
    $data=array(
        'idUsuario'=>array(
            'idUsuario'=>$_POST["idu"]
        ),
        'gcmRegId'=>$_POST["gcm"]);
    $ch = curl_init($ipServ.'telmex/usuario/sessionGCM');
    curl_setopt_array($ch, array(
        CURLOPT_POST => TRUE,
        CURLOPT_RETURNTRANSFER => TRUE,
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json'
        ),
        CURLOPT_POSTFIELDS=>json_encode($data)
    ));
    $response = curl_exec($ch);
    if($response === FALSE)
        die(curl_error($ch));
    $response=json_decode($response);
    echo json_encode($response);
}
else if($_POST['pDf']=='4ýhHGr{'){ //Crea megaobjeto!
    function areas($a){
        global $ipServ;
        $jsan=file_get_contents($ipServ.'get/areaById/'.$a);
        $jsan=json_decode($jsan);
        return $jsan->apiResponse[0]->descripcion;
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


    $jsan=file_get_contents($ipServ.'telmex/get/userandregiones/'.$_POST["idu"]);
    $abj=json_decode($jsan);
    $dse=$abj->apiResponse[0];
    $i=0;
    foreach($dse as $key=>$value){
        if($i==0){
            $megaObjeto['Datos']['Nombre']=$value->nombre;
            $megaObjeto['Datos']['Rol']['id']=$value->role;
            $megaObjeto['Datos']['Expediente']=$value->expediente;
            $megaObjeto['Datos']['UserID']=$_POST["idu"];
        }$i++;
    }
    $jsan=file_get_contents($ipServ.'telmex/get/region/'.$_POST["idu"]);
    $abj=json_decode($jsan);
    $dse=$abj->apiResponse;
    $i=0;
    foreach($dse as $key=>$value){
        if($i==0){
            $megaObjeto['Datos']['Rol']['rol']=$value[0]->idUsuario->role->role;
        }
        foreach($value as $k=>$val){
            $zonas=explode("-",$val->regionTrabajo);
            $AreasTiendas[]=areas($zonas[1]);
            $megaObjeto['Regiones']['Region'][$k]['Nomenclatura']=$val->regionTrabajo;
            $megaObjeto['Regiones']['Region'][$k]['Llave']='Distritos-'.areas($zonas[1]);
            $megaObjeto['Regiones']['Region'][$k]['Division']=$zonas[0];
            $megaObjeto['Regiones']['Region'][$k]['Area']=$zonas[1];
            $polAreas[]=areas($zonas[1]);
            if(strlen($zonas[2])<1){ // <2 ?
                $megaObjeto['Datos']['Regiones']['Areas'][$zonas[1]]['CualesDistritos']='Todos';
                $carea=file_get_contents($ipServ.'telmex/clientes/existentes/area/'.$zonas[1]);
                if($carea === FALSE)
                    $tel='Error 404';
                else{
                    $carea=json_decode($carea);
                    $carea=$carea->apiResponse[0];
                    if(count($carea)>0){
                        $ix=0;
                        foreach($carea as $ki=>$vl){
//                          if($vl->latitud!='' && $vl->longitud!=''){
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
//                          }
                        }
                    }
                    else
                    $tel=count($carea);
                }
                $megaObjeto['Regiones']['Areas'][$zonas[1]]['NoClientes']=array();
                $megaObjeto['Regiones']['Areas'][$zonas[1]]['Clientes']=$tel;unset($tel);
                $megaObjeto['Regiones']['Areas'][$zonas[1]]['url']=$ipServ.'telmex/clientes/existentes/area/'.$zonas[1];
            }
            else{
                $polDistritos[]=$zonas[2];
                $polDistritales[$zonas[1]][]=$zonas[2];
                $megaObjeto['Regiones']['Region'][$k]['Distrito']=$zonas[2]; // cambiar 207 * 52
                $cdist=file_get_contents($ipServ.'telmex/cct/dist/'.$zonas[1].'/'.$zonas[2]);
                if($cdist === FALSE)
                    $tel='Error 404';
                else{
                    $cdist=json_decode($cdist);
                    $cdist=$cdist->apiResponse[0];
                    if(count($cdist)>0){
                        $ix=0;
                        foreach($cdist as $ki=>$vl){
                            if($vl->latitud!='' && $vl->longitud!=''){
                                $tel[$ix]['id']=$vl->id;
                                $tel[$ix]['tcode']=$vl->tcode;
                                $tel[$ix]['campaigncode']=$vl->campaigncode;
                                $tel[$ix]['offercode']=$vl->offercode;
                                $tel[$ix]['titulo']=$vl->titulo;
                                $tel[$ix]['descripcion']=$vl->descripcion;
                                $tel[$ix]['estado']=$vl->estado;
                                $tel[$ix]['color']=$vl->color;
                                $tel[$ix]['telefono']=$vl->telefono;
                                $tel[$ix]['region']=$vl->region;
                                $tel[$ix]['direccion']=$vl->direccion;
                                $tel[$ix]['latitud']=$vl->latitud;
                                $tel[$ix]['longitud']=$vl->longitud;
                                $tel[$ix]['cliente']=$vl->cliente;
                                $tel[$ix]['vivo']=$vl->vivo;
                                $ix++;
                            }
                        }
                    }
                    else
                    $tel=count($cdist);
                }
                $megaObjeto['Regiones']['Areas'][$zonas[1]]['Distritos'][$zonas[2]]['Clientes']=$tel;unset($tel);
                $megaObjeto['Regiones']['Areas'][$zonas[1]]['Distritos'][$zonas[2]]['urlC']=$ipServ.'telmex/cct/dist/'.$zonas[1].'/'.$zonas[2];
                unset($cdist);
                $cdist=file_get_contents($ipServ.'telmex/clientes/notClientByAreaDto/'.$zonas[1].'/'.$zonas[2]);
                if($cdist===FALSE)
                    $tel='Error 404';
                else{
                    $cdist=json_decode($cdist);
                    $cdist=$cdist->apiResponse[0];
                    if(count($cdist)>0){
                        $ix=0;
                        foreach($cdist as $ki=>$vl){
                            if($vl->latitud!='' && $vl->longitud!=''){
                                $tel[$ix]['telefono']=$vl->telefono;
                                $tel[$ix]['region']=$vl->region;
                                $tel[$ix]['direccion']=$vl->direccion;
                                $tel[$ix]['latitud']=$vl->latitud;
                                $tel[$ix]['longitud']=$vl->longitud;
                                $tel[$ix]['cliente']=$vl->cliente;
                                $tel[$ix]['vivo']=$vl->vivo;
                                $ix++;
                            }
                        }
                    }
                    else
                    $tel=count($cdist);
                }
                $megaObjeto['Regiones']['Areas'][$zonas[1]]['Distritos'][$zonas[2]]['NoClientes']=$tel;unset($tel);
                $megaObjeto['Regiones']['Areas'][$zonas[1]]['Distritos'][$zonas[2]]['urlN']=$ipServ.'telmex/clientes/notClientByAreaDto/'.$zonas[1].'/'.$zonas[2];
            }
        }
        $i++;
//Mensajes
        $nmsgs=file_get_contents($ipServ.'telmex/get/nomsg/'.$_POST["idu"]);
        $nmsgs=json_decode($nmsgs);
        $nmsgs=$nmsgs->apiResponse[0];
        $megaObjeto['Mensajes']['Nuevos']=$nmsgs;
        $nmsgs=file_get_contents($ipServ.'telmex/get/msgAll/'.$_POST["idu"]);
        $nmsgs=json_decode($nmsgs);
        $nmsgs=$nmsgs->apiResponse[0];
        $megaObjeto['Mensajes']['Todos']=$nmsgs;
//Tecnologías
        $tecsi=file_get_contents($ipServ.'getCatalog/CatTecnologias');
        $tecsi=json_decode($tecsi);
        $tecsi=$tecsi->apiResponse;
        $pintaAll=$megaObjeto['Regiones']['Areas'];
        foreach($pintaAll as $ke=>$vol){
            /* $tecsa=file_get_contents($ipServ.'telmex/infraestructura/tecnolgia/area/dashboard/'.$ke.'/-99');
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
            } */

            unset($y_oil);
            unset($v_oil);
        //Tecnologias sólo por distrito
            foreach($polDistritos as $y_oil=>$v_oil){
                $tecsa=file_get_contents($ipServ.'telmex/infraestructura/tecnolgia/distrito/'.$ke.'/'.$v_oil.'/-99');
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
            }

            $tecsa=file_get_contents($ipServ.'telmex/infraestructura/tecnolgia/distrito/totales/'.$ke.'');
            $tecsa=json_decode($tecsa);
            $megaObjeto['Graficos']['TecDist'][areas($ke)]=$tecsa->apiResponse;
            $tecsa=file_get_contents($ipServ.'telmex/infraestructura/tecnolgia/totales/'.$ke.'');
            $tecsa=json_decode($tecsa);
            $megaObjeto['Graficos']['TecTot'][areas($ke)]=$tecsa->apiResponse;
        }
    }
    unset($nmsgs);
    unset($tecsa);
    unset($tecsi);
    unset($pintaAll);
//Poligonos Distritos
    foreach($polDistritales as $yis=>$vis){
        $postData = array(
            'distritos'=>array(
                'name'=>$vis,
                'idArea'=>$yis,
                'color'=>'#ff9000'
            )
        );
        $ch = curl_init($ipServ.'getDistrito/geoJson');
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
        $ii=0;
        foreach($responseData->apiResponse[0]->features as $y=>$v){
            $megaObjeto['Poligonos']['Distritos'][$vis[$ii]]=$v;
            $ii++;
        }
    }
//Poligonos Areas
    foreach($polAreas as $y=>$v){
//        $jsan=file_get_contents($ipServ.'getAreaByName/geoJson/'.$v);
//        $jsan=str_replace('"color":"blue"','"color":"#E0E4CC"',$jsan);
//        $abj=json_decode($jsan);
//        $dse=$abj->apiResponse[0]; // ->features[0]
//        $megaObjeto['Poligonos']['Areas'][$v]=$dse;
        $megaObjeto['Poligonos']['Areas'][$v]=array();
        unset($jsan);unset($abj);unset($dse);
    }
//Camapañas que tengo asignadas... 74 * 52
    $jsan=file_get_contents($ipServ.'telmex/get/campaniasById/'.$_POST["idu"]);
    $jsan=json_decode($jsan);
    $megaObjeto['Campanas']=$jsan->apiResponse[0];
//Para las imagenes en un objeto aparte...
    $i=0;
    foreach($jsan->apiResponse[0] as $y=>$v){
        $path = '../../c4v2/imgCamps/'.$v->campana->imagen;
        $type = pathinfo($path, PATHINFO_EXTENSION);
        $data = file_get_contents($path);
        $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
        $megaObjeto['Imagenes'][$v->campana->imagen]=$base64;
        $i++;
    }
    unset($jsan);
//Tiendas por área
    foreach($polAreas as $y=>$v){ // 74 * 52
        $jsan=file_get_contents($ipServ.'telmex/tiendaLoc/getTiendaByArea/'.$v);
        $jsan=json_decode($jsan);
        $dse=$jsan->apiResponse[0];
        $i=0;
        foreach($dse as $ki=>$vi){
            $horario='';
            if($vi->horarioSemana!='' && $vi->horarioSemana!='null' && $vi->horarioSemana!=null && $vi->horarioSemana!='(null)')
                $horario.=$vi->horarioSemana.'<br>';
            if($vi->horarioSabatino!='' && $vi->horarioSabatino!='null' && $vi->horarioSabatino!=null && $vi->horarioSabatino!='(null)')
                $horario.=$vi->horarioSabatino.'<br>';
            if($vi->horarioDomingo!='' && $vi->horarioDomingo!='null' && $vi->horarioDomingo!=null && $vi->horarioDomingo!='(null)')
                $horario.=$vi->horarioDomingo;
            $megaObjeto['Tiendas'][$v][$i]['Tienda']=$vi->sitioTelmex;
            $megaObjeto['Tiendas'][$v][$i]['Horario']=$horario;
            $megaObjeto['Tiendas'][$v][$i]['Lat']=$vi->latitud;
            $megaObjeto['Tiendas'][$v][$i]['Lon']=$vi->longitud;
            $megaObjeto['Tiendas'][$v][$i]['Cajero']=$vi->cajero;
            $megaObjeto['Tiendas'][$v][$i]['HorarioCajero']=$vi->horarioCajero;
            $megaObjeto['Tiendas'][$v][$i]['Domicilio']=$vi->calle.' NO. '.$vi->numero.', Col. '.$vi->colonia.', C.P. '.$vi->cp.', '.$vi->localidad.', '.$vi->estado;
            $i++;
        }
        unset($jsan);unset($dse);
    }

    $jsan=file_get_contents($ipServ.'telmex/get/rc/rcActivoByidFielder/'.$_POST["idu"]);
    $jsan=json_decode($jsan);
    function dateDifference($date_1,$date_2,$differenceFormat='%a'){
        $datetime1 = date_create($date_1);
        $datetime2 = date_create($date_2);
        $interval = date_diff($datetime1, $datetime2);
        return $interval->format($differenceFormat);
    }
    foreach($jsan->apiResponse[0] as $k=>$v){
        $ini=strtotime($v->fechaInicioCampania);$ini=date('Y-m-d',$ini);
        $fin=strtotime($v->fechaFinCampania);$fin=date('Y-m-d',$fin);
//        $ini=strtotime('2016-01-01');$ini=date('Y-m-d',$ini);
//        $fin=strtotime('2016-04-04');$fin=date('Y-m-d',$fin);
        $cuantosDias=dateDifference($ini,$fin)+1;
        $megaObjeto['Calendario']['vs'][]=$v;
        $megaObjeto['Calendario']['ks'][]=$k;
        if($v->idCampania!=''){
            $megaObjeto['Calendario']['Estadisticos'][$v->idCampania]['Inicio']=$v->fechaInicioCampania;
            $megaObjeto['Calendario']['Estadisticos'][$v->idCampania]['Fin']=$v->fechaFinCampania;
            $megaObjeto['Calendario']['Estadisticos'][$v->idCampania]['duracionDias']=$cuantosDias;
            $megaObjeto['Calendario']['Estadisticos'][$v->idCampania]['descripcion']=$v->descripcion;
            $megaObjeto['Calendario']['Estadisticos'][$v->idCampania]['metaTotal']=$v->meta+$megaObjeto['Calendario']['Estadisticos'][$v->idCampania]['metaTotal'];
            $megaObjeto['Calendario']['Estadisticos'][$v->idCampania]['metaDiaria']=ceil($megaObjeto['Calendario']['Estadisticos'][$v->idCampania]['metaTotal']/$cuantosDias);
            $megaObjeto['Calendario']['Estadisticos'][$v->idCampania]['titulo']=$v->titulo;
            $megaObjeto['Calendario']['Estadisticos'][$v->idCampania]['idCamp']=$v->idCampania;
            $megaObjeto['Calendario']['Estadisticos'][$v->idCampania]['idCr']=$v->idCr;
            $megaObjeto['Calendario']['Estadisticos'][$v->idCampania]['color']=$v->color;
        }
        $metaDiaria=ceil($v->meta/$cuantosDias);
        $sta=strtotime($v->fechaInicioCampania);
        $end=strtotime($v->fechaFinCampania);
        $anoReporte=substr($v->createAt,6,4);
        $mesReporte=substr($v->createAt,3,2);$mesReporte=ltrim($mesReporte,"0");$mesReporte--;
        $diaReporte=substr($v->createAt,0,2);$diaReporte=ltrim($diaReporte,"0");
        $fechaReporte=$anoReporte.'-'.$mesReporte.'-'.$diaReporte;
        $region=explode("-",$v->region);
        $objectVisitas[$fechaReporte][$region[2]]['descripcion']=$region[2];
        $objectVisitas[$fechaReporte][$region[2]]['clientes'][]=array(
                'nombre'=>$v->nombre,
                'telefono'=>$v->telefono,
                'geo'=>$v->latitud.','.$v->longitud,
                'CP'=>'',
                'direccion'=>$v->direccion,
                'status'=>$v->pesco,
                'tipo'=>$v->vivo,
                'razon'=>$v->razon,
                'campaña'=>$v->idCampania,
                'titulo'=>$v->titulo
            );
    }
    $iCi=0;
    foreach($megaObjeto['Calendario']['Estadisticos'] as $k=>$v){
        $objectCampas[$iCi]['idCr']=$v['idCr'];
        $objectCampas[$iCi]['idCamp']=$v['idCamp'];
        $objectCampas[$iCi]['color']=$v['color'];
        $objectCampas[$iCi]['meta']['meta']=$v['metaTotal'];
        $objectCampas[$iCi]['meta']['visitas']=0;
        $objectCampas[$iCi]['meta']['ventas']=0;
        $iCi++;
    }
    $dias=0;
    for($i=$sta;$i<=$end;$i=$i+86400){$dias++;}
    for($i=$sta;$i<=$end;$i=$i+86400){
        $visita=0;
        $ventas=0;
        $mes=date('m',$i);$mes=ltrim($mes,"0");$mes--;
        $dia=date('d',$i);$dia=ltrim($dia,"0");
        $fechaCalendar=date('Y',$i).'-'.$mes.'-'.$dia;
        $iCi=0;
        $megaObjeto['Calendario']['Cal'][date('Y',$i)][$mes][$dia]['campInfo']=$objectCampas;
        if(array_key_exists($fechaCalendar,$objectVisitas)){
            foreach($objectVisitas[$fechaCalendar] as $k=>$v){
                $megaObjeto['Calendario']['Cal'][date('Y',$i)][$mes][$dia]['asignacion'][]=$v;
                $megaObjeto['Calendario']['Cal'][date('Y',$i)][$mes][$dia]['campInfo'][$iCi]['meta']['visitas']=count($v['clientes']);
                if($v['clientes']['status']==true || $v['clientes']['status']=='true' || $v['clientes']['status']==1)
                    $megaObjeto['Calendario']['Cal'][date('Y',$i)][$mes][$dia]['campInfo'][$iCi]['meta']['ventas']=$megaObjeto['Calendario']['Cal'][date('Y',$i)][$mes][$dia]['campInfo'][$iCi]['meta']['ventas']+1;
                $iCi++;
            }
        }
    }
    unset($jsan);

    echo json_encode($megaObjeto);
}
else if($_POST['pDf']=='}+ṕv$3ds'){ //Comprueba el login
    echo file_get_contents($ipServ.'telmex/get/user/'.$_POST['pw'].'/'.$_POST['ky']);
}
else if($_POST['pDf']=='9kl*ñ1"'){ //Obtiene información de tecnología
    echo file_get_contents($ipServ.'telmex/infraestructura/tecnolgia/equipos/acceso/info/'.$_POST['DS'].'/'.$_POST['ID']);
}
ob_end_flush(); ?>