const https = require('https');

const apiUrl = 'https://data.vatsim.net/v3/vatsim-data.json';

https.get(apiUrl, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      const jsonData = JSON.parse(data);
      console.log(jsonData);
    } catch (err) {
      console.error(err);
    }
  });
}).on('error', (err) => {
  console.error(err);
});
