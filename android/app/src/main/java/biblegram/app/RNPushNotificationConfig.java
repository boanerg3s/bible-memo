package biblegram.app;

import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import androidx.core.content.res.ResourcesCompat;
import android.os.Bundle;

class RNPushNotificationConfig {
  private static final String KEY_NOTIFICATION_FIREBASE_DEFAULT_CHANNEL_ID = "biblegram.app.default_notification_channel_id";
  private static final String KEY_NOTIFICATION_DEFAULT_CHANNEL_ID = "biblegram.app.default_notification_channel_id";
  private static final String KEY_NOTIFICATION_FOREGROUND = "biblegram.app.notification_foreground";
  private static final String KEY_NOTIFICATION_COLOR = "biblegram.app.notification_color";

  private static Bundle metadata;
  private Context context;

  public RNPushNotificationConfig(Context context) {
    this.context = context;

    if (metadata == null) {
      try {
        ApplicationInfo applicationInfo = context.getPackageManager().getApplicationInfo(context.getPackageName(), PackageManager.GET_META_DATA);
        metadata = applicationInfo.metaData;
      } catch (PackageManager.NameNotFoundException e) {
        e.printStackTrace();
        metadata = new Bundle();
      }
    }
  }

  private String getStringValue(String key, String defaultValue) {
    try {
      final String value = metadata.getString(key);

      if (value != null && value.length() > 0) {
        return value;
      }
    } catch (Exception e) {
      //
    }

    // Default
    return defaultValue;
  }

  public int getNotificationColor() {
    try {
      int resourceId = metadata.getInt(KEY_NOTIFICATION_COLOR);
      return ResourcesCompat.getColor(context.getResources(), resourceId, null);
    } catch (Exception e) {
      //
    }

    // Default
    return -1;
  }

  public boolean getNotificationForeground() {
    try {
      return metadata.getBoolean(KEY_NOTIFICATION_FOREGROUND, false);
    } catch (Exception e) {
      //
    }

    // Default
    return false;
  }

  public String getNotificationDefaultChannelId() {
    try {
      return getStringValue(KEY_NOTIFICATION_DEFAULT_CHANNEL_ID,
        getStringValue(KEY_NOTIFICATION_FIREBASE_DEFAULT_CHANNEL_ID, "fcm_fallback_notification_channel")
      );
    } catch (Exception e) {
      //
    }
    
    // Default
    return "fcm_fallback_notification_channel";
  }
}