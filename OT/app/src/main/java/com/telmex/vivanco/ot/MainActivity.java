package com.telmex.vivanco.ot;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.CookieManager;
import android.webkit.CookieSyncManager;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import com.google.android.gms.gcm.GoogleCloudMessaging;

import java.io.File;
import java.io.IOException;

public class MainActivity extends AppCompatActivity {

    String regId;
    String name;
    String exp;
    GoogleCloudMessaging gcm;
    Context context;
    ShareExternalServer appUtil;
    AsyncTask<Void, Void, Void> shareRegidTask;



    // Alert dialog manager
    AlertDialogManager alert = new AlertDialogManager();

    // Connection detector
    ConnectionDetector cd;

    public static final String REG_ID = "regId";
    private static final String APP_VERSION = "appVersion";

    static final String TAG = "Register Activity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        cd = new ConnectionDetector(getApplicationContext());

        WebView myWebView = (WebView) this.findViewById(R.id.webView);
        myWebView.getSettings().setJavaScriptEnabled(true);
        myWebView.getSettings().setRenderPriority(WebSettings.RenderPriority.HIGH);
        //myWebView.getSettings().setGeolocationEnabled(true);
        myWebView.setWebViewClient(new Callback());
        //Cache
        //myWebView.getSettings().setAppCacheEnabled(true);
        //myWebView.getSettings().setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
        myWebView.loadUrl("http://10.105.116.69/App");

        // Check if Internet present
        if (!cd.isConnectingToInternet()) {
            // Internet Connection is not present
            alert.showAlertDialog(MainActivity.this,
                    "Error en la Conexión de Internet",
                    "Por favor Conectese a Internet", false);
            // stop executing code by return
            return;
        }

        context = getApplicationContext();
        name = "Erick Vivanco";
        exp = "47389749312";

        if (TextUtils.isEmpty(regId)) {
            regId = registerGCM();
            //Log.d("RegisterActivity", "GCM RegId: " + regId);
        } else {
            Toast.makeText(getApplicationContext(),
                    "Ya esta registrado!",
                    Toast.LENGTH_LONG).show();
        }

        registroExt(name, exp, regId);
    }

    private class Callback extends WebViewClient {  //HERE IS THE MAIN CHANGE.

        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            return (false);
        }

    }

    public void registroExt(final String name, final String exp, final String regId){

        appUtil = new ShareExternalServer();
        Log.d("MainActivity", "name: " + name + " expediente: " + exp + " regId: " + regId);
        final Context context = this;
        if (name != null && exp != null) {
            shareRegidTask = new AsyncTask<Void, Void, Void>() {
                @Override
                protected Void doInBackground(Void... params) {
                    appUtil.shareRegIdWithAppServer(context, name, exp, regId);
                    return null;
                }

                @Override
                protected void onPostExecute(Void result) {
                    shareRegidTask = null;
                }
            };
            shareRegidTask.execute(null, null, null);

            //Toast.makeText(getApplicationContext(),"Registrado", Toast.LENGTH_LONG).show();
        }
    }


    public String registerGCM() {

        gcm = GoogleCloudMessaging.getInstance(this);
        regId = getRegistrationId(context);

        if (TextUtils.isEmpty(regId)) {

            registerInBackground();

            Log.d("RegisterActivity",
                    "registerGCM - registro exitoso en el servidor GCM - regId: "
                            + regId);
        } else {
            Toast.makeText(getApplicationContext(),
                    "RegId existente. RegId: " + regId,
                    Toast.LENGTH_LONG).show();
        }
        return regId;
    }

    private String getRegistrationId(Context context) {
        final SharedPreferences prefs = getSharedPreferences(
                MainActivity.class.getSimpleName(), Context.MODE_PRIVATE);
        String registrationId = prefs.getString(REG_ID, "");
        if (registrationId.isEmpty()) {
            Log.i(TAG, "Registro no encontrado.");
            return "";
        }
        int registeredVersion = prefs.getInt(APP_VERSION, Integer.MIN_VALUE);
        int currentVersion = getAppVersion(context);
        if (registeredVersion != currentVersion) {
            Log.i(TAG, "App version changed.");
            registrationId="";
            return registrationId;
        }
        return registrationId;
    }

    private static int getAppVersion(Context context) {
        try {
            PackageInfo packageInfo = context.getPackageManager()
                    .getPackageInfo(context.getPackageName(), 0);
            return packageInfo.versionCode;
        } catch (PackageManager.NameNotFoundException e) {
            Log.d("RegisterActivity",
                    "I never expected this! Going down, going down!" + e);
            throw new RuntimeException(e);
        }
    }

    private void registerInBackground() {
        new AsyncTask<Void, Void, String>() {
            @Override
            protected String doInBackground(Void... params) {
                String msg = "";
                try {
                    if (gcm == null) {
                        gcm = GoogleCloudMessaging.getInstance(context);
                    }
                    regId = gcm.register(Config.GOOGLE_PROJECT_ID);
                    Log.d("RegisterActivity", "registerInBackground - regId: "
                            + regId);
                    msg = "Device registered, registration ID=" + regId;

                    storeRegistrationId(context, regId);
                } catch (IOException ex) {
                    msg = "Error :" + ex.getMessage();
                    Log.d("RegisterActivity", "Error: " + msg);
                }
                Log.d("RegisterActivity", "AsyncTask completed: " + msg);
                return msg;
            }

            @Override
            protected void onPostExecute(String msg) {
                Toast.makeText(getApplicationContext(),
                        "Registered with GCM Server." + msg, Toast.LENGTH_LONG)
                        .show();
            }
        }.execute(null, null, null);
    }

    private void storeRegistrationId(Context context, String regId) {
        final SharedPreferences prefs = getSharedPreferences(
                MainActivity.class.getSimpleName(), Context.MODE_PRIVATE);
        int appVersion = getAppVersion(context);
        Log.i(TAG, "Saving regId on app version " + appVersion);
        SharedPreferences.Editor editor = prefs.edit();
        editor.putString(REG_ID, regId);
        editor.putInt(APP_VERSION, appVersion);
        editor.commit();
    }

}
