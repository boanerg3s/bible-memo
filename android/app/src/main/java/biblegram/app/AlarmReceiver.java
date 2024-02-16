package biblegram.app;

import android.os.Build;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import android.app.NotificationManager;
import android.app.Application;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;
import android.util.Log;
import android.os.Bundle;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class AlarmReceiver extends BroadcastReceiver {
  private static Ringtone ringtone;
  private static Integer notificationID;

  @Override
  public void onReceive(final Context context, Intent intent) {
    if (AlarmReceiver.isRinging()) {
      return;
    }

    final Bundle bundle = intent.getExtras();
    AlarmPersistenceHelper persistenceHelper = new AlarmPersistenceHelper(context);
    persistenceHelper.removeDefinition(bundle);

    notificationID = bundle.getInt("index");
    scheduleNextAlarm(context, bundle.getString("when"), bundle);
    handleLocalNotification(context, bundle);

    // play ringtone
    Uri alarmSound = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_ALARM);
    AlarmReceiver.ringtone = RingtoneManager.getRingtone(context, alarmSound);
    ringtone.play();

    if (AlarmModule.reactContext != null) { 
      AlarmModule.reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("ALARM_CHANGED", null);
    }
  }

  private void scheduleNextAlarm(Context context, String whenString, Bundle bundle) {
    DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    LocalDateTime when = LocalDateTime.parse(whenString, dateFormatter);
    LocalDateTime newWhenDatetime = when.plusDays(7);
    String newWhen = newWhenDatetime.format(dateFormatter);
    
    // update bundle
    AlarmPersistenceHelper persistenceHelper = new AlarmPersistenceHelper(context);
    bundle.putString("when", newWhen);
    bundle.putInt("index", persistenceHelper.getNextIndex());
    AlarmScheduler.schedule(context, newWhen, bundle);
  }

  private void handleLocalNotification(Context context, Bundle bundle) {
    Application applicationContext = (Application) context.getApplicationContext();
    RNPushNotificationHelper pushNotificationHelper = new RNPushNotificationHelper(applicationContext);
    pushNotificationHelper.sendToNotificationCentre(bundle);
  }

  public static boolean isRinging() {    
    return AlarmReceiver.ringtone != null;
  }

  public static void stopAlarm(Context context) {
    if (AlarmReceiver.ringtone != null) {
      NotificationManager notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
      notificationManager.cancel(notificationID);
      
      // is not necessary playing...
      if (AlarmReceiver.ringtone.isPlaying()) {
        AlarmReceiver.ringtone.stop();
      }

      // clean ringtone reference
      AlarmReceiver.ringtone = null;
      
      // emit event
      if (AlarmModule.reactContext != null) { 
        AlarmModule.reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("ALARM_CHANGED", null);
      }
    }
  }
}