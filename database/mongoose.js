const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // provide overall async support

mongoose.connect('mongodb://127.0.0.1:27017/taskmanagerdb').then(()=>{
    console.log(" Connected to DB Successfully!!!! ")
}).catch((error)=>{
    console.log("Facing error while connected to DB ..... "+ error)
});

module.exports = mongoose;