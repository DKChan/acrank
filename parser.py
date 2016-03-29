from bs4 import BeautifulSoup
import json

def parse(data):
    soup = BeautifulSoup(data, "html.parser")
    # print(soup.prettify())
    ret = []
    try:
        for div in soup.find_all(class_="unit"):
            # print(div.prettify())
            item={}
            fir_a = div.find(class_="thumb")
            videoCode = fir_a['href']
            preViewPicSrc = fir_a.img['src']
            # print(picSrc)
            # print(type(videoCode))
            sec_a = div.find(class_='title')
            title = sec_a.text
            tri_a = div.find(class_='date')
            date = tri_a['title'][4:]
            infoHover = div.find(class_='info-hover')
            playedNum = int(infoHover.find(class_='l').text)
            commentNUm = int(infoHover.find(class_='r').text)
            item['videoCode'] = videoCode
            item['title'] = title
            item['date'] = date
            item['playedNum'] = playedNum
            item['commentNUm'] = commentNUm
            ret.append(item)
    except Exception as err:
        print("in parse : ", err)
    return ret


if __name__ == '__main__':
    with open('./test.html', 'r') as f:
        data = f.read()
        parsed = parse(data)
        #print(parsed)
        print(json.dumps(parsed, ensure_ascii=False))
