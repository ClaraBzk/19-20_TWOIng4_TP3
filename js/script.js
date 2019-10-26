
// Fonction appelée lors du click du bouton
function start() {
  city = document.getElementById('city-input').value;
  if(city === ""){ city=undefined;}

  // Création de l'objet apiWeather
  const apiWeather = new API_WEATHER(city);

  // Appel de la fonction fetchTodayForecast

  apiWeather
    .fetchTodayForecast()
    .then(function(response) {
      // Récupère la donnée d'une API
      const data = response.data;

      // On récupère l'information principal
      const main = data.weather[0].main;
      const description = data.weather[0].description;
      const temp = data.main.temp;
      const icon = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);

      // Modifier le DOM
      document.getElementById('today-forecast-main').innerHTML = main;
      document.getElementById('today-forecast-more-info').innerHTML = description;
      document.getElementById('icon-weather-container').innerHTML = icon;
      document.getElementById('today-forecast-temp').innerHTML = `${temp}°C`;
      
    })
    .catch(function(error) {
      // Affiche une erreur
      console.error(error);
    });





      apiWeather.getThreeDayForecast().then(function(response) {
        const data2 = response.data;
  
        // On récupère l'information principale
        let jour = 0;
        data2.list.forEach((data2, index) => {
          jour++;
          document.getElementById(`${jour}-forecast-main`).innerHTML = data2.weather[0].main;
          document.getElementById(`${jour}-forecast-more-info`).innerHTML = data2.weather[0].description;
          document.getElementById(`${jour}-icon-weather-container`).innerHTML = apiWeather.getHTMLElementFromIcon(data2.weather[0].icon);
          document.getElementById(`${jour}-forecast-temp`).innerHTML = `${data2.temp.day}°C`;
  
        });

  
      });
      
  
}

