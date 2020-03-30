const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectionString =
    "mongodb+srv://semana:semana@cluster0-pligr.mongodb.net/test?retryWrites=true&w=majority"
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(connectionString, connectionParams);

//socket middleware
app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, "..", "uploads", "resized")));

app.use(require('./routes'));

server.listen(3333);