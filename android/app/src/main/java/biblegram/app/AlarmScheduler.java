package biblegram.app;

import android.os.Bundle;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import java.time.ZoneId;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import android.util.Log;

public class AlarmScheduler {
  public static void schedule(Context context, String whenString, Bundle bundle)  {
    Log.d("biblegram.app", "Scheduling " + whenString);
    AlarmPersistenceHelper persistenceHelper = new AlarmPersistenceHelper(context);
    DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    LocalDateTime when = LocalDateTime.parse(whenString, dateFormatter);
    long epochSecond = when.atZone(ZoneId.systemDefault()).toEpochSecond();

    Intent intent = new Intent(context, AlarmReceiver.class);
    intent.putExtras(bundle);

    PendingIntent pendingIntent = PendingIntent.getBroadcast(
      context,
      bundle.getInt("index"),
      intent,
      PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
    );
    
    AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
    alarmManager.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, epochSecond * 1000, pendingIntent);
    persistenceHelper.storeDefinition(bundle);
  }

  public static void unscheduleAll(Context context) {
    AlarmPersistenceHelper persistenceHelper = new AlarmPersistenceHelper(context);
    ArrayList<Bundle> definitions = persistenceHelper.getAllDefinitions();

    if (definitions != null) {
      for (Bundle bundle : definitions) { AlarmScheduler.unschedule(context, bundle); }
      persistenceHelper.clearDefinitions();
    }
  }

  public static void unschedule(Context context, Bundle bundle) {
    try {
      DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
      LocalDateTime when = LocalDateTime.parse(bundle.getString("when"), dateFormatter);
      long epochSecond = when.atZone(ZoneId.systemDefault()).toEpochSecond();

      Intent intent = new Intent(context, AlarmReceiver.class);
      intent.putExtras(bundle);

      PendingIntent pendingIntent = PendingIntent.getBroadcast(
        context,
        bundle.getInt("index"),
        intent,
        PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
      );

      AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
      alarmManager.cancel(pendingIntent);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}