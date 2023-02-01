var express = require("express")
var app = express()
var cors = require("cors")
let projectCollection;


app.use(express.static(__dirname+'/public'))

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cors())

//mongoDB action

const MongoClient = require('mongodb').MongoClient;

//add database connection

const uri = 'mongodb+srv://96azma:Azmah1996@cluster0.hk8jelx.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, {useNewUrlParser: true})

// insert project...​

const insertProjects = (project,callback) => {
    projectCollection.insert(project,callback);
}

const getProjects = (callback) => {
    projectCollection.find({}),toArray(callback);
}

const createCollection = (collectionName) => {
    client.connect((err,db) => {
        projectCollection = client.db().collection(collectionName);

        if(!err) {
            console.log('MongoDB Connected')
        }
        else {

            console.log("DB Error: ", err);
            process.exit(1);
        }
    })
}

const cardList = [

    {

        title: "Kitten 2",

        image: "images/img-01.jpg",

        link: "About Kitten 2",

        desciption: "Demo desciption about kitten 2"

    },

    {

        title: "Kitten 3",

        image: "images/img-01.jpg",

        link: "About Kitten 3",

        desciption: "Demo desciption about kitten 3"

    }

]

app.get('/api/projects',(req,res) => {
    getProjects((err, result) => {
        if(err){
            res.json({statusCode: 400, message: err})
        }
        else{
            res.json({statusCode: 200, message: "Success", data: result})
        }
    })

})

app.post('/api/projects',(req,res) => {
    console.log("New Project added", req.body)
    var newProject = req.body;

    insertProjects(newProject,(err,result) => {
        if(err) {
            res.json({statusCode: 400, message: err})
        }
        else {
            res.json({statusCode: 200, message:"Project Successfully added", data: result})
            }
    })
})

var port = process.env.port || 4000;

app.listen(port,()=>{
    console.log("App listening to: http://localhost:"+port)
    createCollection("pets")
})