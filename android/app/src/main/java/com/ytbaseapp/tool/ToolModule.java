/**
 * Created by kangxiaojian on 2017/9/25.
 */

package com.ytbaseapp.tool;

import android.os.Environment;
import android.os.Handler;
import android.os.Looper;
import android.text.TextUtils;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import java.io.File;

import top.zibin.luban.Luban;
import top.zibin.luban.OnCompressListener;


public class ToolModule extends ReactContextBaseJavaModule {
    public static ReactApplicationContext reactApplicationContext;
    public static final String moduleName = "Tool";

    private static Handler  mHandler = new Handler(Looper.getMainLooper());
    public ToolModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactApplicationContext = reactContext;
    }

    @Override
    public String getName() {
        return moduleName;
    }

    @ReactMethod
    public void compressImage(String imgPath, final Promise promise) {
        if (Environment.MEDIA_MOUNTED.equals(Environment.getExternalStorageState())){
           String trargetPath = Environment.getExternalStorageDirectory().getAbsolutePath();
           File file = new File(trargetPath,"/lubanTmp");
           if (!file.exists()){
               file.mkdirs();
           }

           if (TextUtils.isEmpty(imgPath)){
               return;
           }
           String format = imgPath.substring(imgPath.lastIndexOf("."));
           File tmpFile = new File(file,System.currentTimeMillis()+format);
           Luban.with(reactApplicationContext)
                   .load(imgPath)                                   // 传人要压缩的图片列表
                   .ignoreBy(100)                                  // 忽略不压缩图片的大小
                   .setTargetDir(file.getAbsolutePath())                        // 设置压缩后文件存储位置
                   .setCompressListener(new OnCompressListener() {
                       @Override
                       public void onStart() {
                           // TODO 压缩开始前调用，可以在方法内启动 loading UI
                       }

                       @Override
                       public void onSuccess(final File file) {
                           // TODO 压缩成功后调用，返回压缩后的图片文件
                           mHandler.post(new Runnable() {
                               @Override
                               public void run() {
                                   promise.resolve(file.getAbsolutePath());
                               }
                           });
                       }
                       @Override
                       public void onError(Throwable e) {
                           // TODO 当压缩过程出现问题时调用
                       }
                   }).launch();    //启动压缩
       }
    }

    @ReactMethod
    public void delFileByPath(String filePath){
        if (!TextUtils.isEmpty(filePath)){
            File file = new File(filePath);
            if (file.exists()){
                file.delete();
            }
        }
    }

}
