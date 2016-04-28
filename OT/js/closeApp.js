  timeNow = new Date();
    closeApp = new Date(timeNow.getFullYear(),timeNow.getMonth(), timeNow.getDate(), 0, 0).getTime() - Date.now();
    setTimeout(function(){
        logout();
    }, closeApp);