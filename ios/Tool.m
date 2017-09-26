//
//  Tool.m
//  ytbaseApp
//
//  Created by 康小建 on 2017/9/22.
//  Copyright © 2017年 Facebook. All rights reserved.
//

//
//  YTTools.m
//  ytmallApp
//
//  Created by xpswf on 2016/10/27.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "Tool.h"
#import <UIKit/UIKit.h>
#import <React/RCTEventDispatcher.h>
#import <React/RCTBridge.h>
#import <Photos/Photos.h>


#import<AVFoundation/AVCaptureDevice.h>
#import<AVFoundation/AVMediaFormat.h>
#import<AssetsLibrary/AssetsLibrary.h>
#import<CoreLocation/CoreLocation.h>


@interface Tool()
@property (nonatomic,copy)NSString *images;
@property (nonatomic,assign)BOOL isOk;
@end
static Tool * instancea = nil;
@implementation Tool
@synthesize bridge = _bridge;
+(NSString *)ret32bitString

{
  
  char data[32];
  
  for (int x=0;x<32;data[x++] = (char)('A' + (arc4random_uniform(26))));
  
  return [[NSString alloc] initWithBytes:data length:32 encoding:NSUTF8StringEncoding];
  
}

RCT_EXPORT_MODULE(Tool);

#pragma mark ===保存图片到相册===
RCT_EXPORT_METHOD(
                  loadImageFinished:(NSString *)image
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  ){
  [[PHPhotoLibrary sharedPhotoLibrary] performChanges:^{
    
    UIImage * images = [UIImage imageWithContentsOfFile:image];
    PHAssetChangeRequest *req = [PHAssetChangeRequest creationRequestForAssetFromImage:images];
    
  }completionHandler:^(BOOL success, NSError * _Nullable error) {
    if (success == YES) {
      resolve(@"Yes");
    }else{
      reject(@"ENOENT", [NSString stringWithFormat:@"ENOENT: no such file or directory, open '%@'", @"上传失败"], nil);
    }
  }];
}

#pragma mark ===图片压缩===
//RCT_EXPORT_METHOD(compressImage:(NSString *)imageName width:(CGFloat )width height:(CGFloat )height quelity:(CGFloat )compressionQuality  resolver:(RCTPromiseResolveBlock)resolve
//                  rejecter:(RCTPromiseRejectBlock)reject){
//  UIImage *img = [UIImage imageWithContentsOfFile:imageName];
//  UIGraphicsBeginImageContext(CGSizeMake(width, height));
//  [img drawInRect:CGRectMake(0, 0, width, height)];
//  UIImage *scaledImage = UIGraphicsGetImageFromCurrentImageContext();
//  UIGraphicsEndImageContext();
//  NSData *imgDataJpg = UIImageJPEGRepresentation(scaledImage, compressionQuality*0.01);
//  
//  //NSString *base64 = [imgDataJpg base64Encoding];
//  //NSArray *events =[[NSArray alloc]initWithObjects:base64, nil];
//  NSString *path_document = NSHomeDirectory();
//  NSString *imagePath = [path_document stringByAppendingString:[Tool ret32bitString]];
//  [imgDataJpg writeToFile:imagePath atomically:YES];
//  resolve(imagePath);
//}
RCT_EXPORT_METHOD(compressImage:(NSString *)imageName  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
   UIImage *img = [UIImage imageWithContentsOfFile:imageName];
   NSData *imgDataJpg = UIImageJPEGRepresentation(img, 0.5);
  
  //NSString *base64 = [imgDataJpg base64Encoding];
  //NSArray *events =[[NSArray alloc]initWithObjects:base64, nil];
   NSString *path_document = NSHomeDirectory();
  NSString  *suffix = [@"." stringByAppendingString: [imageName pathExtension]];
   NSString *imagePath = [path_document stringByAppendingString:[[Tool ret32bitString] stringByAppendingString: suffix]];
   [imgDataJpg writeToFile:imagePath atomically:YES];
   resolve(imagePath);
}


#pragma mark ===删除图片===
RCT_EXPORT_METHOD(delFileByPath:(NSString *)filePath
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
  NSFileManager *manager = [NSFileManager defaultManager];
  BOOL isExist = [manager fileExistsAtPath:filePath];//判断文件是否存在
  if(isExist){
    BOOL sucess = [manager removeItemAtPath:filePath error:nil];
    if(sucess){
      //删除成功
       resolve(@"yes");
    }else{
      resolve(@"no");
      //删除失败
    }
  }
  
}



#pragma mark ===检测用户是否开启消息推送权限===
RCT_EXPORT_METHOD(isNotificationEnabled:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  UIUserNotificationSettings *setting = [[UIApplication sharedApplication] currentUserNotificationSettings];
  if (UIUserNotificationTypeNone == setting.types) {
    //    NSString *isNo = @"No";
    //    NSArray *events =[[NSArray alloc]initWithObjects:isNo, nil];
    //    resolve(events);
    resolve(@"No");
    
  }else{
    //    NSString *isYes = @"Yes";
    //    reject(@"ENOENT", [NSString stringWithFormat:@"ENOENT: no such file or directory, open '%@'", isYes], nil);
    reject(@"ENOENT",@"Yes", nil);
    
  }
}

#pragma mark ===跳转至APP的系统设置界面===
RCT_EXPORT_METHOD(navigator2Setting){
  NSURL * url = [NSURL URLWithString:UIApplicationOpenSettingsURLString];
  if([[UIApplication sharedApplication] canOpenURL:url]) {
    NSURL*url =[NSURL URLWithString:UIApplicationOpenSettingsURLString];
    [[UIApplication sharedApplication] openURL:url];
  }
}

#pragma mark ===检测app运行环境===
RCT_EXPORT_METHOD(isRelease:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  
#ifdef DEBUG
  reject(@"ENOENT",@"debug", nil);
  
#else
  resolve(@"release");
#endif
}

#pragma mark ===检测app运行环境===
RCT_EXPORT_METHOD(detectCameraAuth:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  AVAuthorizationStatus status = [AVCaptureDevice authorizationStatusForMediaType:AVMediaTypeVideo];
  if (status == AVAuthorizationStatusNotDetermined) {
    [AVCaptureDevice requestAccessForMediaType:AVMediaTypeVideo completionHandler:^(BOOL granted) {
      dispatch_async(dispatch_get_main_queue(), ^{
        if (granted) {
          resolve(@"yes");
        }else{
          resolve(@"no");
        }
      });
    }];
  }else if (status == AVAuthorizationStatusAuthorized) {
    resolve(@"yes");
  }else{
    resolve(@"no");
  }
}

@end
