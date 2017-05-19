#!/usr/bin/python
# -*- coding: utf-8 -*- 
import sys, os,shutil

def moveFileto(sourceDir,  targetDir):
    shutil.copy(sourceDir,  targetDir)

if __name__ == '__main__':
    if os.path.exists(sys.argv[1]):
        moveFileto(sys.argv[1],sys.argv[2]);
    else:
        print "Font file not found."
