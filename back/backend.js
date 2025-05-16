const database = require('mysql2');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
console.log(process.env) 
app.use(cors());

app.use(express.json());

const sitedata = database.createConnection({

    host: process.env.Host,
    user: process.env.User,
    password:process.env.Password,
    database: process.env.Database,

});


app.get('/navbarimg', function (req, res) {
    sitedata.query('SELECT * FROM navbarimg', function (error, result) {
        if (error) {
            console.log('navbar img error')
        } else {
            res.status(200).json(result)
        }
    })
});


app.post('/listFilim', function (req, res) {
    const { eventListHorror } = req.body;
    console.log(eventListHorror)


    sitedata.query('SELECT * FROM catagory WHERE filim_listName = ?', [eventListHorror], function (error, result) {

        if (error) {
            console.log('category error')
        } else {
            res.status(200).json(result)
        }
    })



})



app.get('/cardimg', function (req, res) {
    sitedata.query('SELECT * FROM filim_list', function (error, result) {
        if (error) {
            console.log('card img error')
        } else {
            res.status(200).json(result)
        }
    })
})



app.listen(process.env.PORT);