package biblegram.app;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import java.util.ArrayList;
import android.os.Bundle;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class BootReceiver extends BroadcastReceiver {
  @Override
  public void onReceive(Context context, Intent intent) {
    if (Intent.ACTION_BOOT_COMPLETED.equals(intent.getAction())) {
      AlarmPersistenceHelper persistenceHelper = new AlarmPersistenceHelper(context);
      ArrayList<Bundle> definitions = persistenceHelper.getAllDefinitions();

      for (int i = 0; i < definitions.size(); i++) {
        Bundle bundle = definitions.get(i);
        String when = bundle.getString("when");
        
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime whenDate = LocalDateTime.parse(when, dateFormatter);

        if (whenDate.isBefore(LocalDateTime.now())) {
          whenDate = whenDate.plusDays(7);
          when = whenDate.format(dateFormatter);
          bundle.putString("when", when);
        }
        
        AlarmScheduler.schedule(context, when, bundle);
      }
    }
  }
}