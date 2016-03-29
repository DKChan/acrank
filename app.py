from multiprocessing import Pool
import json, os, asyncio, aiohttp
import parser

POOL_NUM = 4
menuList = []
dateList = []
sem = asyncio.Semaphore(10)
loop = asyncio.get_event_loop()

baseURL = 'http://www.acfun.tv/dynamic/channel/1.aspx?channelId=%d&orderBy=9&startDate=%d&endDate=%d&pageSize=20'
FILE_PATH = './data/%d/%s.json'
DIR_PATH = '/home/dk/acrank/data/%d'

def save(pageid, datetime, data):
    # save in file
    try:
        with open(FILE_PATH%(pageid, datetime), 'w') as f:
            f.write(json.dumps(data, ensure_ascii=False))
    except Exception as err:
        print('in save : ', err)
    # print('test in save function 2')

async def getPage(pageid, date):
    # print('test in get page 1')
    url = baseURL%(pageid, date['start'], date['end'])
    if os.path.exists(FILE_PATH%(pageid, date['datetime'])) == True:
        return 
    # get web site
    await sem.acquire()
    try:
        with aiohttp.ClientSession() as session:
            async with (await  session.get(url)) as resp:
                if resp.status >= 400:
                    print('bad link!')
                else:
                    data = await resp.text(encoding='utf-8')
    except Exception as err:
        print('in getPage : ', err)
    sem.release()
    #print('test in get page 2')
    # save data
    parsedData = parser.parse(data)
    save(pageid, date['datetime'], parsedData)
    #print('test in get page 3')

def crawl(pageid, loop):
    # create a directory
    # print('test1')
    try:
        os.mkdir(DIR_PATH%pageid, 0o744)
    except Exception as err:
        pass
    # print('test running for %s'%pageid)
    print('Begin to run %s task'%pageid)
    # print("tasks : ", tasks)
    try:
        tasks = [getPage(pageid, date) for date in dateList ]
        loop.run_until_complete(asyncio.wait(tasks))
    except Exception as err:
        print('in crawl : ', err)
    print('the %s is completed!'%pageid)

def lauch(pList):
    print(pList)
    try:
        for item in pList:
            crawl(item, loop)
    except Exception as err:
        print('in lauch : ', err)

if __name__ == '__main__':
    try:
        with open('menuList.json', 'r') as f:
            menuList = json.load(f)
        with open('dateList.json', 'r') as f:
            dateList = json.load(f)
    except Exception as err:
        print(err)
    # print(dateList)
    # test
    # menuList = [100, 110, 111]
    # dateList.append({'start': 1456761600000, 'end': 1459440000000, 'datetime': "20160301-20160401"})
    print('begin to get pages')
    # print('menu list : ', menuList)
    # print('date list : ', dateList)
    pool = Pool(POOL_NUM)
    menuLen = len(menuList)
    for i in range(POOL_NUM):
        left = i * menuLen//POOL_NUM
        right = (i+1) * menuLen//POOL_NUM
        pool.apply_async(lauch, args=(menuList[left:right], ))
    pool.close()
    pool.join()
    loop.close()
    print('already done!')