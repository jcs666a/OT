var h=window.innerHeight-60-49,w=$(window).width(),
meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
mesSh=[ "Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
dias=["Domingo","Lunes","Mártes","Miércoles","Jueves","Viernes","Sábado"],
diaM=["Do","Lu","Ma","Mi","Ju","Vi","Sa"];
var mh=h/2,mw=w/2;
(function(window){'use strict';
	function classReg(className){return new RegExp("(^|\\s+)" + className + "(\\s+|$)");}
	var hasClass, addClass, removeClass;
	if('classList' in document.documentElement){
		hasClass=function(elem,c){return elem.classList.contains(c);};
		addClass=function(elem,c){elem.classList.add(c);};
		removeClass=function(elem,c){elem.classList.remove(c);};
	}
	else{
		hasClass=function(elem,c){return classReg(c).test(elem.className);};
		addClass=function(elem,c){if(!hasClass(elem,c))elem.className=elem.className + ' ' + c;};
		removeClass=function(elem,c){elem.className=elem.className.replace(classReg(c),' ');};
	}
	function toggleClass(elem,c){var fn=hasClass(elem,c) ? removeClass:addClass;fn(elem,c);}
	var classie={
		hasClass:hasClass,addClass:addClass,removeClass:removeClass,toggleClass:toggleClass,
		has:hasClass,add:addClass,remove:removeClass,toggle:toggleClass};
	if(typeof define==='function' && define.amd)define(classie);
	else window.classie=classie;
})(window);
(function(window){'use strict';
	function mobilecheck(){var check=false;(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);return check;}
	function gnMenu(el,options){this.el=el;this._init();}
	gnMenu.prototype={
		_init:function(){
			this.trigger=this.el.querySelector('a.gn-icon-menu');this.menu=this.el.querySelector('nav.gn-menu-wrapper');this.isMenuOpen=false;this.eventtype=mobilecheck() ? 'touchstart':'click';this._initEvents();var self=this;
			this.bodyClickFn=function(){self._closeMenu();this.removeEventListener(self.eventtype,self.bodyClickFn);};
		},
		_initEvents:function(){
			var self=this;
			if(!mobilecheck()){this.menu.addEventListener('mouseover',function(ev){self._openMenu();document.addEventListener(self.eventtype,self.bodyClickFn);});}
			this.trigger.addEventListener(this.eventtype,function(ev){ev.stopPropagation();ev.preventDefault();
				if(self.isMenuOpen){self._closeMenu();document.removeEventListener(self.eventtype,self.bodyClickFn);}
				else{self._openMenu();document.addEventListener(self.eventtype,self.bodyClickFn);}
			});
			this.menu.addEventListener(this.eventtype,function(ev){ev.stopPropagation();});
		},
		_openMenu:function(){if(this.isMenuOpen) return;classie.add(this.trigger,'gn-selected');this.isMenuOpen=true;classie.add(this.menu,'gn-open-all');},
		_closeMenu:function(){if(!this.isMenuOpen) return;classie.remove(this.trigger,'gn-selected');this.isMenuOpen=false;classie.remove(this.menu,'gn-open-all');}
	}
	window.gnMenu=gnMenu;
})(window);
function perfiles(i){
		 if(i==4)i='Administrador';
	else if(i==5)i='Director';
	else if(i==6)i='Lider Promotor';
	else if(i==7)i='Promotor';
	else if(i==8)i='Diseño';
	return i;
}
function regisdivareas(region){
	var res=region.split("-"),regiones=[];regiones['distrito']='';regiones['colonia']='';
	if(res[2]===undefined)res[2]=0;if(res[3]===undefined)res[3]=0;
	if(res[0]==1){
		regiones['division']='Metro';
			 if(res[1]==1) regiones['area']='Acapulco';
		else if(res[1]==2) regiones['area']='Balbuena';
		else if(res[1]==3) regiones['area']='Chilpancingo';
		else if(res[1]==4) regiones['area']='Cuautitlan-Morelos';
		else if(res[1]==5) regiones['area']='Ermita-Tlahuac';
		else if(res[1]==6) regiones['area']='Lindavista';
		else if(res[1]==7) regiones['area']='Lomas';
		else if(res[1]==8) regiones['area']='Mixcoac';
		else if(res[1]==9) regiones['area']='Morelos';
		else if(res[1]==10)regiones['area']='Satélite';
		else if(res[1]==11)regiones['area']='Sotelo';
		else if(res[1]==12)regiones['area']='Texcoco-Zaragoza';
		else if(res[1]==13)regiones['area']='Toluca';
		else if(res[1]==14)regiones['area']='Universidad';
		else if(res[1]==15)regiones['area']='Valle-San Juán';
	}
	else if(res[0]==2){
		regiones['division']='Norte';
			 if(res[1]==16)regiones['area']='Aguascalientes';
		else if(res[1]==17)regiones['area']='Celaya';
		else if(res[1]==18)regiones['area']='Ciudad Victoria';
		else if(res[1]==19)regiones['area']='Irapuato';
		else if(res[1]==20)regiones['area']='León';
		else if(res[1]==21)regiones['area']='Matamoros';
		else if(res[1]==22)regiones['area']='Monterrey 1';
		else if(res[1]==23)regiones['area']='Monterrey 2';
		else if(res[1]==24)regiones['area']='Monterrey Foraneas';
		else if(res[1]==25)regiones['area']='Nuevo Laredo';
		else if(res[1]==26)regiones['area']='Querétaro';
		else if(res[1]==27)regiones['area']='Reynosa';
		else if(res[1]==28)regiones['area']='Sabinas';
		else if(res[1]==29)regiones['area']='Saltillo';
		else if(res[1]==30)regiones['area']='San Luis Potosí';
		else if(res[1]==31)regiones['area']='Tampico';
		else if(res[1]==32)regiones['area']='Torreón';
		else if(res[1]==33)regiones['area']='Zacatecas';
	}
	else if(res[0]==3){
		regiones['division']='Occidente';
			 if(res[1]==34)regiones['area']='Chihuahua';
		else if(res[1]==35)regiones['area']='Ciudad Juárez';
		else if(res[1]==36)regiones['area']='Ciudad Obregón';
		else if(res[1]==37)regiones['area']='Colima';
		else if(res[1]==38)regiones['area']='Culiacán';
		else if(res[1]==39)regiones['area']='Durango';
		else if(res[1]==40)regiones['area']='Guadalajara Centro';
		else if(res[1]==41)regiones['area']='Guadalajara Oriente';
		else if(res[1]==42)regiones['area']='Guadalajara Poniente';
		else if(res[1]==43)regiones['area']='Hermosillo';
		else if(res[1]==44)regiones['area']='Jalisco';
		else if(res[1]==45)regiones['area']='La Paz';
		else if(res[1]==46)regiones['area']='Los Mochis';
		else if(res[1]==47)regiones['area']='Mazatlan';
		else if(res[1]==48)regiones['area']='Morelia';
		else if(res[1]==49)regiones['area']='Nogales';
		else if(res[1]==50)regiones['area']='Puerto Vallarta';
		else if(res[1]==51)regiones['area']='Tepic';
		else if(res[1]==52)regiones['area']='Zamora';
	}
	else if(res[0]==4){
		regiones['division']='Sur';
			 if(res[1]==53)regiones['area']='Campeche';
		else if(res[1]==54)regiones['area']='Cancún';
		else if(res[1]==55)regiones['area']='Coatzacoalcos';
		else if(res[1]==56)regiones['area']='Córdoba';
		else if(res[1]==57)regiones['area']='Jalapa';
		else if(res[1]==58)regiones['area']='Mérida';
		else if(res[1]==59)regiones['area']='Oaxaca';
		else if(res[1]==60)regiones['area']='Pachuca';
		else if(res[1]==61)regiones['area']='Poza Rica';
		else if(res[1]==62)regiones['area']='Puebla';
		else if(res[1]==63)regiones['area']='Tlaxcala-Puebla';
		else if(res[1]==64)regiones['area']='Tuxtla Guitierrez';
		else if(res[1]==65)regiones['area']='Veracrúz';
		else if(res[1]==66)regiones['area']='Villahermosa';
		else if(res[1]==70)regiones['area']='Tlaxcala';
	}
	else if(res[0]==5){
		regiones['division']='Telnor';
			 if(res[1]==67)regiones['area']='Ensenada';
		else if(res[1]==68)regiones['area']='Mexicali';
		else if(res[1]==69)regiones['area']='Tijuana';
	}
	if(res[2]!=0)regiones['distrito']=res[2];
	if(res[3]!=0)regiones['colonia']=res[3];
	if(res[2]!=0 && res[3]==0){
		regiones['region']=regiones['division'] + '-' + regiones['area'] + '-' + res[2];
		regiones['regionT']='Distrito: <span>' + regiones['division'] + '-' + regiones['area'] + '-' + res[2]+'</span>';
	}
	else if(res[1]==0){
		regiones['region']=regiones['division'];
		regiones['regionT']='División: <span>'+regiones['division']+'</span>';
	}
	else if(res[2]==0 && res[3]==0){
		regiones['region']=regiones['division'] + '-' + regiones['area'];
		regiones['regionT']='Área: <span>' + regiones['division'] + '-' + regiones['area']+'</span>';
	}
	else if(res[2]==0 && res[3]!=0){
		regiones['region']=regiones['division'] + '-' + regiones['area'] + '-' + res[3];
		regiones['regionT']='Colonia: <span>' + regiones['division'] + '-' + regiones['area'] + '-' + res[3]+'</span>';
	}
	else if(res[2]!=0 && res[3]!=0){
		regiones['region']=regiones['division'] + '-' + regiones['area'] + '-' + res[3] + '-' + res[2];
		regiones['regionT']='Distrito/Colonia: <span>' + regiones['division'] + '-' + regiones['area'] + '-' + res[3] + '-' + res[2]+'</span>';
	}
	regiones['original']=region;
	return regiones;
}
var path=window.location.pathname,myCookie=getCookie("Cinf"),Nombre='',Usuario='',idBoss='',Rol='',idRol='',marcadores=[],ubicalosFirst=1,misRegiones=[],
	promesas={
		all:function(k){return $.ajax({method:"POST",url:Ñ,data:k});},

		fieldersA:function(p){return $.ajax({method:"POST",url:Ñ,data:{pky:',.-76reIo5{',P:p}});},
		fieldersR:function(p){return $.ajax({method:"POST",url:Ñ,data:{pky:'Tym,pñ&',P:p}});},
		fielderIN:function(p){return $.ajax({method:"POST",url:Ñ,data:{pky:'-Iyh&4}[',P:p}});},
		Fdistritos:function(p,a){return $.ajax({method:"POST",url:Ñ,data:{pky:'lñjh(U]',P:p,A:a}});},
		SendMesje:function(p,r,i,t){return $.ajax({method:"POST",url:Ñ,data:{pky:'1|s"1!',P:p,R:r,I:i,T:t}});},
		SendMsjAl:function(p,r,t){return $.ajax({method:"POST",url:Ñ,data:{pky:'t6U.ño/',P:p,R:r,T:t}});},
		GetFielrs:function(r,p){return $.ajax({method:"POST",url:Ñ,data:{pky:'-*6+¿dyF',R:r,P:p}});},
		GetLiders:function(p,q){return $.ajax({method:"POST",url:Ñ,data:{pky:'ñ%3fN.-',P:p,Q:q}});},
		GetCampas:function(){return $.ajax({method:"POST",url:Ñ,data:{pky:'ñ*}{Lokj'}});},
		campById:function(p){return $.ajax({method:"POST",url:Ñ,data:{pky:'.tr/(ydF',P:p}});},
		GetCRdCam:function(p){return $.ajax({method:"POST",url:Ñ,data:{pky:'lj.m,-/5tD',P:p}});},
		GetCRdCal:function(p){return $.ajax({method:"POST",url:Ñ,data:{pky:'lj.m,[0]tD',P:p}});},
		GetAllCFR:function(p,z,r){return $.ajax({method:"POST",url:Ñ,data:{pky:'/*-+%4dG',P:p,Y:'N',Z:z,R:r}});},
		GetACalFi:function(p,z,r){return $.ajax({method:"POST",url:Ñ,data:{pky:'/*ÑÑ%4dG',P:p,Y:'Y',Z:z,R:r}});},
		GetCalAct:function(p,q){return $.ajax({method:"POST",url:Ñ,data:{pky:'hUUrf[,.()',P:p,Q:q}});},
		CierraSec:function(p){return $.ajax({method:"POST",url:Ñ,data:{pky:'0Ṕ[RGdf',P:p}});},
		UpdCalAct:function(a,c,s,e,m,t,d){return $.ajax({method:"POST",url:Ñ,data:{pky:'°1sLp9]+',A:a,C:c,S:s,E:e,M:m,T:t,D:d}});},
		DelCalAct:function(p){return $.ajax({method:"POST",url:Ñ,data:{pky:'""#fGm0""',P:p}});},
		AddCalAct:function(c,s,e,m,t,d){return $.ajax({method:"POST",url:Ñ,data:{pky:'y_m,/5fGd',C:c,S:s,E:e,M:m,T:t,D:d}});},
		AddCalFie:function(c,r,f){return $.ajax({method:"POST",url:Ñ,data:{pky:'p_.9886fF+',C:c,R:r,F:f}});},
		getRcInt:function(c,p,u){return $.ajax({method:"POST",url:Ñ,data:{pky:'k;624/6',C:c,P:p,U:u}});},
		getRealcInt:function(p,r){return $.ajax({method:"POST",url:Ñ,data:{pky:'oP{ñ_,m$"',P:p,R:r}});},
		getRealCont:function(p){return $.ajax({method:"POST",url:Ñ,data:{pky:'7%&7fBh{',P:p}});},
		RegDeleteCR:function(p){return $.ajax({method:"POST",url:Ñ,data:{pky:'{-po9kD3$',P:p}});},
		RegDelCFR:function(p,y){return $.ajax({method:"POST",url:Ñ,data:{pky:']}ñByr4F',P:p,Y:y}});},
		RegaddCFR:function(p,y){return $.ajax({method:"POST",url:Ñ,data:{pky:'Fg3$°1|',P:p,Y:y}});},
		RegAddCR:function(p,r){return $.ajax({method:"POST",url:Ñ,data:{pky:'}-.Ygf#44',P:p,R:r}});},
		RegDCalFi:function(p,q,r){return $.ajax({method:"POST",url:Ñ,data:{pky:'l/4t{{+}',P:p,Q:q,R:r}});},
		RegACalFi:function(q,p,y){return $.ajax({method:"POST",url:Ñ,data:{pky:'l/55G4rp´',Q:q,P:p,Y:y}});},
		UpdateUse:function(n,i,e,u,p,r,s){return $.ajax({method:"POST",url:Ñ,data:{pky:'.3Lñ-_,U',N:n,I:i,E:e,U:u,P:p,R:r,S:s}});},
		AddingUse:function(n,e,u,p,r,s,z){return $.ajax({method:"POST",url:Ñ,data:{pky:'bH-.!sdT',N:n,E:e,U:u,P:p,R:r,S:s,Z:z}});},
		DeleteUse:function(p){return $.ajax({method:"POST",url:Ñ,data:{pky:'Ñpf[0o',P:p}});},
		addRegion:function(i,j,r,g,b,z){return $.ajax({method:"POST",url:Ñ,data:{pky:'Nb%423d',I:i,J:j,R:r,G:g,B:b,Z:z}});},
		RegDelete:function(p,r){return $.ajax({method:"POST",url:Ñ,data:{pky:'0"#rGf4sxV',P:p,R:r}});},
		sacoAutom:function(p){return $.ajax({method:"POST",url:Ñ,data:{pky:'wGhj/&i:',P:p}});},
		DeleteCam:function(p){return $.ajax({method:"POST",url:Ñ,data:{pky:'h-&7/f5D',P:p}});},
		UpdateCpm:function(D){return $.ajax({url:Ñ,method:'POST',data:D,processData:false});},
		AddingCpm:function(D){return $.ajax({method:"POST",url:Ñ,data:D});},
		UbicaFiel:function(p){return $.ajax({method:"POST",url:Ñ,data:{pky:'-Ñp0?2.3d',P:p}});},
		Conversas:function(p){return $.ajax({method:"POST",url:Ñ,data:{pky:',&44jÑ{',P:p}});},
		RegFroCam:function(p,r){return $.ajax({method:"POST",url:Ñ,data:{pky:'-:Ñ_6%fC',P:p,R:r}});}
	};
function creanotificacion(titulo,mensaje,error,textStatus,clase){
	var op=''; if(error!='') op='<p>' + error + ' ' + textStatus + '</p>';
	$('#notificaciones').append('<div class="tn ' + clase + '">' +
		'<h2>' + titulo + '</h2>' +
		'<p>' + mensaje + '</p>' + op +
		'<div class="tn-progress"></div>' +
	'</div>');
	setTimeout(function(){$('#notificaciones').find(".tn").first().remove();},5000);
}
function dialogos(f,x){if(x=='')x=560;$(f).dialog({minWidth:x,maxHeight:h*.94,modal:true,close:function(event,ui){$(this).dialog('destroy').empty().remove();}});}
function getPromesa(data){
	return $.ajax({method:"POST",url:Ñ,data:data});
}
function readCookie(name){
	var nameEQ=name + "=",
		ca=document.cookie.split(';');
	for (var i=0;i<ca.length;i++){
		var c=ca[i];
		while(c.charAt(0)==' ')c=c.substring(1, c.length);
		if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length, c.length);
	}
	return null;
}
function getCookie(name){
	var dc=document.cookie,
		prefix=name + "=";
	var begin=dc.indexOf("; " + prefix);
	if(begin==-1){
		begin=dc.indexOf(prefix);
		if (begin != 0) return null;
	}
	else{
		begin+=2;
		var end=document.cookie.indexOf(";", begin);
		if(end==-1){
			end=dc.length;
		}
	}
	return unescape(dc.substring(begin + prefix.length,end));
}
function valida_login(){
	var jn,ck;
	if(myCookie!=null){
		ck=decodeURIComponent(readCookie('Cinf'));
		cr=decodeURIComponent(readCookie('Creg'));
		jn=JSON.parse(ck);
		jr=JSON.parse(cr);
		Nombre=jn[0].replace(/\+/g, ' ');
		idBoss=jn[1];
		Rol=jn[2].replace(/\+/g, ' ');
		idRol=jn[3];
		Usuario=jn[4].replace(/\+/g, ' ');
		$.each(jr,function(i,v){
			misRegiones.push(v.replace(/\+/g, ' '));
		});
		if(!/dashboard/i.test(path))
			window.location='dashboard';
	}
	else
		if(/dashboard/i.test(path))
			window.location='../';
}
function salir(){
	var datos={ pky:'4g?$eRt=',
				P:idBoss};
	var P=getPromesa(datos);
	P.done(function(x){
		window.location='../';
	}).fail(function(jqXHR,textStatus,error){
		creanotificacion('Error 404:',
				'No se recibió respuesta del servicio de logout.',
				error,textStatus,'error');
	});
}
valida_login();
$(window).load(function(){
	setTimeout(function(){
		$("#loading").fadeOut().addClass('opaco');
	},600);
});