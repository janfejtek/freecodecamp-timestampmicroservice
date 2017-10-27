var express = require('express');
var strftime = require('strftime');
var app = express();


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:value", function (request, response) {
  var date = NaN;
  var value = request.params.value;
  if (value === "0" || parseInt(value, 10)) {
    if (+value >= 0) {
      date = new Date();
      date.setTime(+value);
    }
  } else if (!isNaN(Date.parse(value))) {
    date = new Date();
    date.setTime(Date.parse(value));
  }
  if (isNaN(date)) {
    response.send({'unix': null, 'natural': null})
  } else {
    response.send({'unix': date.getTime(), 'natural': strftime('%B %d, %Y', date)})
  }
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
