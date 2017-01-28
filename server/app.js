var express = require('express');
var request = require('request');

var app = express();

app.use(express.static('public'));

var options = {
    url: '',
    headers: {
        'X-IBM-Client-Id': process.env.WVA_Client_ID,
        'X-IBM-Client-Secret': process.env.WVA_Client_Secret
    }
};

app.all('/wva/*', function(req, res) {
    var url = 'https://api.ibm.com/virtualagent/run/api/v1' + req.url.replace('/wva', '');

    options.url = url;
    req.pipe(request.post(options)).pipe(res);
});

app.listen(process.env.PORT || 3000);