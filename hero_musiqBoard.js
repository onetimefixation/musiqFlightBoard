const apiUrl = 'https://data.vatsim.net/v3/vatsim-data.json';

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });