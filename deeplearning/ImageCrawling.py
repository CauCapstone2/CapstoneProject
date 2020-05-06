import os
from bs4 import BeautifulSoup
from selenium import webdriver
import urllib
import urllib.request
import random
import time
from selenium.common.exceptions import ElementNotInteractableException


class ImageCrawling:
    def __init__(self, storage, chromedriver="./chromedriver.exe"):
        self._storage = storage
        self._browser = webdriver.Chrome(chromedriver)

    def __page_down(self, maxsize, init_img_num):
        img_cnt = init_img_num

        while img_cnt < maxsize:
            try:
                end = self._browser.find_element_by_xpath("//*[@id='islmp']/div/div/div/div/div[4]/div[2]/div[1]/div")
                if end.text == "더 이상 표시할 콘텐츠가 없습니다.":
                    break
                # break
            except ElementNotInteractableException:
                continue

            self._browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            imgs = self._browser.find_elements_by_class_name("rg_i")
            rnd = random.random()
            print(len(imgs))
            time.sleep(rnd)
            img_cnt = len(imgs)

            try:
                add_result = self._browser.find_element_by_xpath("//*[@id='islmp']/div/div/div/div/div[5]/input")
                add_result.click()
            except ElementNotInteractableException:
                continue

    def __get_imgURLs(self, maxsize):
        imgs = self._browser.find_elements_by_class_name("rg_i")

        srcURL = []
        for i, elem in enumerate(imgs):
            if i + 1 > maxsize:
                break
            srcURL.append(elem.get_property("src"))

        return srcURL

    @staticmethod
    def _save(folder, imgURLs):
        save_dir = folder

        try:
            if not (os.path.isdir(save_dir)):
                os.makedirs(os.path.join(save_dir))
        except OSError as e:
            if e.errno != errno.EEXIST:
                print("Failed to create directory!!!!!")
                raise

        for i, src in zip(range(len(imgURLs)), imgURLs):
            try:
                urllib.request.urlretrieve(src, save_dir + "/" + str(i) + ".png")
                print(i, "saved")
            except ValueError:
                print(src)
                continue

    def crawl(self, keyword, maxsize):
        url = "https://www.google.com/search"
        params = {
            "q": keyword, "tbm": "isch", "sa": "1", "source": "lnms&tbm=isch"
        }
        url = url + "?" + urllib.parse.urlencode(params)

        self._browser.get(url)
        html = self._browser.page_source

        soup_temp = BeautifulSoup(html, 'html.parser')
        img4page = len(soup_temp.findAll("img"))

        self.__page_down(maxsize, img4page)

        srcURL = self.__get_imgURLs(maxsize)
        self._save(self._storage, srcURL)
        self._browser.close()


if __name__ == "__main__":
    size = 1000
    ImageCrawling("./images/Byzantine").crawl("Byzantine Art", size)
    ImageCrawling("./images/Romanesque").crawl("Romanesque Art", size)
    ImageCrawling("./images/Renaissance").crawl("Renaissance art", size)
    ImageCrawling("./images/Mannerism").crawl("Mannerism art", size)
    ImageCrawling("./images/Baroque").crawl("Baroque art", size)
    ImageCrawling("./images/Rococo").crawl("Rococo art", size)
    ImageCrawling("./images/Neoclassicism").crawl("Neoclassicism art", size)
    ImageCrawling("./images/Romanticism").crawl("Romanticism art", size)
    ImageCrawling("./images/Modern").crawl("Modern art", size)
    ImageCrawling("./images/Surrealism").crawl("Surrealism art", size)
    ImageCrawling("./images/postmodern").crawl("postmodern art", size)
    ImageCrawling("./images/Pop").crawl("Pop art", size)
    ImageCrawling("./images/Kinetic").crawl("Kinetic art", size)
