const mongoose = require('mongoose');
const authSchema = require('./auth.model');

authSchema.statics = {

  create: function (data, cb) {
    const user = new this(data);
    user.save(cb);
  },
  login: function (query, cb) {
    this.find(query, cb);
  }, 
  find: function (){
   this.find();
  }
};
//Users es el nombre de la tabla 
const authModel = mongoose.model('Users', authSchema);
module.exports = authModel;