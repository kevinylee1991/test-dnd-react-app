process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var async = require('async');
var fs = require('fs');

var app = express();

var spells = null;

var readJson = (path, cb) => {
  fs.readFile(require.resolve(path), (err, data) => {
    if (err)
      cb(err);
    else
      cb(null, JSON.parse(data));
  })
};

// function naturalCompareByParameter(list, parameter) {
//     return list.sort(function(a, b) {
//         a[parameter] = "" + a[parameter];
//         b[parameter] = "" + b[parameter];
//         var an, ax, bn, bx, nn;
//         ax = [];
//         bx = [];
//         console.log(a[parameter]);
//         a[parameter].replace(/(\d+)|(\D+)/g, function(_, $1, $2) {
//             ax.push([$1 || Infinity, $2 || '']);
//         });
//         b[parameter].replace(/(\d+)|(\D+)/g, function(_, $1, $2) {
//             bx.push([$1 || Infinity, $2 || '']);
//         });
//         while (ax.length && bx.length) {
//             an = ax.shift();
//             bn = bx.shift();
//             nn = an[0] - bn[0] || an[1].localeCompare(bn[1]);
//             if (nn) {
//                 return nn;
//             }
//         }
//         return ax.length - bx.length;
//     });
// };

function alphabetizeObjectsByParameter(list, parameter) {
    list.sort(function(a, b) {
        if (a[parameter].toLowerCase() < b[parameter].toLowerCase()) {
            return -1;
        } else if (a[parameter].toLowerCase() > b[parameter].toLowerCase()) {
            return 1;
        } else {
            return 0;
        }
    });
    return list;
};

function loadSpells() {
    readJson("./dnd-spells.json", function(err, data) {
        // console.log(data);
        _spells = alphabetizeObjectsByParameter(data, 'name');
        spells = _spells;
    });
};

loadSpells();

// Will need to run this commented code to update the 'database'
// function getSpells() {
//     request.get("http://www.dnd5eapi.co/api/spells", function(error, response, body) {
//         body = JSON.parse(body);
//         var spellList = body.results;
//         var detailedSpellList = [];
//         async.each(spellList, function(spell, done) {
//             request.get(spell.url, function(error, response, body) {
//                 body = JSON.parse(body);
//                 detailedSpellList.push(body);
//                 done();
//             });
//         }, function(err) {
//             if (err) {
//                 console.log(err);
//             }
//             spells = detailedSpellList;
//             var spellString = JSON.stringify(spells);
//             fs.appendFile('dnd-spells.json', spellString);
//         });
//     });
// };

// getSpells();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/spells', function(req, res) {

    // var remoteRequest = {
    //     url:     "http://www.dnd5eapi.co/api/spells",
    //     method:  "GET",
    //     headers: {"Content-Type": "application/json"}
    // };

    // request(remoteRequest, function(error, response, body) {
    //     if (error && response) {
    //         res.status(response.statusCode).send(error);
    //     } else {
    //         res.status(response.statusCode).send(body);
    //     }
    // });

    if (spells) {
        res.send(spells);
    } else {
        res.status(500).send("Spells not loaded yet");
    }
});

app.get('/classes', function(req, res) {

    var remoteRequest = {
        url:     "http://www.dnd5eapi.co/api/classes",
        method:  "GET",
        headers: {"Content-Type": "application/json"}
    };

    request(remoteRequest, function(error, response, body) {
        if (error && response) {
            res.status(response.statusCode).send(error);
        } else {
            res.status(response.statusCode).send(body);
        }
    });
});

app.listen(3437, function() {
    console.log('listening on port 3437');
});
