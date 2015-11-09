package com.telmex.vivanco.ot;

import android.annotation.SuppressLint;
import android.app.IntentService;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.os.SystemClock;
import android.support.v4.app.NotificationCompat;
import android.util.Log;

import com.google.android.gms.gcm.GoogleCloudMessaging;

import static com.telmex.vivanco.ot.Config.GOOGLE_PROJECT_ID;

public class GCMNotificationIntentService extends IntentService {

    public static final int NOTIFICATION_ID = 1;
    private NotificationManager mNotificationManager;
    NotificationCompat.Builder builder;

    public GCMNotificationIntentService() {
        super(GOOGLE_PROJECT_ID);
    }

    public static final String TAG = "GCMNotificationIntentService";
    @SuppressLint("LongLogTag")
    @Override
    protected void onHandleIntent(Intent intent) {
        Bundle extras = intent.getExtras();
        GoogleCloudMessaging gcm = GoogleCloudMessaging.getInstance(this);

        String messageType = gcm.getMessageType(intent);

        if (!extras.isEmpty()) {
            if (GoogleCloudMessaging.MESSAGE_TYPE_SEND_ERROR
                    .equals(messageType)) {
                sendNotification("Send error: " + extras.toString());
            } else if (GoogleCloudMessaging.MESSAGE_TYPE_DELETED
                    .equals(messageType)) {
                sendNotification("Deleted messages on server: "
                        + extras.toString());
            } else if (GoogleCloudMessaging.MESSAGE_TYPE_MESSAGE
                    .equals(messageType)) {

                for (int i = 0; i < 3; i++) {
                    Log.i(TAG,
                            "Working... " + (i + 1) + "/5 @ "
                                    + SystemClock.elapsedRealtime());
                    try {
                        Thread.sleep(5000);
                    } catch (InterruptedException e) {
                    }

                }
                Log.i(TAG, "Completed work @ " + SystemClock.elapsedRealtime());

                sendNotification((String) extras.get("mensaje"));
                Log.i(TAG, "Received: " + extras.toString());

            }
        }
        GcmBroadcastReceiver.completeWakefulIntent(intent);
    }

    @SuppressLint("LongLogTag")
    private void sendNotification(String msg) {
        Log.d(TAG, "Preparing to send notification...: " + msg);
        mNotificationManager = (NotificationManager) this
                .getSystemService(Context.NOTIFICATION_SERVICE);
        Intent in=new Intent(getBaseContext(),MainActivity.class);
        in.putExtra("msg",msg);
        PendingIntent contentIntent = PendingIntent.getActivity(getBaseContext(), 0,in,PendingIntent.FLAG_UPDATE_CURRENT);

        NotificationCompat.Builder mBuilder = new NotificationCompat.Builder(
                this).setSmallIcon(R.drawable.logito)
                .setContentTitle("Telmex GCM Notificacion")
                .setLights(Color.CYAN, 1,1)
                .setStyle(new NotificationCompat.BigTextStyle().bigText(msg))
                .setContentText(msg);

        mBuilder.setContentIntent(contentIntent);
        mNotificationManager.notify(NOTIFICATION_ID, mBuilder.build());
        Log.d(TAG, "Notification sent successfully.");
    }
}
