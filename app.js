const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');

const chatRoutes = require('./server/routes/chat.routes');
const db = require('./server/config/database');
const app = express();

var server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || '3000';

io.on('connection', function (socket) {
    socket.on('saveMsg', function (data) {
        io.emit('newMsg', { message: data });
    });
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'false' }));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/chat', chatRoutes);

// If no end points match, catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error');
});

server.listen(port);