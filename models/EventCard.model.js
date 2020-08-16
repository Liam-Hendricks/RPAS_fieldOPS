const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Event Schema
let evenCardSchema = new mongoose.Schema({
	name: {
        type: String,
        required: true,
        unique:true
      },
    user:{
        type: String,
        required: true,  
    },
    DateTime:{
        type:String,
        required:true
    },
	 Location:{
        type: String,
        required: true,  
     },
    FieldOpsSelected: 
    {  
         type: String, 
         required: true,  
    },
    ShortDescription:{
        type:String,
        required: true,
    },
    Description:{
        type:String,
        required:true
    },
    Checklist:{
        type:Schema.Types.Array,
        required:false
    },
    Police:{
        type:String,
        required:true
    },
    FireStation:{
        type:String,
        required:true
    },
    Hospital:{
        type:String,
        required:true
    }
},{ timestamps: true });


module.exports = mongoose.model('eventcards', evenCardSchema);