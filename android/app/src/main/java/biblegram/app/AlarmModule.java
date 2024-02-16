package biblegram.app;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import android.os.Bundle;

public class AlarmModule extends ReactContextBaseJavaModule {
  public static ReactApplicationContext reactContext;
  private final ReactApplicationContext context;

  AlarmModule(ReactApplicationContext context) {
    super(context);
    this.context = context;
    AlarmModule.reactContext = context;
  }

  @Override
  public String getName() {
    return "AlarmModule";
  }

  @ReactMethod
  public void createAlarm(String whenString, String title, String message, Callback onSuccess, Callback onError) {
    try {
      AlarmPersistenceHelper persistenceHelper = new AlarmPersistenceHelper(context);

      Bundle bundle = new Bundle();
      bundle.putString("when", whenString);
      bundle.putString("title", title);
      bundle.putString("message", message);
      bundle.putInt("index", persistenceHelper.getNextIndex());

      AlarmScheduler.schedule(context, whenString, bundle);
      onSuccess.invoke();
    } catch (Exception e) {
      onError.invoke(e);
    }
  }

  @ReactMethod
  public void stopAlarm(Callback onSuccess, Callback onError) {
    try {
      AlarmReceiver.stopAlarm(context);
      onSuccess.invoke();
    } catch (Exception e) {
      onError.invoke(e);
    }
  }

  @ReactMethod
  public void cancelAllAlarms(Callback onSuccess, Callback onError) {
    try {
      AlarmScheduler.unscheduleAll(context);
      onSuccess.invoke();
    } catch (Exception e) {
      onError.invoke(e);
    }
  }

  @ReactMethod
  public void isRinging(Callback onSuccess, Callback onError) {
    try {
      boolean isRinging = AlarmReceiver.isRinging();
      onSuccess.invoke(isRinging);
    } catch (Exception e) {
      onError.invoke(e);
    }
  }
}