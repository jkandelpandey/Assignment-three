
/*********************************************************************************
*  WEB700 – Assignment 3
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Janaki Kandel Student ID: 155628225 Date: 2024-06-15
*
********************************************************************************/ 


const express = require("express"); // Import Express.js framework
const path = require("path"); // Import path module to handle file paths
const collegeData = require("./collegeData.js"); // Import the module containing college data functions

const app = express(); // Create an Express application instance
const PORT = process.env.PORT || 8080; // Define the port to run the server on, using environment variable or default to 8080


app.get("/", (req, res) => { 
    res.sendFile(path.join(__dirname, "/views/home.html")); // Send the home.html file as the response
});

// Route for the about page
app.get("/about", (req, res) => { 
    res.sendFile(path.join(__dirname, "/views/about.html")); // Send the about.html file as the response
});

// Route for the HTML demo page
app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/htmlDemo.html")); // Send the htmlDemo.html file as the response
});

// Send the about.html file as a response
app.get("/students", (req, res) => { 
    if (req.query.course) {
       
        collegeData.getStudentsByCourse(req.query.course) // Fetch students by course if course query parameter is provided
            .then(data => {
                res.json(data); // Send the student data as a JSON response
            })
            .catch(err => {
                res.json({ message: "No results" }); // Send a JSON response with an error message if no data found
            });
    } else {
        
        collegeData.getAllStudents() // Fetch all students if no course query parameter is provided
            .then(data => {
                res.json(data); // Send all students data as a JSON response
            })
            .catch(err => {
                res.json({ message: "No results" }); // Send a JSON response with an error message if no data found
            });
    }
});

// Route to get all TAs
app.get("/tas", (req, res) => { 
    collegeData.getTAs()  // Call the getTAs function from collegeData module
        .then(data => {
            res.json(data); // Send the JSON response with all TAs data
        })
        .catch(err => {
            res.json({ message: "No results" }); // Send an error message if no data is found
        });
});

// Route to get all courses
app.get("/courses", (req, res) => {
    collegeData.getCourses()  //Call the getCourses function from collegeData module
        .then(data => {
            res.json(data); // Send the JSON response with all courses data
        })
        .catch(err => {
            res.json({ message: "No results" }); // Send an error message if no data is found
        });
});

// Route to get a student by their student number
app.get("/student/:num", (req, res) => {
    collegeData.getStudentByNum(req.params.num) // Call the getStudentByNum function from collegeData module with the student number as parameter
        .then(data => {
            res.json(data); // Send the JSON response with the student data
        })
        .catch(err => {
            res.json({ message: "No results" }); // Send an error message if no data is found
        });
});

// Handle 404 errors
app.use((req, res) => { //handles any requests that don't match the defined routes.
    res.status(404).send("Page Not Found"); // Send a 404 error message if the route is not found
});

// Start the server
app.listen(PORT, () => {// this code starts the server and listens on the specified port
    console.log(`Server listening on port ${PORT}`); // Log a message on the console which indicating that the server is running
});

