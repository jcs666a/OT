<?php ob_start();
$ipServ='http://localhost:9090/';
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
                if($cdist === FALSE){
                    $tel='Error 404';
                }
                else{
                    $cdist=json_decode($cdist);
                    $cdist=$cdist->apiResponse[0];
                    if(count($cdist)>0){
                        $ix=0;$ixx=0;
                        foreach($cdist as $ki=>$vl){
                            if($vl->latitud!='' && $vl->longitud!=''){
                                if($vl->tcode!='' && $vl->campaigncode!='' && $vl->offercode!='' &&
                                    $vl->tcode!=null && $vl->campaigncode!=null && $vl->offercode!=null &&
                                    $vl->tcode!='null' && $vl->campaigncode!='null' && $vl->offercode!='null'){
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
                                    $tel[$ix]['producto']=$vl->producto;
                                    $tel[$ix]['ofertaAdicional']=$vl->ofertaAdicional;
                                    $ix++;
                                }
                                else{
                                    $telb[$ixx]['id']=$vl->id;
                                    $telb[$ixx]['tcode']='';
                                    $telb[$ixx]['campaigncode']='';
                                    $telb[$ixx]['offercode']='';
                                    $telb[$ixx]['titulo']=$vl->titulo;
                                    $telb[$ixx]['descripcion']=$vl->descripcion;
                                    $telb[$ixx]['estado']=$vl->estado;
                                    $telb[$ixx]['color']=$vl->color;
                                    $telb[$ixx]['telefono']=$vl->telefono;
                                    $telb[$ixx]['region']=$vl->region;
                                    $telb[$ixx]['direccion']=$vl->direccion;
                                    $telb[$ixx]['latitud']=$vl->latitud;
                                    $telb[$ixx]['longitud']=$vl->longitud;
                                    $telb[$ixx]['cliente']=$vl->cliente;
                                    $telb[$ixx]['vivo']=$vl->vivo;
                                    $telb[$ixx]['producto']=$vl->producto;
                                    $telb[$ixx]['ofertaAdicional']=$vl->ofertaAdicional;
                                    $ixx++;
                                }
                            }
                        }
                    }
                    else{
                        $tel=0;
                        $telb=0;
                    }
                }
                $megaObjeto['Regiones']['Areas'][$zonas[1]]['Distritos'][$zonas[2]]['Clientes']=$telb;unset($telb);
                $megaObjeto['Regiones']['Areas'][$zonas[1]]['Distritos'][$zonas[2]]['clienteDirigido']=$tel;unset($tel);
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
                        $tel=0;
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
/*    foreach($jsan->apiResponse[0] as $y=>$v){
        $megaObjeto['Campanas'][$v->campana->id]=$v;
    } */
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
    foreach($jsan->apiResponse[0] as $k=>$v){
        $createAt=strtotime($v->createAt);
        $ano=date('Y',$createAt);$mes=date('n',$createAt);$dia=date('j',$createAt);
        $mes--;
        if($v->region=='' || $v->region==null || $v->region=='null')
            $region[2]='';
        else
            $region=explode("-",$v->region);
        if($v->idCampania=='' || $v->idCampania==null || $v->idCampania=='null')
            $v->idCampania='';
        if($v->titulo=='' || $v->titulo==null || $v->titulo=='null')
            $v->titulo='';
        if($v->razon=='' || $v->razon==null || $v->razon=='null')
            $v->razon='';

        if($v->idCampania!='' && $v->idCampania!=null && $v->idCampania!='null' && $v->idCampania!="''"
            && $v->region!='' && $v->region!=null && $v->region!='null' && $v->region!="''"){
            if($megaObjeto['Calendario'][$v->idCampania]['TotalVisitas']=='' || $megaObjeto['Calendario'][$v->idCampania]['TotalVisitas']==null)
                $megaObjeto['Calendario'][$v->idCampania]['TotalVisitas']=0;
            if($megaObjeto['Calendario'][$v->idCampania]['TotalVentas']=='' || $megaObjeto['Calendario'][$v->idCampania]['TotalVentas']==null)
                $megaObjeto['Calendario'][$v->idCampania]['TotalVentas']=0;
            $megaObjeto['Calendario'][$v->idCampania]['TotalVisitas']=$megaObjeto['Calendario'][$v->idCampania]['TotalVisitas']+1;
            $megaObjeto['Calendario'][$v->idCampania]['TotalVentas']=$megaObjeto['Calendario'][$v->idCampania]['TotalVentas']+1;
            $megaObjeto['Calendario'][$v->idCampania]['Visitas'][$ano][$mes][$dia][]=array(
                'nombre'=>$v->nombre,
                'telefono'=>$v->telefono,
                'geo'=>$v->latitud.','.$v->longitud,
                'distrito'=>$region[2],
                'CP'=>'',
                'CPcc'=>'-'.$mes.'-',
                'direccion'=>$v->direccion,
                'status'=>$v->pesco,
                'tipo'=>$v->vivo,
                'razon'=>$v->razon,
                'campaña'=>$v->idCampania,
                'titulo'=>$v->titulo
            );
        }
        else{
            if($megaObjeto['Calendario']['Libres']['TotalVentas']=='' || $megaObjeto['Calendario']['Libres']['TotalVentas']==null)
                $megaObjeto['Calendario']['Libres']['TotalVentas']=0;
            $megaObjeto['Calendario']['Libres']['TotalVentas']=$megaObjeto['Calendario']['Libres']['TotalVentas']+1;
            $megaObjeto['Calendario']['Libres']['Visitas'][$ano][$mes][$dia][]=array(
                'nombre'=>$v->nombre,
                'telefono'=>$v->telefono,
                'geo'=>$v->latitud.','.$v->longitud,
                'distrito'=>'',
                'CP'=>'',
                'CPcc'=>'-'.$mes.'-',
                'direccion'=>$v->direccion,
                'status'=>true,
                'tipo'=>false,
                'razon'=>$v->razon,
                'campaña'=>$v->idCampania,
                'titulo'=>$v->titulo
            );
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
