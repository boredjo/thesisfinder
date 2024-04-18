import requests
from bs4 import BeautifulSoup
from bs4 import SoupStrainer
from ollama import Client
from dotenv import load_dotenv
from timeout_decorator import timeout
from utils.db import util_db
from models.idea import Idea
from models.user import User

load_dotenv('.env') # load env if possible

client = Client(host='http://192.168.100.39:11434')

prompt = "{} \n Above is an abstract of a paper. Give me a list of 5 tags that categorize this abstract, that are as generic as possible. Like 'physics', 'electromagnetism'. Only return a numbered list."

@timeout(15)
def ask_llm(abstract):
    response = client.generate(model='phi:chat', prompt=prompt.format(abstract))['response']
    lines = response.split('\n')
    tags= []
    for line in lines[:5]:
        tags.append(line.split('. ')[1].split(' ')[0])
    return tags

def get_tags(abstract):
    result = []
    for _ in range(3):
        try:
            result =  ask_llm(abstract)
            return result
        except TimeoutError:
            print('timeout')
            pass
        except Exception:
            print('caught generic')
            pass
    return result

with open('utils/error.html', 'r') as file:
    error = file.read()

PATH = "https://abstracts.societyforscience.org/Home/FullAbstract?ISEFYears=0%2C&Category=Any%20Category&AllAbstracts=True&FairCountry=Any%20Country&FairState=Any%20State&ProjectId="

def find_abstract(soup):
    for p in soup.find_all('p'):
        if p.text.startswith('Abstract:'): return p.text[9:]
@util_db()
def store_idea(cursor, title, tags, abstract):
    new_idea = Idea(title, tags, User.ANON().name, abstract)
    new_idea.store(cursor)

for i in range(13000, 14000):
    page = requests.get(PATH+str(i))
    if not page.text == error:
        soup = BeautifulSoup(page.text, 'html.parser')
        header = soup.find_all('h2')[1].text
        abstract = find_abstract(soup)
        tags = get_tags(abstract)
        if not tags == []: store_idea(header, tags, abstract)
        print(tags)
    print(f'finished i={i}')


