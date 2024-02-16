package biblegram.app;

import android.app.Application;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import androidx.core.app.NotificationCompat;

public class RNPushNotificationHelper {
  public static final String PREFERENCES_KEY = "rn_push_notification";
  private static final long DEFAULT_VIBRATION = 300L;

  private Context context;
  private RNPushNotificationConfig config;

  public RNPushNotificationHelper(Application context) {
    this.context = context;
    this.config = new RNPushNotificationConfig(context);
  }

  public Class getMainActivityClass() {
    String packageName = context.getPackageName();
    Intent launchIntent = context.getPackageManager().getLaunchIntentForPackage(packageName);
    String className = launchIntent.getComponent().getClassName();

    try {
      return Class.forName(className);
    } catch (ClassNotFoundException e) {
      e.printStackTrace();
      return null;
    }
  }

  public void sendToNotificationCentre(final Bundle bundle) {
    createNotificationChannel();
    Class intentClass = getMainActivityClass();

    if (intentClass == null) {
      return;
    }

    Intent onCancelIntent = new Intent(context, AlarmReceiverCancel.class);
    PendingIntent onCancelPendingItent = PendingIntent.getBroadcast(context, 0, onCancelIntent, Build.VERSION.SDK_INT >= Build.VERSION_CODES.M ? PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE : PendingIntent.FLAG_UPDATE_CURRENT);

    NotificationCompat.Builder notification = new NotificationCompat.Builder(context, this.config.getNotificationDefaultChannelId())
    .setSilent(true)
    .setLocalOnly(true)
    .setShowWhen(false)
    .setAutoCancel(true)
    .setOnlyAlertOnce(false)
    .setUsesChronometer(false)
    .setWhen(System.currentTimeMillis())
    .setDeleteIntent(onCancelPendingItent)
    .setSmallIcon(R.drawable.ic_notification) 
    .setContentTitle(bundle.getString("title"))
    .setPriority(NotificationCompat.PRIORITY_MAX)
    .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
    .addAction(android.R.drawable.ic_media_pause, "Parar", onCancelPendingItent);

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) { // API 26 and higher
      // Changing Default mode of notification
      notification.setDefaults(Notification.DEFAULT_LIGHTS);
    }

    String message = bundle.getString("message");
    NotificationCompat.Style style = new NotificationCompat.BigTextStyle().bigText(message);
    notification.setContentText(message);
    notification.setStyle(style);

    Intent intent = new Intent(context, intentClass);
    intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
    bundle.putBoolean("userInteraction", true);
    intent.putExtra("notification", bundle);

    int notificationID = bundle.getInt("index");
    PendingIntent pendingIntent = PendingIntent.getActivity(context, notificationID, intent, Build.VERSION.SDK_INT >= Build.VERSION_CODES.M ? PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE : PendingIntent.FLAG_UPDATE_CURRENT);
    long[] vibratePattern = new long[]{0, DEFAULT_VIBRATION};
    notification.setVibrate(vibratePattern); 
    notification.setChannelId(this.config.getNotificationDefaultChannelId());
    notification.setContentIntent(pendingIntent);

    Notification info = notification.build();
    info.defaults |= Notification.DEFAULT_LIGHTS;
    
    NotificationManager notificationManager = notificationManager();
    notificationManager.notify(notificationID, info);
  }

  private void createNotificationChannel() { 
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      String channelId = this.config.getNotificationDefaultChannelId();
      NotificationChannel mChannel = new NotificationChannel(channelId, "General Notifications", NotificationManager.IMPORTANCE_HIGH);
      mChannel.setDescription("This is default channel used for all Biblegram notifications");
      NotificationManager notificationManager = notificationManager();
      notificationManager.createNotificationChannel(mChannel);
    }
  }

  private NotificationManager notificationManager() {
    return (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
  }
}