import os

rootPath = './data'

for root, dirs, files in os.walk(rootPath):
    # print(root)
    for _dir in dirs:
        try:
            int(_dir)
            flen = len(os.listdir(os.path.join(rootPath, _dir)))
            if flen != 39:
                print(_dir, 'is wrong  number : ', flen)
        except Exception as err:
            pass