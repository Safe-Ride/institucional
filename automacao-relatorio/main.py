from os import environ
from selenium import webdriver
from selenium.common import TimeoutException, ElementNotInteractableException
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys


chrome_options = Options()
chrome_options.add_argument("--headless")
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
driver.maximize_window()

commit_message = environ.get("COMMIT_MESSAGE")
commit_author = environ.get("COMMIT_AUTHOR")
commit_author_email = environ.get("COMMIT_AUTHOR_EMAIL")
commit_author_password = environ.get("COMMIT_AUTHOR_PASSWORD")
repository_name = environ.get("REPOSITORY_NAME").split('/')[1]
commit_url = environ.get("COMMIT_URL")

print(f"Autor: {commit_author}\n Email: {commit_author_email}\n Message: {commit_message}\n Repository: {repository_name}\n commit_url: {commit_url}")

driver.get('https://moodle.sptech.school/mod/quiz/view.php?id=30413')

def carregou_elemento_interativo(xpath:str):
    try:
        element = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, xpath)))
        return element
    except TimeoutException:
        print("Timed out waiting for page to load")
    except ElementNotInteractableException:
        print("Element not interactable")
    except Exception as e:
        print(e)


try:
    email = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CSS_SELECTOR,'#username')))
    email.clear()
    email.send_keys(commit_author_email)
    print('Email inserido')

    senha = (WebDriverWait(driver, 10)).until(EC.visibility_of_element_located((By.CSS_SELECTOR, '#password')))
    senha.clear()
    senha.send_keys(commit_author_password)
    print('senha inserida')

    botao = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CSS_SELECTOR,'#loginbtn')))
    botao.click()
    print('login concluido')

    inicio_relatorio = carregou_elemento_interativo('/html/body/div[1]/div[3]/div/div/section/div[1]/div[3]/div/form/button')
    inicio_relatorio.click()
    print('iniciando relatório')

    grupo = carregou_elemento_interativo('/html/body/div[1]/div[3]/div/div/section[1]/div[1]/form/div/div[1]/div[2]/div/div[2]/div[2]/div[10]/input')
    grupo.click()
    print('grupo selecionado')

    proximo = carregou_elemento_interativo('/html/body/div[1]/div[3]/div/div/section[1]/div[1]/form/div/div[2]/input')
    proximo.click()
    print('indo para questão 2')

    explicacao = carregou_elemento_interativo('/html/body/div[2]/div[3]/div/div/section[1]/div[1]/form/div/div[1]/div[2]/div/div[2]/div[1]/div/div[1]/div/div[2]/div')
    escrever = ActionChains(driver)
    escrever.click(explicacao).key_down(Keys.CONTROL).send_keys('a').key_up(Keys.CONTROL).send_keys(Keys.DELETE).perform()
    escrever.send_keys(f'{repository_name}: {commit_message}').perform()
    print('explicando entrega')

    proximo = carregou_elemento_interativo('/html/body/div[2]/div[3]/div/div/section[1]/div[1]/form/div/div[2]/input[2]')
    proximo.click()
    print('indo para questão 3')

    explicacao = carregou_elemento_interativo('/html/body/div[2]/div[3]/div/div/section[1]/div[1]/form/div/div[1]/div[2]/div/div[2]/div[1]/div/div[1]/div/div[2]/div')
    escrever = ActionChains(driver)
    escrever.click(explicacao).key_down(Keys.CONTROL).send_keys('a').key_up(Keys.CONTROL).send_keys(Keys.DELETE).perform()
    escrever.send_keys(f'{commit_url}').perform()
    print('inserindo evidência')

    proximo = carregou_elemento_interativo('/html/body/div[2]/div[3]/div/div/section[1]/div[1]/form/div/div[2]/input[2]')
    proximo.click()
    print('indo para questão 4')

    explicacao = carregou_elemento_interativo('/html/body/div[2]/div[3]/div/div/section[1]/div[1]/form/div/div[1]/div[2]/div/div[2]/div[1]/div/div[1]/div/div[2]/div')
    escrever = ActionChains(driver)
    escrever.click(explicacao).key_down(Keys.CONTROL).send_keys('a').key_up(Keys.CONTROL).send_keys(Keys.DELETE).perform()

    if "frontend" in repository_name:
        mensagem = "React: desenvolvimento de telas"
    elif "backend" in repository_name:
        mensagem = "Spring boot: desenvolvimento do backend"
    elif "database" in repository_name:
        mensagem = "Mysql: desenvolvimento do banco de dados"
    else:
        mensagem = "terraform: desenvolvemento da infraestrutura"

    escrever.send_keys('Trello: Gestão do Projeto - Kanban').send_keys(Keys.ENTER).send_keys(f'{mensagem}').perform()
    print('respondendo questão 4')

    proximo = carregou_elemento_interativo('/html/body/div[2]/div[3]/div/div/section[1]/div[1]/form/div/div[2]/input[2]')
    proximo.click()
    print('indo para botão de conclusão')

    botao_envio = carregou_elemento_interativo('/html/body/div[1]/div[3]/div/div/section[1]/div[1]/div[3]/div/div/form/button')
    botao_envio.click()

except TimeoutException:
    print("Timed out waiting for page to load")
except ElementNotInteractableException:
    print("Element not interactable")
except Exception as e:
    print(e)
finally:
    driver.quit()
