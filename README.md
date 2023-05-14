# marvel-backend

Comics
Route : /comics
Method : GET
Get a list of comics
Query Info Required
apiKey API key received Yes
limit between 1 and 100 No
skip number of results to ignore No
title search a comic by title No
Ex : https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=YOUR_API_KEY

---

Route : /comics/:characterId
Method : GET
Get a list of comics containing a specific character
Params
Params Info Required
characterId characters mongoDB id Yes
Query
Query Info Required
apiKey API key received Yes
Ex : https://lereacteur-marvel-api.herokuapp.com/comics/5fc8ba1fdc33470f788f88b3?apiKey=YOUR_API_KEY

---

Route : /comic/:comicId
Method : GET
Get all informations of specific comic
Params
Params Info Required
comicId comic mongoDB id Yes
Query
Query Info Required
apiKey API key received Yes
Ex : https://lereacteur-marvel-api.herokuapp.com/comic/5fce13de78edeb0017c92d68?apiKey=YOUR_API_KEY

---

Characters
Route : /characters
Method : GET
Get a list of characters
Query Info Required
apiKey API key received Yes
limit between 1 and 100 No
skip number of results to ignore No
name search a character by name No
Ex : https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=YOUR_API_KEY

---

Route : /character/:characterId
Method : GET
Get a the infos of a specific character
Params
Params Info Required
characterId characters mongoDB id Yes
Query
Query Info Required
apiKey API key received Yes
Ex : https://lereacteur-marvel-api.herokuapp.com/character/5fcf91f4d8a2480017b91453?apiKey=YOUR_API_KEY
