const express = require('express');
const mongoose = require('./database/mongoose');
const taskListModel = require('./database/models/task-list');
const taskModel = require('./database/models/task');
const app = express();


/* Setting CORS(cross origin resouce sharing)
backend: //loccalhost:8080
frontend> ///localhost:4200
'express allow request comming from backend only to allow access from frontend or any other IP need to add middleware
 */
app.use((request,response,next)=>{
    response.setHeader("Access-Control-Allow-origin","*");
    response.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, UPDATE, OPTIONS");
    //set to true if we need cookie with request
    // response.setHeader("Access-Control-Allow-Cridentials",true);
    next(); // call next middleware.
})

// app.use(cors()) // 3rd party lib we can use.
app.use(express.json()); //Middleware Every request data comming from browser is in format of json to uderstannd format this is used insted of 3rd party lib like body parsor.

app.get("/tasklist",(request,response)=>{
    taskListModel.find()
    .then((list)=>{
        response.status(200).send(list);
    })
    .catch((error)=>{console.log(error)});
});
app.get("/tasklist/:taskListId",(request,response)=>{
    let taskListId = request.params.taskListId;
    taskListModel.find({_id:taskListId})
    .then((taskList)=>{
        response.status(200).send(taskList);
    })
    .catch((error)=>{
        console.log(error)
    })
})

app.post("/tasklist",(request,response)=>{
    console.log(request.body)
    let taskListObj={"title":request.body.title};
    taskListModel(taskListObj).save()
    .then((list)=>{
        response.status(201).send("TaskList Added Successfully!!!");
    })
    .catch((error)=>{
        console.log(error)
        response.status(400).send("Fail to add TaskList");
    });
});

//put full update , patch partial update
app.patch("/tasklist/:taskListId",(request,response)=>{
    let taskListId = request.params.taskListId;
    taskListModel.findOneAndUpdate({_id:taskListId},{ $set:{title:request.body.title}})
    .then((list)=>{
        response.status(200).send(list);
    })
    .catch((error)=>{
        console.log(error)
    })

})

app.delete("/tasklist/:taskListId",(request,response)=>{
    taskListModel.findByIdAndDelete(request.params.taskListId)
    .then((list)=>{
        response.send(list);
    })
    .catch((error)=>{
        console.log(error)
    })
})
app.delete("/tasklist",(request,response)=>{
    taskListModel.find({"title":request.body.title}).deleteMany()
    .then(()=>{response.send(`${request.body.title} tasklist deleted successfully`)})
    .catch((error)=>{response.send("Fail to delete tasklist.")});
});

//CURD for task

app.get("/tasklist/:taskListId/task",(request,response)=>{
    taskModel.find({_ListId:request.params.taskListId})
    .then((list)=>{
        response.status(200).send(list);
    })
    .catch((error)=>{
        console.log(error)
    })
});

app.get("/tasklist/:taskListId/task/:taskId",(request,response)=>{
    let taskListId = request.params.taskListId;
    let taskId = request.params.taskId;
    taskModel.find({_id:taskId,_ListId:taskListId})
    .then((task)=>{
        response.status(200).send(task);
    })
    .catch((error)=>{
        console.log(error);
    })
})

app.post("/tasklist/:taskListId/task",(request,response)=>{
    let task = request.body.taskModel;
    taskModel(task).save()
    .then((task)=>{
        response.status(201).send(task);
    })
    .catch((error)=>{
        console.log(error)
    })
});

app.patch("/tasklist/:taskListId/task/:taskId",(request,response)=>{
    taskModel.findByIdAndUpdate({_id:request.params.taskId,_ListId:request.params.taskListId},{$set:{completed:request.body.completed}})
    .then((task)=>{
        response.status(201).send(task)
    })
    .catch((error)=>{
        console.log(error)
    })

})

app.put("/tasklist/:taskListId/task/:taskId",(request,response)=>{
    taskModel.findByIdAndUpdate({_id:request.params.taskId,_ListId:request.params.taskListId},{$set:request.body.taskModel})
    .then((task)=>{
        response.status(201).send(task)
    })
    .catch((error)=>{
        console.log(error)
    })

})

app.delete("/tasklist/:taskListId/task/:taskId",(request,response)=>{
    taskModel.findByIdAndDelete({_id:request.params.taskId, _ListId:request.params.taskListId})
    .then((task)=>{
        response.status(201).send(task);
    })
    .catch((error)=>{
        console.log(error)
    })
})

app.listen(3000,()=>{
    console.log("app running on port 3000")
})