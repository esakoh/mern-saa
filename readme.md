# MERN Sää

Ohjelma näyttää päivän sään ja viiden päivän sääennusteen. Päivän sään voi tallentaa tietokantaan ja tallennetut säätiedot näkyvät säähistoria-sivulla.
Säätiedot haetaan https://openweathermap.org -sivuston API:sta.
Ohjelma vaatii toimiakseen Node.js -ympäristön, jonka voi asentaa täältä: https://nodejs.org/en.

Ohjelma käynnistyy paikallisesti komennolla: npm run dev.

Jotta ohjelma toimii oikein, juurihakemistosta pitää löytyä mongodb URI:n sisältävä .env-tiedosto ja client-kansiosta API:n avaimen sisältävä .env-tiedosto.