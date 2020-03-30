const express = require('express');
const mongoose = require('mongoose');

const app = express();

const connectionString =
    "mongodb+srv://semana:semana@cluster0-pligr.mongodb.net/test?retryWrites=true&w=majority"
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(connectionString, connectionParams);

app.use(require('./routes'));
app.listen(3333);