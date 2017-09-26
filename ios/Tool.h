//
//  Tool.h
//  ytbaseApp
//
//  Created by 康小建 on 2017/9/22.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTConvert.h>
#import <React/RCTBridgeModule.h>

@interface Tool : NSObject <RCTBridgeModule>
@property(nonatomic,readonly,retain) NSString    *uniqueIdentifier;
+(NSString *)ret32bitString;
@end

