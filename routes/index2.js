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
    app.engine('handlebars', exphbs({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json());


    app.use(express.static('client'));

    app.post('/post-feedback', function (req, res) {
        db.collection('feedbacks').insertOne(req.body);    
        res.redirect('/');
    });

    app.get('/post-feedback', function(req, res) {
        //var collection = req.db.get('feedbacks');
        var fb = db.collection('feedbacks').get
        fb.res.render('messages', obj);
        //collection.find({}, {}, function(err, docs) {
        //    var obj = {
        //      fromDB: docs,
        //      title: "Messages"
        //    }
        //    res.render('messages', obj);
        });
    });
    
    app.listen(2179, () => console.log('App listening on port 2179!'));
});




