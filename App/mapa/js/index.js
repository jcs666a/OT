$(document).ready(function () {


   
	$("#btn_guardar").hover( 
	   function(e)  
	   {  
		  $(this).css("background-position","bottom");
	   },  
	   function(e)  
	   {  
		  $(this).css("background-position","top");	  
	   }  
   );
	
	$("#btn_ingresar").hover( 
	   function(e)  
	   {  
		  $(this).css("background-position","bottom");
	   },  
	   function(e)  
	   {  
		  $(this).css("background-position","top");	  
	   }  
   );	
   
   //$().corner("10px");
   
   //$("#menu").corner("bottom bevel").corner("top");
   	$("#menu").corner( "br top").corner("bevel bl 7px");
 	$(".casilla").corner("20px");
   

	$("#btn_guardar").click( function() { registra_dat(); } );
	$("#selecciona_campa").change( function() { carga_campos(); } );

  });