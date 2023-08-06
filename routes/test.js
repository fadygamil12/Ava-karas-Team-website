const request = require('request');

const options = {
  method: 'POST',
  url: 'https://telesign-telesign-voice-verify-v1.p.rapidapi.com/voice-verify',
  qs: {
    phone_number: '+201279792658',
    verify_code: '1545'
  },
  headers: {
    'X-RapidAPI-Key': '0579fa4f90msh17d3e75fa96475bp1d6336jsn34b5fe4b789a',
    'X-RapidAPI-Host': 'telesign-telesign-voice-verify-v1.p.rapidapi.com'
  }
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);

	console.log(body);
});