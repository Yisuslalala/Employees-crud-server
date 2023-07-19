const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'yisus',
    host: 'localhost',
    password: '1235',
    database: 'employeeSystem',
});


app.post('/create', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    if (name === '') {
        console.log("There is not name, You can't add a user");
    } else {
        db.query(
            "INSERT INTO employees (name, age, country, position, wage) VALUES (?, ?, ?, ?, ?)", 
            [name, age, country, position, wage], 
            (err, result) =>  {
                if (err) {
                    console.log(err);
                } else {
                    res.send("Values Inserted");
                }
            }
        );
    }
});

app.get("/employees", (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put('/update', (req, res) => {
    id = req.body.id;
    wage = req.body.wage;
    db.query(
        "UPDATE employees SET wage = ? WHERE id = ?", 
        [wage, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.delete("/delete/:id", (req, res) => {
    // console.log(["holi", req, res]);
    const id = req.params.id;
    db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
       if (err) {
        console.log(err);
       } else {
        res.send(result);
       }
    });
})


app.listen(3002, () => {
    console.log("Yey, your server is running on port 3002")
});