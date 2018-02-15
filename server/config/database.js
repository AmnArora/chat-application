const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://testuser:testpassword@ds237808.mlab.com:37808/chat-application')
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));