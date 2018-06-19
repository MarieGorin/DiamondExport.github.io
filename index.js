let MongoClient = require('mongodb').MongoClient;
const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
let url = "mongodb://localhost:27017";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("diamond");

    const app = express();
    app.engine('handlebars', exphbs({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json());

    app.use(express.static('client'));

    app.listen(3000, () => console.log('Example app listening on port 3000!'));
});



