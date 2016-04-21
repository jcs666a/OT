	//almacen de variables globales
  var globalHash = "",
      fielderInfo=jQuery.parseJSON(localStorage.getItem('fielderInfo')),
      fielderMsgs=jQuery.parseJSON(localStorage.getItem('fielderMsgs')),
      fielderRegs=jQuery.parseJSON(localStorage.getItem('fielderRegs')),
      fielderPols=jQuery.parseJSON(localStorage.getItem('fielderPols')),
      fielderTecs=jQuery.parseJSON(localStorage.getItem('fielderTecs')),
      fielderGrap=jQuery.parseJSON(localStorage.getItem('fielderGrap')),
      fielderCamp=jQuery.parseJSON(localStorage.getItem('fielderCamp')),
      fielderTien=jQuery.parseJSON(localStorage.getItem('fielderTien')),
      fielderImag=jQuery.parseJSON(localStorage.getItem('fielderImag')),
      fielderCalendar=jQuery.parseJSON(localStorage.getItem('fielderCalendar')),
      Calendar= JSON.parse(localStorage.getItem('Calendar'));
  var userId = fielderInfo.Datos.UserID,
      userName = fielderInfo.Persona;
function core(){
  $("#content").load("home.html");
  checkURL();function toModel(){
  $.each(fielderPols.Distritos, function(index, val) {
    var tope = val['geometry']['coordinates'][0],
    obj = [];
    for(var i = 0; i <= tope.length-1; i++){
      obj[i]={'lat':tope[i][0],'lng':tope[i][1]};
    }
     var polygon = new google.maps.Polygon({
        paths: obj
      });
      getName(polygon,index);
  });
}
document.getElementById('iframeDisplay').innerHTML = '<iframe src="https://187.217.179.35:81/tcd/?fielder='+userId+'" allowtransparency="true"></iframe>';
document.getElementById('iframeDisplay2').innerHTML = '<iframe src="https://187.217.179.35:81/new?fielder='+userId+'&domicilio='+domicilio+'" allowtransparency="true"></iframe>';
}
$('.menu a').click(function(){
  appMenu.removeClass('active');
  appMenu.html('<i class="fa fa-bars"></i>');
  menuDisplay.removeClass('active');
  closeMenuIndex.removeClass('open');
  wrapper.removeClass('active');
  var Hash=window.location.hash;
  if(Hash!=$(this).attr('href')) masterLogin();
});
$(window).on('hashchange',function(){checkURL()});
function checkURL(){
  var Hash =window.location.hash;
  if(Hash=='' || Hash=='#' || Hash=="#home"){
    $("#wrapper").attr('class','');
    iframeMethod("closeIframe");
    Hash='#home';
    $('#wrapper').addClass('big');
    iframeMethod("closeIframe");
  }
  else $('#wrapper').removeClass('big');
  $('#menuDisplay a').removeClass('active');
  if(Hash=='#mapa'){
    $("#wrapper").attr('class','');
    masterLogin();
    $('#menuDisplay a:nth-child(3)').addClass('active');
    iframeMethod("closeIframe");
  }
  else if(Hash=='#mensajeria'){
    $("#wrapper").attr('class','');
    masterLogin();
   $('#menuDisplay a:nth-child(4)').addClass('active');
    iframeMethod("closeIframe");
  }
  else if(Hash=='#campanias'){
    $("#wrapper").attr('class','');
    masterLogin();
    $('#menuDisplay a:nth-child(5)').addClass('active');
    iframeMethod("closeIframe");
  }
  else if(Hash=='#calendario'){
    $("#wrapper").attr('class','');
    masterLogin();
   $('#menuDisplay a:nth-child(6)').addClass('active');
   iframeMethod("closeIframe");
  }
  else if(Hash == '#guia'){
    $("#wrapper").attr('class','');
    masterLogin();
    iframeMethod("closeIframe");
  }
  else if(Hash == '#iframeDisplay'){
    document.getElementById('iframeDisplay2').classList.remove('open');
  }
  setTimeout(function(){
    loadPageCore(Hash);
  },900);
}
function loadPageCore(url){
  url=url.replace('#','');
  if(url == 'iframeDisplay' || url == 'iframeDisplay2'){
  }
  else{
      $('#wrapper').addClass(url);
  }
  $('#content').load(url+".html", function(){
    if(url=="home")
      $('.fa.fa-envelope-o span').html(fielderMsgs.Nuevos);
    setTimeout(function(){
      $('#masterLogin').removeClass('ani').fadeOut();
    },1000);
  });
  howToLoad(url);
}
function howToLoad(url){
	if(url == 'home'){
		$("#appMenu").fadeOut('fast');
	}
	if (url != 'home'){
		$("#appMenu").fadeIn('fast');
	}
}
function pritThis(con, vars){
	 con.innerHTML= vars;
}
var formHistory = [],
    paths = [];
