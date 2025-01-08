// // Import Express and other helpers
// const express = require('express');  // Framework to handle server requests
// const cors = require('cors');  // Allows server to communicate with other websites

// const app = express();  // Set up app
// const PORT = 3000;  // Choose port to run server on

// // Set up middlewares
// app.use(cors());  // Let server talk to other sites
// app.use(express.json());  // Make sure server can read data sent as JSON
// app.use(express.static('public')); // Serve files like images and styles from 'public' folder

// // Store feedback temporarily in memory
// let feedbacks = [];

// // When someone submits feedback form
// app.post('/submit-feedback', (req, res) => {
//   const { name, email, feedback } = req.body;  // Get feedback details from form

//   // Add feedback to temporary storage
//   feedbacks.push({ name, email, feedback });

//   console.log('Feedback received:', { name, email, feedback }); // Log feedback to console

//   // Send thank-you message back to user
//   res.json({ message: 'Thank you for your feedback!' });
// });

// // When asking for all feedbacks
// app.get('/feedback', (req, res) => {
//   res.status(200).json(feedbacks); // Send stored feedback to user
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);  // Message when server is running
// });


//Import Express and other helpers
const express = require('express');  // Framework to handle server requests
const cors = require('cors');  // Allows server to communicate with other websites
const { MongoClient } = require('mongodb'); // MongoDB client for database operations
require('dotenv').config(); // Load environment variables from .env file

const app = express();  // Set up app
const PORT = process.env.PORT || 3000;  // Choose port to run server on

// Set up middlewares
app.use(cors());  // Let server talk to other sites
app.use(express.json());  // Make sure server can read data sent as JSON
app.use(express.static('public')); // Serve files like images and styles from 'public' folder

// MongoDB setup
const uri = process.env.MONGODB_URI; // Read MongoDB URI from environment variables
const dbName = process.env.DB_NAME; // Read database name from environment variables
const feedbackCollection = process.env.COLLECTION_NAME; // Read collection name from environment variables

const client = new MongoClient(uri); // MongoDB client

// Function to connect to MongoDB
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB!');
    return client.db(dbName).collection(feedbackCollection);
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

// Handle feedback form submission
app.post('/submit-feedback', async (req, res) => {
  const { name, email, feedback } = req.body;  // Get feedback details from form

  try {
    const collection = await connectToDatabase();
    await collection.insertOne({ name, email, feedback, timestamp: new Date() }); // Save to MongoDB
    console.log('Feedback saved:', { name, email, feedback });

    // Send thank-you message back to user
    res.json({ message: 'Thank you for your feedback!' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ message: 'Failed to save feedback. Please try again later.' });
  }
});

// Retrieve all feedbacks
app.get('/feedback', async (req, res) => {
  try {
    const collection = await connectToDatabase();
    const feedbacks = await collection.find().toArray(); // Get all feedback from MongoDB
    res.status(200).json(feedbacks); // Send feedbacks to user
  } catch (error) {
    console.error('Error retrieving feedbacks:', error);
    res.status(500).json({ message: 'Failed to retrieve feedbacks. Please try again later.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);  // Message when server is running
});

// //install: node js
// //install web server package: express >npm install express
// var express = require("express");
// var server = express();
// var bodyParser = require("body-parser");
// var path = require("path");

// //web root
// server.use(express.static((__dirname, "bianca")));
// server.use(bodyParser.json());
// server.use(bodyParser.urlencoded());

// var fileUpload = require("express-fileupload");
// server.use(fileUpload({defCharset:'utf8', defParamCharset:'utf8'}));


// var DB = require("nedb-promises");
// var freshmanDB = DB.create(__dirname+"/freshman.db");
// var sophomoreDB = DB.create(__dirname+"/sophomore.db");
// var juniorDB = DB.create(__dirname+"/junior.db");

// freshmanDB.insert([
//     {yt:"https://www.youtube.com/embed/WkOpUqB6i88?si=nY158hPoxn_AuUdI",img:"/images/01-1.jpg",title:"影片1",text:"色彩調和"},
//     {yt:"https://www.youtube.com/embed/2dVzP2tukcM?si=Fl68jVW-_UBlJ0NI",img:"/images/01-2.jpg",title:"影片2",text:"大鯨小怪"},
//     {yt:"https://www.youtube.com/embed/3CDxgZVMOBg?si=h-JWNMU_Jvszk4pd",img:"/images/01-3.png",title:"影片3",text:"魔女宅急變"},
//  ])

// server.get("/freshman", (req,res)=>{
//       //DB
//       freshmanDB.find({}).then(results=>{
//         if(results != null){
//              res.send(results);
//         }else{
//             res.send("Error!");
//         }
//       })
// })

// sophomoreDB.insert([
//     {pic:"img001.JPG",title:"繪圖作品1",text:"排球帥帥圖"},
//                 {pic:"img002.JPG",title:"繪圖作品2",text:"蕉蕉子的生日賀圖"},
//                 {pic:"img003.JPG",title:"繪圖作品3",text:"舒華大美女"},
//                 {pic:"img004.jpg",title:"繪圖作品4",text:"大一的角色設計"},
//                 {pic:"img005.jpg",title:"繪圖作品5",text:"大一繪話課的動作拆解"},
//                 {pic:"img006.jpg",title:"繪圖作品6",text:"貓貓"},
//                 {pic:"img007.gif",title:"繪圖作品7",text:"大二的遊戲專題-攻擊"},
//                 {pic:"img008.gif",title:"繪圖作品8",text:"大二的遊戲專題-護盾"},
//                 {pic:"img009.jpg",title:"繪圖作品9",text:"大二動畫製作的小煤炭"},
//                 {pic:"img010.jpg",title:"繪圖作品10",text:"小煤炭離家出走"},
//                 {pic:"img011.png",title:"繪圖作品11",text:"高中創作的角色"},
//                 {pic:"img012.jpg",title:"繪圖作品12",text:"大一基礎設計的色彩調和"}
//  ])

// server.get("/sophomore", (req,res)=>{
//     //DB
//     sophomoreDB.find({}).then(results=>{
//       if(results != null){
//            res.send(results);
//       }else{
//           res.send("Error!");
//       }
//         })
//   })

// juniorDB.insert([
//     {view:"img014.jpg",title:"一點點3D-1",text:"檯燈渲染-1"},
//     {view:"img015.jpg",title:"一點點3D-2",text:"檯燈渲染-2"},
//     {view:"img016.jpg",title:"一點點3D-3",text:"海格的家-白膜"},
//     {view:"img017.jpg",title:"一點點3D-4",text:"海格的家-渲染"},
//     {view:"img018.jpg",title:"一點點3D-5",text:"水壺渲染"},
//     {view:"img019.jpg",title:"一點點3D-6",text:"武器渲染"},
//  ])

//     server.get("/junior", (req,res)=>{
//         //DB
//         juniorDB.find({}).then(results=>{
//           if(results != null){
//                res.send(results);
//           }else{
//               res.send("Error!");
//           }
//         })
//   })


// server.listen(80, ()=>{
//     console.log("Server is running at port 80.");
// })
// server.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '/bianca/index.html'));
// });