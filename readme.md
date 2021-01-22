# MERN Sää

Tämä Full-Stack MERN-sovellus näyttää päivän sään ja viiden päivän sääennusteen. Päivän sään voi tallentaa tietokantaan klikkaamalla "Tallenna"-nappia ja tallennetut säätiedot näkyvät säähistoria-sivulla.

Säätiedot haetaan https://openweathermap.org -sivuston API:sta käyttaäen AJAXin AXIOS-kirjastoa ja ne tallennetaan MongoDB Cloudiin Mongoosea apuna käyttäen.
Sovellus vaatii toimiakseen Node.js -ympäristön, jonka voi asentaa täältä: https://nodejs.org/en.

Riippuvuudet asennetaan komennolla: npm install.
Sovellus käynnistyy paikallisesti komennolla: npm run dev.

Jotta sovellus toimii oikein, juurihakemistosta pitää löytyä mongodb URI:n sisältävä .env-tiedosto ja client-kansiosta API:n avaimen sisältävä .env-tiedosto.