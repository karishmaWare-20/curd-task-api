const mongoose = require('mongoose');
const TaskListSchema = new mongoose.Schema({
    title: {
        type: String,
        require:true,
        trim:true,
        minLength:3
    }
})

const taskListModel = mongoose.model('TaskList',TaskListSchema);

module.exports = taskListModel;