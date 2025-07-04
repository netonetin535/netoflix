from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import time

def jogos_globo_agenda():
    url = "https://ge.globo.com/futebol/agenda/"
    
    # Configuração do navegador
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--window-size=1920,1080")

    driver = webdriver.Chrome(options=options)
    driver.get(url)

    time.sleep(5)  # Espera o carregamento do conteúdo JavaScript

    soup = BeautifulSoup(driver.page_source, "html.parser")
    driver.quit()

    # Busca os blocos de jogos na agenda
    jogos = soup.select(".jogo")

    if not jogos:
        print("Nenhum jogo encontrado.")
    else:
        print("Jogos do dia:")
        for jogo in jogos:
            time1 = jogo.select_one(".time.time-a .nome")
            time2 = jogo.select_one(".time.time-b .nome")
            hora = jogo.select_one(".hora")

            if time1 and time2 and hora:
                print(f"- {time1.text.strip()} vs {time2.text.strip()} às {hora.text.strip()}")

if __name__ == "__main__":
    jogos_globo_agenda()
