#!/usr/bin/python
# -*- coding: utf-8 -*- 
import sys, os
import re

from fontTools.ttLib import TTFont

tmpl = "export default {%s}"
class IconfontTools(object):
    @staticmethod
    def css_file_to_map(file_path):
        file_object = open(file_path)
        obj = {}
        for line in file_object:
            res = IconfontTools.to_key_value_arr(line)
            obj['uniE'+res[1].upper()] = res[0]
        return obj

    @staticmethod
    def to_key_value_arr(file_line):
        # '.icon-close:before { content: "\\e601"; }'
        pattern = re.compile(".([\d\D]*):before { content: \"\\\e([\d\D]*)\"([\d\D]*)")
        # 'forum/135/topic/794150'
        res = pattern.search(file_line).groups()
        return res

    @staticmethod
    def to_json(fontFile,map):
        font = TTFont(fontFile)
        glyphMap = font["cmap"].getcmap(3, 1).cmap
        tmp = ""
        for k in glyphMap:
            key = glyphMap[k]
            print key

            if key in map:
                tmp += '"%s":%s,' % (map[key], k)

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

    # file_path = './font/iconfont.css'
    file_path = sys.argv[1]
    # font_path = './font/iconfont.ttf'
    font_path = sys.argv[2]
    # output = './font/result.txt'
    output = sys.argv[3]
    map = IconfontTools.css_file_to_map(file_path)
    tmp = IconfontTools.to_json(font_path,map);
    f = file(output, "w+")
    f.write(tmpl % tmp)
    f.close();
    sys.exit()
    # './font/iconfont.css'  './font/iconfont.ttf'  './font/result.txt'