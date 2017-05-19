#!/usr/bin/python
# -*- coding: utf-8 -*- 
import sys, os
import re

from fontTools.ttLib import TTFont

tmpl = "export default {%s}"
class IconfontTools(object):
    @staticmethod
    def to_json(fontFile):
        font = TTFont(fontFile)
        glyphMap = font["cmap"].getcmap(3, 1).cmap
        tmp = ""
        tmpK = ''
        for k in glyphMap:
            key = glyphMap[k]
            if(key.find('.') > -1):
                continue
            tmpK='%s%s' %('icon-',key)
            # k是值
            tmp += '"%s":%s,' % (tmpK,k)

        return tmp

def showHelp():
	print """
Iconfont map generator.

usage: 
iconfont-maper <iconfont> <output>      generate map file from iconfont file .
iconfont-maper -h                       show this help.
"""

if __name__ == '__main__':
    # 判断参数数量
    # if len(sys.argv) < 3:
        # showHelp()
        # sys.exit()
    # 显示帮助
    # if len(sys.argv) == 3 and sys.argv[2] == "-h":
        # showHelp()
        # sys.exit()

    # font_path = './font/iconfont.ttf'
    font_path = sys.argv[1]
    # output = './font/result.txt'
    output = sys.argv[2]
    tmp = IconfontTools.to_json(font_path);
    f = file(output, "w+")
    f.write(tmpl % tmp)
    f.close();
    sys.exit()
    # './font/iconfont.css'  './font/iconfont.ttf'  './font/result.txt'