function backNav(){
  var goTo = paths[paths.length-1];
      document.getElementById('xpress').dataset.page = goTo;
      currentPage = document.getElementById('xpress').dataset.page;
  $(".page").hide("fast");
  document.getElementById('block-'+goTo).style.display = 'block';
  paths.splice(paths.length-1, 1);
  hideBack(currentPage);
}
function path(data){
  if(!data.dataset.end){
    var contentForm = data.innerHTML,
      goTo = data.dataset.path,
      currentPage = document.getElementById('xpress').dataset.page;
      paths.push(currentPage);
      formHistory.push(contentForm);
      $(".page").hide("fast", function(){
         document.getElementById('xpress').dataset.page = goTo;
      });
      document.getElementById('block-'+goTo).style.display = 'block';
    }
    if(data.dataset.end){
        var hideThis = data.dataset.page;
        document.getElementById('block-'+hideThis).style.display = "none";
        document.getElementById('end').style.display = 'block';
        document.getElementsByName('servicioTipo').value = String(data.dataset.end);
        document.getElementsByName('servicioId').value = String(data.dataset.serviceid);
        paths.push(hideThis);
        $.ajax({
          url: ''+hostVar+':9090/telmex/get/estados',
          type: 'GET',
          dataType: 'json',
        })
        .done(function(data) {
          $("#noShit").html('');
          var response = data.apiResponse[0];
          for(var i = 0; i <= response.length; i++){
            $("#noShit").append('<option value='+response[i].idEstado+'>'+response[i].descripcion+'</option>');
          }
        });
    }
  hideBack(currentPage);
}
function hideBack(currentPage){
     if(!paths[paths.length-1]){
      document.getElementById('historyNav').classList.remove('open');
    }
    if(paths[paths.length-1]){
      document.getElementById('historyNav').classList.add('open');
    }
}
function sendGeo(e){
  alert(e);
  var inputs = document.getElementsByClassName("mandatory"),
    doneIt = 0;
  for (var i = 0;  i < inputs.length;  i++){
      if (!inputs[i].value || inputs[i].value == "null"){
      inputs[i].classList.add('error');
        inputs[i].parentElement.classList.add('show');
      }
       else{
        inputs[i].classList.remove('error'),
        inputs[i].parentElement.classList.remove('show');
        doneIt++;
        if(doneIt == inputs.length){
          alert("here");
          document.getElementById('geoId').value =''+lastLatitude+','+ lastLongitude+'' ;
          letsgo();
        }

       }
   }
}
function checkOut(){
function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}
var $form = $("#checkOut");
var sendCheckOut = JSON.stringify(getFormData($form));
      $("#shure .inner").html('<h1>Pocesando contratación...</h1>');
      $.ajax({
        url: 'https://10.105.116.77:8243/contratacion/1.0.0',
        method: "POST",
        contentType: "application/json",
        data:sendCheckOut,
      })
      .done(function(data) {
        console.log("success");
        $("#shure .inner").html('<h3>¡Garcias por su contratación!</h3>'+
                                  '<p>Su folio de servico es:</p>'+
                                  '<strong>'+data.idPisa+'</strong>'+
                                  '<p>sera enviado al correo</p>'+
                                  '<strong>'+data.mensaje+'</strong>'+
                                  '<div id="so">'+
                                  '<div class="left" onclick="doneAll();">'+
                                  '<p>OK</p>'+
                                  '</div>'+
                                  '</div>');
        devSave(sendCheckOut);
      })
      .fail(function(data){
        $("#shure .inner").html('<h3>Lo sentimos su transaccion no fue exitosa...</h3>'+
                                  '<div id="so">'+
                                  '<div class="left" onclick="closeCheckOut();">'+
                                  '<p>Cerrar <i class="fa fa-times"></i></p>'+
                                  '</div>'+
                                  '</div>');
      });
}
function closeCheckOut(){
  $("#shure").removeClass('active');
}
function letsgo(){
  $("#shure").addClass('active');
  $("#shureContent").html('');
  $("#shureContent").append( 'usuario: <br>'+ document.getElementsByName("nombre")[0].value+' '+document.getElementsByName("paterno")[0].value +' '+document.getElementsByName("materno")[0].value+'');
  $("#shureContent").append( '<br><br> direccion:<br> '+ document.getElementsByName("calle")[0].value+' '+document.getElementsByName("numExt")[0].value +' '+document.getElementsByName("numInt")[0].value+' '+document.getElementsByName("colonia")[0].value+'');
    for(var i = 0; i < formHistory.length; i++){
      $("#shureContent").append(formHistory[i]);
    }
}
function loadThat(val){
      $.ajax({
        url: ''+hostVar+':9090/telmex/get/municipio/'+val+'',
        type: 'GET',
        dataType: 'json',
      })
      .done(function(data) {
        var response = data.apiResponse[0];
        $("#municipio").html('');
        $("#municipio").append('<select name="municipio" id="subMunicipio" class="mandatory"> </select>');
        $("#subMunicipio").append('<option> selecione un municipio </option>');
          for(i = 0; i <= response.length; i++) {
            $("#subMunicipio").append('<option value='+response[i].idMunicipio +' name="delMun">'+response[i].descripcion+'</option>');
          }
      });
}
function doneAll(){
  var currentPage = document.getElementById('xpress').dataset.page = 1;
  document.getElementById('block-4').style.display = 'none';
  document.getElementById('block-'+currentPage).style.display = 'block';
  document.getElementById('historyNav').classList.remove('open');
  $("#shure").removeClass('active');
}
function devSave(j){
  var geoPosition = document.getElementById('geoId').value,
      servicioTipo  = document.getElementsByName('servicioTipo')[0].value,
      servicioId = document.getElementsByName('servicioId')[0].value,
      nombre = document.getElementsByName('nombre')[0].value,
      paterno = document.getElementsByName('paterno')[0].value,
      materno = document.getElementsByName('materno')[0].value,
      telefono = document.getElementsByName('telefono')[0].value,
      celular = document.getElementsByName('celular')[0].value,
      email = document.getElementsByName('email')[0].value,
      rfc = document.getElementsByName('rfc')[0].value,
      tipoCalle = document.getElementsByName('tipoCalle')[0].value,
      calle = document.getElementsByName('calle')[0].value,
      numExt = document.getElementsByName('numExt')[0].value,
      numInt = document.getElementsByName('numInt')[0].value,
      entreCalle1 = document.getElementsByName('entreCalle1').value,
      entreCalle2 = document.getElementsByName('entreCalle2').value,
      colonia = document.getElementsByName('colonia')[0].value,
      cp = document.getElementsByName('cp')[0].value,
      estado = document.getElementsByName('estado')[0].value,
      municipio = document.getElementsByName('municipio')[0].value,
      ine = document.getElementById('ine').value,
      comp = document.getElementById('comp').value,
      parts = geoPosition.split(',', 2),
      data = {"idContrato":" ","servicioTipo": ""+servicioTipo+"","servicioId":""+servicioId+"","nombre":""+nombre+"","paterno":""+paterno+"","materno":""+materno+"","telefono":""+telefono+"","email":""+email+"","rfc":""+rfc+"","tipoCalle":""+tipoCalle+"","calle":""+calle+"","numExt":""+numExt+"","numInt":""+numInt+"","entreCalle1":""+entreCalle1+"","entreCalle2":""+entreCalle2+"","colonia":""+colonia+"","delMun":""+municipio+"","cp":""+cp+"","estado":""+estado+"","modemEntrega":" ","reciboSinpapel":" ","fecha":"","latitud":""+parts[0]+"", "longitud":""+parts[1]+"","idtipo":" ","identifica":" ","celular":""+celular+"","idFielder":""+userId+"","imagenIfe": ""+ine+"", "imagenComprobanteDe":""+comp+""};
      persistencia(data);
}
