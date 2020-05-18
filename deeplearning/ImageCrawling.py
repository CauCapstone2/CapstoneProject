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
    size = 100

    # Romanesque은 생략

    ImageCrawling("./images/Andy Warhol_pop").crawl("Andy Warhol art", size)
    ImageCrawling("./images/Keith Haring_pop").crawl("Keith Haring art", size)
    ImageCrawling("./images/Richard Hamilton_pop").crawl("Richard Hamilton art", size)
    ImageCrawling("./images/Robert Rauschenberg_pop").crawl("Robert Rauschenberg art", size)
    ImageCrawling("./images/Roy Lichtenstein_pop").crawl("Roy Lichtenstein art", size)
    ImageCrawling("./images/David Hockney_pop").crawl("David Hockney art", size)
    ImageCrawling("./images/Robert Indiana_pop").crawl("Robert Indiana art", size)
    ImageCrawling("./images/James Rosenquist_pop").crawl("James Rosenquist art", size)
    ImageCrawling("./images/Alex Katz_pop").crawl("Alex Katz art", size)
    ImageCrawling("./images/Takashi Murakami_pop").crawl("Takashi Murakami art", size)

    ImageCrawling("./images/Justin Michael Jenkins_pm").crawl("Justin Michael Jenkins art", size)
    ImageCrawling("./images/Robert Rauschenberg_pm").crawl("Robert Rauschenberg art", size)
    ImageCrawling("./images/Johanna Drucker_pm").crawl("Johanna Drucker art", size)
    ImageCrawling("./images/Aydin Aghdashloo_pm").crawl("Aydin Aghdashloo art", size)
    ImageCrawling("./images/Robert Breer_pm").crawl("Robert Breer art", size)
    ImageCrawling("./images/Cleeve Horne_pm").crawl("Cleeve Horne art", size)
    ImageCrawling("./images/Ricky Swallow_pm").crawl("Ricky Swallow art", size)
    ImageCrawling("./images/Jose Bernal_pm").crawl("José Bernal art", size)
    ImageCrawling("./images/William Powhida_pm").crawl("William Powhida art", size)
    ImageCrawling("./images/Donray_pm").crawl("Donray art", size)

    ImageCrawling("./images/Jean-Honore Fragonard_ro").crawl("Jean-Honoré Fragonard art", size)
    ImageCrawling("./images/Francois Boucher_ro").crawl("François Boucher art", size)
    ImageCrawling("./images/Jean-Antoine Watteau_ro").crawl("Jean-Antoine Watteau art", size)
    ImageCrawling("./images/Giovanni Battista Tiepolo_ro").crawl("Giovanni Battista Tiepolo art", size)
    ImageCrawling("./images/Alessandro Magnasco_ro").crawl("Alessandro Magnasco art", size)
    ImageCrawling("./images/Francois Lemoyne_ro").crawl("François Lemoyne art", size)
    ImageCrawling("./images/Antonio Bellucci_ro").crawl("Antonio Bellucci art", size)
    ImageCrawling("./images/Jean-Baptiste-Simeon Chardin_ro").crawl("Jean-Baptiste-Siméon Chardin art", size)
    ImageCrawling("./images/Jean-Marc Nattier_ro").crawl("Jean-Marc Nattier art", size)
    ImageCrawling("./images/Gaetano Gandolfi_ro").crawl("Gaetano Gandolfi art", size)

    # ImageCrawling("./images/Alexander Calder_ki").crawl("Alexander Calder art", size)
    # ImageCrawling("./images/Christian Moeller_ki").crawl("Christian Moeller art", size)
    # ImageCrawling("./images/George Rickey_ki").crawl("George Rickey art", size)
    # ImageCrawling("./images/Jean Tinguely_ki").crawl("Jean Tinguely art", size)
    # ImageCrawling("./images/Jesus Ragael Soto_ki").crawl("Jesus Ragael Soto art", size)
    # ImageCrawling("./images/Naum Gabo_ki").crawl("Naum Gabo art", size)
    # ImageCrawling("./images/Rebecca Horn_ki").crawl("Rebecca Horn art", size)
    # ImageCrawling("./images/Victor_Vasarely_ki").crawl("Victor_Vasarely art", size)
    # ImageCrawling("./images/Vladimir Tatlin_ki").crawl("Vladimir Tatlin art", size)

    # ImageCrawling("./images/Andy Warhol_pop").crawl("Andy Warhol art", size)
    # ImageCrawling("./images/Keith Haring_pop").crawl("Keith Haring art", size)
    # ImageCrawling("./images/Richard Hamilton_pop").crawl("Richard Hamilton art", size)
    # ImageCrawling("./images/Robert Rauschenberg_pop").crawl("Robert Rauschenberg art", size)
    # ImageCrawling("./images/Roy Lichtenstein_pop").crawl("Roy Lichtenstein art", size)
    # ImageCrawling("./images/David Hockney_pop").crawl("David Hockney art", size)
    # ImageCrawling("./images/Robert Indiana_pop").crawl("Robert Indiana art", size)
    # ImageCrawling("./images/James Rosenquist_pop").crawl("James Rosenquist art", size)
    # ImageCrawling("./images/Alex Katz_pop").crawl("Alex Katz art", size)
    # ImageCrawling("./images/Takashi Murakami_pop").crawl("Takashi Murakami art", size)

    # ImageCrawling("./images/Leonardo da Vinci_re").crawl("Leonardo da Vinci art", size)
    # ImageCrawling("./images/Michelangelo_re").crawl("Michelangelo_art", size)
    # ImageCrawling("./images/Raphael_re").crawl("Raphael art", size)
    # ImageCrawling("./images/Donatello_re").crawl("Donatello art", size)
    # ImageCrawling("./images/Sandro Botticelli_re").crawl("Sandro Botticelli art", size)
    # ImageCrawling("./images/Titian_re").crawl("Titian art", size)
    # ImageCrawling("./images/Albrecht Durer_re").crawl("Albrecht Dürer art", size)
    # ImageCrawling("./images/Filippo Brunelleschi_re").crawl("Filippo Brunelleschi art", size)
    # ImageCrawling("./images/Caravaggio_re").crawl("Caravaggio art", size)
    # ImageCrawling("./images/Giotto_re").crawl("Giotto art", size)
    # ImageCrawling("./images/Thomas Cole_rt").crawl("Thomas Cole art", size)
    # ImageCrawling("./images/Francesco Hayez_rt").crawl("Francesco Hayez art", size)
    # ImageCrawling("./images/Ivan Aivazovsky_rt").crawl("Ivan Aivazovsky art", size)
    # ImageCrawling("./images/Theodore Gericault_rt").crawl("Theodore Gericault art", size)
    # ImageCrawling("./images/John Constable_rt").crawl("John Constable art", size)
    # ImageCrawling("./images/William Blake_rt").crawl("William Blake art", size)
    # ImageCrawling("./images/Eugene Delacroix_rt").crawl("Eugene Delacroix art", size)
    # ImageCrawling("./images/Caspar David Friedrich_rt").crawl("Caspar David Friedrich art", size)
    # ImageCrawling("./images/Joseph Mallord William Turner_rt").crawl("Joseph Mallord William Turner art", size)
    # ImageCrawling("./images/Francisco Goya_rt").crawl("Francisco Goya art", size)

    # ImageCrawling("./images/Caravaggio_ba").crawl("Caravaggio art", size)
    # ImageCrawling("./images/Rembrandt_ba").crawl("Rembrandt art", size)
    # ImageCrawling("./images/Gian Lorenzo Bernini_ba").crawl("Gian Lorenzo Bernini art", size)
    # ImageCrawling("./images/Diego Velazquez_ba").crawl("Diego Velázquez art", size)
    # ImageCrawling("./images/Peter Paul Rubens_ba").crawl("Peter Paul Rubens art", size)
    # ImageCrawling("./images/Johannes Vermeer_ba").crawl("Johannes Vermeer art", size)
    # ImageCrawling("./images/Artemisia Gentileschi_ba").crawl("Artemisia Gentileschi art", size)
    # ImageCrawling("./images/Anthony van Dyck_ba").crawl("Anthony van Dyck art", size)
    # ImageCrawling("./images/Guido Reni_ba").crawl("Guido Reni art", size)
    # ImageCrawling("./images/Claudio Coello_ba").crawl("Claudio Coello art", size)

    # ImageCrawling("./images/Cimabue_by").crawl("Cimabue art", size)
    # ImageCrawling("./images/Giotto di Bondone_by").crawl("Giotto di Bondone art", size)
    # ImageCrawling("./images/Duccio di Buoninsegna_by").crawl("Duccio di Buoninsegna art", size)
    # ImageCrawling("./images/Andrei Rublev_by").crawl("Andrei Rublev art", size)
    # ImageCrawling("./images/El Greco_by").crawl("El Greco art", size)
    # ImageCrawling("./images/theophanes the greek_by").crawl("theophanes the greek art", size)
    # ImageCrawling("./images/guido da siena_by").crawl("guido da siena art", size)
    # ImageCrawling("./images/nardo di cione_by").crawl("nardo di cione art", size)
    # ImageCrawling("./images/Paolo Veneziano_by").crawl("Paolo Veneziano art", size)
    # ImageCrawling("./images/margarito d arezzo_by").crawl("margarito d arezzo art", size)
    
    # ImageCrawling("./images/El Greco_ma").crawl("El Greco art", size)
    # ImageCrawling("./images/Pontormo_ma").crawl("Pontormo art", size)
    # ImageCrawling("./images/Parmigianino_ma").crawl("Parmigianino art", size)
    # ImageCrawling("./images/Benvenuto Cellini_ma").crawl("Benvenuto Cellini art", size)
    # ImageCrawling("./images/Jan Brueghel the Elder_ma").crawl("Jan Brueghel the Elder art", size)
    # ImageCrawling("./images/Antonio da Correggio_ma").crawl("Antonio da Correggio art", size)
    # ImageCrawling("./images/Sebastiano del Piombo_ma").crawl("Sebastiano del Piombo art", size)
    # ImageCrawling("./images/Agnolo di Cosimo_ma").crawl("Agnolo di Cosimo art", size)
    # ImageCrawling("./images/Andrea del Sarto_ma").crawl("Andrea del Sarto art", size)
    # ImageCrawling("./images/Daniele da Volterra_ma").crawl("Daniele da Volterra art", size)

    # ImageCrawling("./images/Georgia O Keeffe_mo").crawl("Georgia O Keeffe art", size)
    # ImageCrawling("./images/Jackson Pollock_mo").crawl("Jackson Pollock art", size)
    # ImageCrawling("./images/Henri Matisse_mo").crawl("Henri Matisse art", size)
    # ImageCrawling("./images/Wassily Kandinsky_mo").crawl("Wassily Kandinsky art", size)
    # ImageCrawling("./images/Claude Monet_mo").crawl("Claude Monet art", size)
    # ImageCrawling("./images/Salvador Dali_mo").crawl("Salvador Dali art", size)
    # ImageCrawling("./images/Frida Kahlo_mo").crawl("Frida Kahlo art", size)
    # ImageCrawling("./images/Vincent van Gogh_mo").crawl("Vincent van Gogh art", size)
    # ImageCrawling("./images/Pablo Picasso_mo").crawl("Pablo Picasso art", size)
    # ImageCrawling("./images/David Hockney_mo").crawl("David Hockney art", size)

    # ImageCrawling("./images/Gino Severini_ne").crawl("Gino Severinie art", size)
    # ImageCrawling("./images/Gheorghe Tattarescu_ne").crawl("Gheorghe Tattarescu art", size)
    # ImageCrawling("./images/William-Adolphe Bouguereau_ne").crawl("William-Adolphe Bouguereau art", size)
    # ImageCrawling("./images/Louise Elisabeth Vigee Le Brun_ne").crawl("Louise Élisabeth Vigée Le Brun art", size)
    # ImageCrawling("./images/Albert Henry Krehbiel_ne").crawl("Albert Henry Krehbiel art", size)
    # ImageCrawling("./images/Jean Auguste Dominique Ingres_ne").crawl("Jean Auguste Dominique Ingres art", size)
    # ImageCrawling("./images/Anselm Feuerbach_ne").crawl("Anselm Feuerbach art", size)
    # ImageCrawling("./images/Jacques-Louis David_ne").crawl("Jacques-Louis David art", size)
    # ImageCrawling("./images/Jens Adolf Jerichau_ne").crawl("Jens Adolf Jerichau art", size)
    # ImageCrawling("./images/Alexandre Jacovleff_ne").crawl("Alexandre Jacovleff art", size)

    # ImageCrawling("./images/Justin Michael Jenkins_po").crawl("Justin Michael Jenkins art", size)
    # ImageCrawling("./images/Robert Rauschenberg_po").crawl("Robert Rauschenberg art", size)
    # ImageCrawling("./images/Johanna Drucker_po").crawl("Johanna Drucker art", size)
    # ImageCrawling("./images/Aydin Aghdashloo_po").crawl("Aydin Aghdashloo art", size)
    # ImageCrawling("./images/Robert Breer_po").crawl("Robert Breer art", size)
    # ImageCrawling("./images/Cleeve Horne_po").crawl("Cleeve Horne art", size)
    # ImageCrawling("./images/Ricky Swallow_po").crawl("Ricky Swallow art", size)
    # ImageCrawling("./images/Jose Bernal_po").crawl("José Bernal art", size)
    # ImageCrawling("./images/William Powhida_po").crawl("William Powhida art", size)
    # ImageCrawling("./images/Donray_po").crawl("Donray art", size)

    # ImageCrawling("./images/Jean-Honore Fragonard_po").crawl("Jean-Honoré Fragonard art", size)
    # ImageCrawling("./images/Francois Boucher_po").crawl("François Boucher art", size)
    # ImageCrawling("./images/Jean-Antoine Watteau_po").crawl("Jean-Antoine Watteau art", size)
    # ImageCrawling("./images/Giovanni Battista Tiepolo_po").crawl("Giovanni Battista Tiepolo art", size)
    # ImageCrawling("./images/Alessandro Magnasco_po").crawl("Alessandro Magnasco art", size)
    # ImageCrawling("./images/Francois Lemoyne_po").crawl("François Lemoyne art", size)
    # ImageCrawling("./images/Antonio Bellucci_po").crawl("Antonio Bellucci art", size)
    # ImageCrawling("./images/Jean-Baptiste-Simeon Chardin_po").crawl("Jean-Baptiste-Siméon Chardin art", size)
    # ImageCrawling("./images/Jean-Marc Nattier_po").crawl("Jean-Marc Nattier art", size)
    # ImageCrawling("./images/Gaetano Gandolfi_po").crawl("Gaetano Gandolfi art", size)

    # ImageCrawling("./images/Andre Breton_su").crawl("Andre Breton art", size)
    # ImageCrawling("./images/Jean Arp_su").crawl("Jean Arp art", size)
    # ImageCrawling("./images/Max Ernst_su").crawl("Max Ernst art", size)
    # ImageCrawling("./images/Yves Tanguy_su").crawl("Yves Tanguy art", size)
    # ImageCrawling("./images/Man Ray_su").crawl("Man Ray art", size)
    # ImageCrawling("./images/Andre Masson_su").crawl("Andre Masson art", size)
    # ImageCrawling("./images/Rene Magritte_su").crawl("Rene Magritte art", size)
    # ImageCrawling("./images/Luis Bunuel_su").crawl("Luis Bunuel art", size)
    # ImageCrawling("./images/Leonora Carrington_su").crawl("Leonora Carrington art", size)
    # ImageCrawling("./images/Joan Miro i Ferra_su").crawl("Joan Miró i Ferrà art", size)
