package biblegram.app;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Base64;
import java.util.Map;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.HashMap;

public class AlarmPersistenceHelper {
  private Context context;
  private static final String SHARED_PREFS_KEY = "biblegram";
  private static final String DEFINITIONS_KEY = "definitions";

  public AlarmPersistenceHelper(Context context) {
    this.context = context;
  }

  public void storeDefinition(Bundle bundle) {
    ArrayList<HashMap<String, Object>> serializableList = new ArrayList<>();
    
    ArrayList<Bundle> definitions = getAllDefinitions();
    if (definitions == null) { definitions = new ArrayList<>(); }
    definitions.add(bundle);
    
    for (Bundle b : definitions) {
      HashMap<String, Object> hashMap = new HashMap<>();
      for (String key : b.keySet()) { hashMap.put(key, b.get(key)); }
      serializableList.add(hashMap);
    }

    saveDefinitions(serializableList);
  }

  public ArrayList<Bundle> getAllDefinitions() {
    SharedPreferences sharedPreferences = context.getSharedPreferences(SHARED_PREFS_KEY, Context.MODE_PRIVATE);
    String serializedList = sharedPreferences.getString(DEFINITIONS_KEY, "");

    if (serializedList.isEmpty()) {
      return null;
    }

    try {
      ByteArrayInputStream bis = new ByteArrayInputStream(Base64.decode(serializedList, Base64.DEFAULT));
      ObjectInputStream in = new ObjectInputStream(bis);
      ArrayList<HashMap<String, Object>> serializedBundles = (ArrayList<HashMap<String, Object>>) in.readObject();
      ArrayList<Bundle> bundles = new ArrayList<>();

      for (HashMap<String, Object> hashMap : serializedBundles) {
        Bundle bundle = new Bundle();
        
        for (Map.Entry<String, Object> entry : hashMap.entrySet()) {
          if (entry.getValue() instanceof String) { bundle.putString(entry.getKey(), (String) entry.getValue()); } 
          else if (entry.getValue() instanceof Integer) { bundle.putInt(entry.getKey(), (Integer) entry.getValue()); }
        }

        bundles.add(bundle);
      }

      return bundles;
    } catch (IOException | ClassNotFoundException e) {
      e.printStackTrace();
      return null;
    }
  }

  public void removeDefinition(Bundle bundleToRemove) {
    ArrayList<Bundle> definitions = getAllDefinitions();

    if (definitions != null) {
      int indexToRemove = -1;

      for (int i = 0; i < definitions.size(); i++) {
        Bundle bundle = definitions.get(i);

        if (bundle != null && bundle.getInt("index") == bundleToRemove.getInt("index")) {
          indexToRemove = i;
          break;
        }
      }

      if (indexToRemove != -1) {
        definitions.remove(indexToRemove);
        ArrayList<HashMap<String, Object>> serializableList = new ArrayList<>();
          
        for (Bundle b : definitions) {
          HashMap<String, Object> hashMap = new HashMap<>();
          for (String key : b.keySet()) { hashMap.put(key, b.get(key)); }
          serializableList.add(hashMap);
        }
        saveDefinitions(serializableList);
      }
    }
  }

  public void clearDefinitions() {
    SharedPreferences sharedPreferences = context.getSharedPreferences(SHARED_PREFS_KEY, Context.MODE_PRIVATE);
    sharedPreferences.edit().remove(DEFINITIONS_KEY).apply();
  }

  public int getNextIndex() {
    ArrayList<Bundle> definitions = getAllDefinitions();

    if (definitions == null || definitions.isEmpty()) {
      return 0;
    } 
    
    else {
      int maxIndex = -1;

      for (Bundle bundle : definitions) {
        if (bundle != null && bundle.containsKey("index")) {
          int currentIndex = bundle.getInt("index");
          if (currentIndex > maxIndex) { maxIndex = currentIndex; }
        }
      }

      return maxIndex + 1;
    }
  }

  private void saveDefinitions(ArrayList<HashMap<String, Object>> serializableList) {
    ByteArrayOutputStream bos = new ByteArrayOutputStream();

    try {
      ObjectOutputStream out = new ObjectOutputStream(bos);
      out.writeObject(serializableList);
      out.flush();
      byte[] byteArray = bos.toByteArray();
      String serializedList = Base64.encodeToString(byteArray, Base64.DEFAULT);

      SharedPreferences sharedPreferences = context.getSharedPreferences(SHARED_PREFS_KEY, Context.MODE_PRIVATE);
      SharedPreferences.Editor editor = sharedPreferences.edit();
      editor.putString(DEFINITIONS_KEY, serializedList);
      editor.apply();

      for (int i = 0; i < serializableList.size(); i++) {
        HashMap<String, Object> hashMap = serializableList.get(i);
        Bundle bundle = new Bundle();
          
        for (Map.Entry<String, Object> entry : hashMap.entrySet()) {
          if (entry.getValue() instanceof String) { bundle.putString(entry.getKey(), (String) entry.getValue()); } 
          else if (entry.getValue() instanceof Integer) { bundle.putInt(entry.getKey(), (Integer) entry.getValue()); } 
        }
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}