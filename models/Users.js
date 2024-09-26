const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt')
const { Schema, model, Types } = mongoose;

const userSchema = new Schema({
  _id: Types.ObjectId,
  u_email: {
    type: String,
    require: [true, 'Please enter an email!'],
    unique: true,
    lowercase: true,
    validate: [ isEmail , 'Please enter an valid email!']
  },
  u_password: {
    type: String,
    require: [true, 'Please enter an password!'],
    minlength: [6, 'Mininum password length is 6 characters!'],
  },
});

userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.u_password = await bcrypt.hash(this.u_password, salt)
  next();
});

//static method to login user

userSchema.statics.login = async function(u_email, u_password){
  const user = await this.findOne({u_email});
  if (user){
   
   const auth = await bcrypt.compare(u_password, user.u_password);
   if(auth){
      return user
   }
   throw Error('Incorrect password!')
  }
  throw Error('No account found!')
}

const Users = model('Users', userSchema);

module.exports = Users;