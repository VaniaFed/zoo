const sqlite3 = require('sqlite3').verbose();
const dbName = 'zoo.db';
const db = new sqlite3.Database(dbName);

class Complex {
    static all (cb) {
        db.all('SELECT * FROM complex', cb);
    }

    static find(id, cb) {
        db.all('SELECT * FROM complex WHERE id = ?', id, cb);
    }

    static add(name, heating, reservoir, cb) {
        db.run('INSERT INTO complex VALUES(NULL, ?, ?, ?)', name, heating, reservoir, cb);
    }

    static change(id, name, heating, reservoir, cb) {
        db.run(`UPDATE complex SET name = ?, heating = ?, reservoir = ? WHERE id = ?`,
                name, heating, reservoir, id, cb);
    }

    static delete(id, cb) {
        db.run('DELETE FROM complex WHERE id = ?', id, cb);
    }
}
class Animal {
    static all(cb) {
        db.all('SELECT * FROM animals', cb);
    }

    static add(name, dailyFeed, family, habitat, complexId, cb) {
        db.run('INSERT INTO animals VALUES(NULL, ?, ?, ?, ?, ?)', name, dailyFeed, family, habitat, complexId, cb);
    }

    static change(id, name, dailyFeed, family, habitat, complexId, cb) {
        db.run(`UPDATE animals SET name = ?, dailyFeed = ?, family = ?, habitat = ?, complex_id = ? WHERE id = ?`,
                name, dailyFeed, family, habitat, complexId, id, cb);
    }

    static delete(id, cb) {
        db.run('DELETE FROM animals WHERE id = ?', id, cb);
    }

    // для 1 задания
    static getAllAnimalsOfComplex(complexId, cb) {
        db.all('SELECT * FROM animals WHERE complex_id = ?', complexId, cb);
    }

    // для 2 задания
    static getAnimalsByNameWhereReservoirAndHeating(animalName, cb) {
        db.all('SELECT * FROM animals WHERE name = ? AND complex_id = (SELECT id FROM complex WHERE reservoir = 0 AND heating = 1)', animalName, cb);
    }

    // для 3 задания
    static getQuantityOfAnimalsByFamily(family, cb) {
        db.all('SELECT COUNT(*) FROM animals WHERE family = ?', family, cb);
    }
    
    // для 4 задания 
    static getAllAnimalsInOneReservoir(cb) {
        db.all('SELECT * FROM animals ORDER BY complex_id', cb);
    }
    
    static find(id, cb) {
        db.all('SELECT * FROM animals WHERE id = ?', id, cb);
    }
    // для вывода всех животных в одном помещении просто в cb 
    // currentComplex
    // animals.forEach((animal) => {
    // 
    // })

    // static createAnimal(data, cb) {
    //     const sql = 'INSERT INTO articles(title, content) VALUES (?, ?)';
    //     db.run(sql, data.title, data.content, cb);
    // }

    // static deleteAnimal(id, cb) {
    //     if (!id) return cb(new Error('Please provide an id'));
    //     db.run('DELETE FROM articles WHERE id = ?', id, cb);
    // }
}

module.exports = db;
module.exports.Animal = Animal;
module.exports.Complex = Complex;