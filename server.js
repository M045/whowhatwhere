var express = require('express'),
    Yelp = require('yelp'),
    Dodge = require("dodge"),
    app = express();

app.use(express.static(__dirname));

var yelp = new Yelp({
    consumer_key: 'hyIQVkkGLREDsZobyPp5dQ',
    consumer_secret: 'UgKdpO46BHlEOT-3K3MIPilF-Ro',
    token: 'PCPmAjNSEpcZ4T7TFaQ3VKj8-nhhRhWJ',
    token_secret: 'uF-cSlKj9usvzCIjSeVzwR2OcS8'
});

var fourSquare = new Dodge({
    clientId: 'L0JERFYN1AKYQIMXUSCKVK0IH5YM0C5GOAJS1QEPDITS11I0',
    clientSecret: 'NQ1KJHVZZOQI3RF3QKM3XLHSP2AX5IQCPLMNPQ2VPGNMPDSF'
});

function getData(options, callBack) {
    yelp.search({term: options.term, location: options.location})
        .then(function (data) {
            callBack(null, data);
        })
        .catch(function (error) {
            callBack(error);
        });
    fourSquare.venues.search({query: options.term, near: options.location}, function (err, venues) {
        if (err) {
            console.error(err)
        } else {
            console.log(venues);
        }
    });
}

app.get('/search', function (request, response) {
    console.log('params: ', request.query);
    var parameter = request.query;
    getData(parameter, function (err, data) {
        if (err) {
            response.send({error: true});
        } else {
            response.send(data);
        }
    });
});

app.listen(3007);
console.log('3007');