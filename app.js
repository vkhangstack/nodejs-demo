const express = require('express');
const bodyParser = require('body-parser');

const Database = require('./db/databse');
const routes = require('./routes/controller');


let app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');

//website routes
app.use('/', routes);

const port = 3001;
app.listen(port, () => {
    console.log("Starting at port ", port);
});