const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/chat-application')
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));