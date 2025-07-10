
# Medicine App

Nje web aplikacion ku te lejon me menagju kliniken apo spitalin tend.
Mund te menagjosh doktor, pacienta, referues, njesi organizative, terminet dhe oraret e doktoreve poashtu te printosh edhe raporte te ndryshme
## E rendesishme duhet lexuar

Me posht gjeni te gjitha informatat kryesore si:
- strukturen e projektit
- gjuhet programuese te perdorura deri tani ne kete projekt

eshte mire qe te jet struktura e njejt e files dhe folders qe krijohen ne te ardhmen qe te mos ket probleme per ta kuptuar strukturen e projektit por ta kemi te gjithe nje struktur qe e vazhdojm projektin sipas asaj strukture deri ne fund.
## Struktura e projektit

FILES:

- index.js file i cili eshte kryesori per te ber run serverin aty.

- db.js file i cili permban lidhjen me databaze.

- middlewares.js file i cili perfshin te gjitha middlewares qe duhet te perdoren ne routes te ndryshme ose mund te ket edhe ndonje middleware qe duhet te perdoret ne qdo route

- .env file i cili permban enviroment variables te ndryshme te cilat jane konfidenciale prandaj qdo gje konfidenciale duhet te futet ne .env file. 


FOLDERS:
- Views folder permban te gjitha templates te cilat perdoren per frontend ne web aplikacion aty duhet te shenohet frontend-i duke perdorur ejs pra file duhet ta ket .ejs extension dhe jo .html

- Routes folder permban te gjitha rruges (routet) e serverit pra permban routes te dashboard-it si psh: /dashboard /view/doctors /view/patients dhe shume routes te tjer

- Public folder permban te gjitha folderet dhe filet statik si: images, css dhe javascript


## Tech Stack

**Gjuhet programuese te cilat jane perdorur deri tani**: 
* HTML, 
* CSS, 
* JavaScript

**Frameworks:** 
* Bootstrap, 
* Jquery


**Server:** 
- NodeJS dhe ExpressJS
