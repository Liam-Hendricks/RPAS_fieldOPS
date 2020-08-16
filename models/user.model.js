const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User Schema
let UserSchema = new mongoose.Schema({
	 name: {
		type: String,
		required: true
	  },
	  email: {
        type: String,
        unique: true,
		required: true
	  },
	  password: {
		type: String,
		required: true
      },
      role:{
          type:String,
          default:'user'
      },
	
	FieldOPs:{
		type:Schema.Types.Array,
        required: false,
	},
	Events:{
		type:Schema.Types.Array,
        required: false,
	}
      
},{ timestamps: true });
module.exports = mongoose.model('users', UserSchema);