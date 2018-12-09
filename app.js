const express = require('express');
const app = express();
app.set('view engine', 'ejs');

const port = process.env.port || 8080;
app.set('port', port);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static(__dirname + '/public'));

app.use(
    '/public/css/bootstrap.css',
    express.static('node_modules/bootstrap/dist/css/bootstrap.css')
);

const read = require('node-readability');

const db = require('./models/db').db;
const Animal = require('./models/db').Animal;
const Complex = require('./models/db').Complex;


const requests = [
    {
        text: 'Суточное потребление корма обитателями комплекса \'приматы\''
    },
    {
        text: 'Выбрать случаи размножения животного вида \'карликовый гиппопотам\' в помещении без водоема'
    },
    {
        text: 'Определить общую численность представителей семейства \'псовые\' в зоопарке'
    },
    {
        text: 'Вывести все пары видов, которые содержатся в одном помещении'
    },
];

// REST-совместимый API

// add new animal.
// app.post('/animals', (req, res, next) => {
//     const url = req.body.url;
//     console.log(req.body);
//     read(url, (err, result) => {
//         if (err || !result) res.status(500).send('Error downloading article');
//         Article.create(
//             { title: result.title, content: result.content },
//             (err, article) => {
//                 if (err) return next(err);
//                 res.send('OK');
//             }
//         );
//     });
// });

app.get('/', (req, res, err) => {
    res.redirect('/animals');
});

app.get('/animals', (req, res, err) => {
    Animal.all((err, animals) => {
        if (err) return next(err);
        res.render('animals', { animals: animals});
    });
});

app.get('/animal/:id', ((req, res, next) => {
    const id = req.params.id;
    Animal.find(id, (err, animal) => {
        if (err) return next(err);
        res.render('animal', { animal: animal[0]});
    });
}));

app.get('/animals/delete/:id', (req, res, err) => {
    const id = req.params.id;
    Animal.delete(id, (err) => {
        res.redirect('/animals');
    });
});

app.post('/animals/change', (req, res, err) => {
    const
        id = req.body.id,
        name = req.body.name,
        dailyFeed = req.body.dailyFeed,
        family = req.body.family,
        habitat = req.body.habitat,
        complex_id = req.body.complex_id;

    Animal.change(id, name, dailyFeed, family, habitat, complex_id, () => {
        res.send('Ok');
    });
});
app.get('/complexes', (req, res, err) => {
    Complex.all((err, complexes) => {
        res.render('complexes', { complexes: complexes });
    });
});

app.get('/complexes/:id', (req, res, err) => {
    const id = req.params.id;
    Complex.find(id, (err, complex) => {
        res.render('complexes', { complexes: complex });
    });
});
// check

app.get('/request', (req, res, err) => {
    res.render('requests', { requests: requests });
});

app.get('/request/:id', (req, res, err) => {
    const id = req.params.id;
    switch (+id) {
        case 0: {
            Animal.getAllAnimalsOfComplex(1, (err, animals) => {
                let dailyFeedOfAllTheAnimals = 0;
                animals.forEach((animal) => {
                    dailyFeedOfAllTheAnimals += animal['dailyFeed'];
                });
                res.render('requests', { requests: requests, result: ` Суточное потребление
                корма обитателями комплекса приматы: ${dailyFeedOfAllTheAnimals}` });
            });
            break;
        }
        case 1: {
            const name = 'Карликовый гиппопотам';
            Animal.getAnimalsByNameWhereReservoirAndHeating(name, (err, animals) => {
                res.render('animals', { animals: animals })
            });
            break;
        }
        case 2: {
            const family = 'Псовые';
            Animal.getQuantityOfAnimalsByFamily(family, (err, quantityAnimals) => {
                console.log(quantityAnimals[0]['COUNT(*)'])
                res.render('requests', {
                    requests: requests, 
                    result:`Общая численность представителей семейства \'псовые\': ${quantityAnimals[0]['COUNT(*)']}`
                })
            });
            break;
        }
        case 3: {
            Animal.getAllAnimalsInOneReservoir((err, animals) => {
                console.log(animals)
                res.render('animals', { animals: animals });
            });
            break;
        }
    }
});

app.get('/complexes/delete/:id', (req, res, err) => {
    const id = req.params.id;
    Complex.delete(id, (err) => {
        res.redirect('/complexes');
    });
});

app.listen(port, () => {
    console.log(`Express app available at localhost: ${app.get('port')}`);
});


module.exports = app;
module.exports.express = express;


/*
    1. getAllAnimalsOfComplex(0, (err, animals) => {
        let sumFeed = 0;
        animals.forEach((animal) => {
            sumFeed += animal.feed; // или не feed
        });
        вывод на стр
    });

    2. Получить всех животных с именем карликовый гиппопотам где помещение без водоема
        1. Получить id всех комплексов с резервуаром
        2. Выбрать всех карликовых гиппопотамов с reservoir_id = id
*/