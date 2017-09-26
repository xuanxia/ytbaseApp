package com.ytbaseapp.tool;

import com.facebook.infer.annotation.OkToExtend;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by kangxiaojian on 2017/9/25.
 */

public class ToolPackage  implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> list=new ArrayList<>();
        list.add(new ToolModule(reactContext));
        return list;
    }

    // deprecated >= RN 0.47.0
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();

    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();

    }
}
