const mongodb = require('mongodb');
const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

let url = "mongodb://localhost:27017";
let MongoClient = require('mongodb').MongoClient;

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("diamond");

    const app = express();
    app.engine('handlebars', exphbs({defaultLayout: 'main'; extname:'hbs'; layoutsDir: __DiamondExport + '/views/layout'}));
    app.set('view engine', 'handlebars');

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json());

    app.use(express.static('client'));

    app.post('/post-feedback', function (req, res) {
        var feedback = req.body.feedback;
    var collection = req.db.get('diamond');
    collection.insert({"diamond": feedback}, function (err, doc) {
        if (err) {
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.redirect("/client/message")
        }
    });
});

    app.get('/client/message', function(req, res) {
        var collection = req.db.get('diamond');
        collection.find({}, {}, function(err, docs) {
           var obj = {
             fromDB: docs,
             title: "Messages"
           }
           res.render('post-feedback', obj);
        });
    });
    
    app.listen(2179, () => console.log('App listening on port 2179!'));
});




