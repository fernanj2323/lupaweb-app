const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String, 
    required: true, 
    trim: true, 
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  status:{ 
    type:Boolean
  }
}, {
    timestamps: true
  });


  //const authModel = mongoose.model('Users', userSchema);
  //module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('Users', userSchema);
module.exports = userSchema;



