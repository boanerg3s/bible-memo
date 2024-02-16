package biblegram.app;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class AlarmReceiverCancel extends BroadcastReceiver {
  @Override
  public void onReceive(final Context context, Intent intent) {
    AlarmReceiver.stopAlarm(context);
  }
}