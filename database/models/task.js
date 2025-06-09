const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    _ListId:{
        type: mongoose.Types.ObjectId,
        required: true
    },
    completed : {
        type: Boolean,
        default: false,
        required: true,

    }
});

const taskModel = mongoose.model('TaskModel', TaskSchema);

module.exports = taskModel;