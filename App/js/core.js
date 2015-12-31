	//almacen de variables globales 
  var globalHash = "",
      fielderInfo=jQuery.parseJSON(localStorage.getItem('fielderInfo')),
      fielderMsgs=jQuery.parseJSON(localStorage.getItem('fielderMsgs')),
      fielderRegs=jQuery.parseJSON(localStorage.getItem('fielderRegs')),
      fielderPols=jQuery.parseJSON(localStorage.getItem('fielderPols')),
      fielderTecs=jQuery.parseJSON(localStorage.getItem('fielderTecs')),
      fielderGrap=jQuery.parseJSON(localStorage.getItem('fielderGrap'));
function core(){
  $("#content").load("home.html");
  checkURL();
  $('.menu a').click(function (e){ 
    checkURL(this.hash);
    $(".menu .block").removeClass('active');
    $(this).find('.block').addClass('active');
	appMenu.removeClass('active');
	appMenu.html('<i class="fa fa-bars"></i>');
	menuDisplay.removeClass('active');
    wrapper.removeClass('active');
  });
  setInterval("checkURL()",250); 
}

  var lasturl="";
function checkURL(hash){
  if(!hash) {
    hash=window.location.hash;
  }
  if(hash != lasturl){
    lasturl=hash;
    loadPageCore(hash);
    globalHash = hash;
  }
}
function loadPageCore(url){
  url=url.replace('#','');
  $('#content').load(url+".html", function(){
         if(url=='mapa')startMapa();
    else if(url=="home")$('.homeInner .boxSlide a .inner i.fa.fa-envelope-o span').html(fielderMsgs.Nuevos);
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
var formHistory = [];
function backNav(){
  var currentPage = document.getElementById('xpress').dataset.page; 
    document.getElementById('block-'+currentPage).style.display = 'none';
    currentPage--;
    document.getElementById('block-'+currentPage).style.display = 'block';
    if(currentPage == 1){
      document.getElementById('historyNav').classList.remove('open');
    }
    else{
      document.getElementById('historyNav').classList.add('open');
    }
    document.getElementById('xpress').dataset.page = currentPage--;
}
function path(data){
  var currentPage = document.getElementById('xpress').dataset.page;
    console.log(currentPage);
    contentForm = data.innerHTML;
    formHistory.push(contentForm);
    document.getElementById('block-'+currentPage).style.display = 'none';
    currentPage++;
    document.getElementById('block-'+currentPage).style.display = 'block';
    document.getElementById('xpress').dataset.page = currentPage++;
    if(currentPage == 1){
      document.getElementById('historyNav').classList.remove('open');
    }
    else{
      document.getElementById('historyNav').classList.add('open');
    }
    if(currentPage == 4){
      $.ajax({
        url: 'http://10.105.116.52:9090/telmex/get/estados',
        type: 'GET',
        dataType: 'json',
      })
      .done(function(data) {
        console.log(data);
        var response = data.apiResponse[0];
        for(var i = 0; i <= response.length; i++){
          $("#noShit").append('<option value='+response[i].idEstado+'>'+response[i].descripcion+'</option>');
        }
      });
    }
}
function sendGeo(e){
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
        url: 'http://201.147.20.243:8082/sendtopisadummy/sendtopisa/exito',
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
      .fail(function(data) {
        $("#shure .inner").html('<h3>lLo sentimos su transaccion no fue exitosa...</h3>'+
                                  '<div id="so">'+
                                  '<div class="left" onclick="closeCheckOut();">'+
                                  '<p><i class="fa fa-times"></i>OK</p>'+
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
        url: "http://10.105.116.52:9090/telmex/get/municipio/"+val+"",
        type: 'GET',
        dataType: 'json',
      })
      .done(function(data) {
        var response = data.apiResponse[0];
        $("#municipio").html('');
        $("#municipio").append('<select name="municipio" id="subMunicipio"> </select>');
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
      municipio = document.getElementsByName('municipio')[0].value
      parts = geoPosition.split(',', 2);
      $.ajax({
        url: 'http://10.105.116.52:9090/telmex/add/contrato',
        method: "POST", 
        contentType: "application/json",
        data:JSON.stringify({"idContrato":" ","servicioTipo": ""+servicioTipo+"","servicioId":""+servicioId+"","nombre":""+nombre+"","paterno":""+paterno+"","materno":""+materno+"","telefono":""+telefono+"","email":""+email+"","rfc":""+rfc+"","tipoCalle":""+tipoCalle+"","calle":""+calle+"","numExt":""+numExt+"","numInt":""+numInt+"","entreCalle1":""+entreCalle1+"","entreCalle2":""+entreCalle2+"","colonia":""+colonia+"","delMun":""+municipio+"","cp":""+cp+"","estado":""+estado+"","modemEntrega":" ","reciboSinpapel":" ","fecha":"","latitud":""+parts[0]+"", "longitud":""+parts[1]+"","idtipo":" ","identifica":" ","celular":""+celular+"","idFielder":""+userId+""}),
      })
      .done(function(data) {
        console.log("success");
        console.log(data);
        document.getElementById("checkOut").reset();
      })
      .fail(function(data) {
        console.log(data);
      });
}
