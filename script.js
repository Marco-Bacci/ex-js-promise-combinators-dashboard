async function fetchJson(url) {
  const response = await fetch(url);
  const obj = await response.json();
  return obj;
}

async function getDashboardData(query) {
  const destinationsProm = fetchJson(
    `http://localhost:3333/destinations/?search=${query}`
  );
  const weathersProm = fetchJson(
    `http://localhost:3333/weathers?search=${query}`
  );
  const airportsProm = fetchJson(
    `http://localhost:3333/airports?search=${query}`
  );

  const [destinations, weathers, airports] = await Promise.all([destinationsProm, weathersProm, airportsProm]);

 
  return {
    city: destinations[0].name,
    country: destinations[0].country,
    temperature: weathers[0].temperature,
    weather: weathers[0].weather_description,
    airport: airports[0].name,
  };
}

getDashboardData("London").then((data) => {
  console.log("data:", data);
});
