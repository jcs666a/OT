function GCM(){alert("Calling function to register device on GCM");window.plugins.pushnotification.register(successHandler,errorHandler,{"senderID":"945156551702","ecb":"onNotificationGCM"});}
function successHandler(result){alert("Result"+result);}
function successHandler(result){alert("Error"+result);}
function onNotificationGCM(e){alert("Message : "+e.event);switch(e.event){case'registered':alert("ID: "+e.regid);sendRequest(e.regid);alert("Successfully Registered");break;case'message':alert("Message: "+e.payload.message);var sound=new Media("assets/www/"+e.soundname);sound.play();break;default:alert("unknown event");}}
function sendRequest(regID){alert("Sending request ..");$.post("http://10.105.116.53/c4/register.php",{regID:regID,name:"erick",expediente:"10101010101"});}
