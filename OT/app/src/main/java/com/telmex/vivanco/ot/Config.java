package com.telmex.vivanco.ot;

public interface Config {

    // used to share GCM regId with application server - using php app server
    static final String APP_SERVER_URL = "http://10.105.116.69/OT/register.php";

    // Google Project Number
    static final String GOOGLE_PROJECT_ID = "945156551702";
    static final String MESSAGE_KEY = "message";
    // Google project id

    static final String DISPLAY_MESSAGE_ACTION =
            "com.telmex.vivanco.gcm.DISPLAY_MESSAGE";
    /**
     * Tag used on log messages.
     */
    static final String TAG = "Telmex GCM";

}
