const express = require('express');
const app = express();
const db = require('./services/db');

// Set up static files folder
app.use(express.static('static'));

// ==========================================
// LAB 4 ROUTING EXERCISES
// ==========================================

// EXERCISE 1: Custom welcome route (Updated with your name!)
app.get("/", function(req, res) {
    res.send("Hello nathan blessing!");
});

// EXERCISE 2 & 3: Roehampton route with console logging
app.get("/roehampton", function(req, res) {
    console.log("Requested path: " + req.url);
    res.send("hello roehampton");
});

// Dynamic route sample
app.get("/hello/:name", function(req, res) {
    console.log(req.params);
    res.send("Hello " + req.params.name);
});

// OPTIONAL EXERCISE 2: User ID tracking
app.get("/user/:id", function(req, res) {
    res.send("User ID requested: " + req.params.id);
});

// OPTIONAL EXERCISE 3: Student Name and ID
app.get("/student/:name/:id", function(req, res) {
    res.send("Student Name: " + req.params.name + " | Student ID: " + req.params.id);
});

// Original database test route
app.get("/db_test", async function(req, res) {
    try {
        const rows = await db.query("SELECT * FROM test_table");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Database query error");
    }
});

// OPTIONAL EXERCISE 4: Database query with ID filtering
app.get("/db_test/:id", async function(req, res) {
    try {
        const studentId = req.params.id;
        const rows = await db.query("SELECT name FROM test_table WHERE id = ?", [studentId]);
        
        if (rows.length > 0) {
            res.send(`
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 2px solid #007bff; border-radius: 8px; max-width: 300px; margin: 50px auto; text-align: center;">
                    <h2 style="color: #007bff;">Student Match Found</h2>
                    <p style="font-size: 1.2rem; font-weight: bold;">Name: ${rows[0].name}</p>
                    <p style="color: #6c757d; font-size: 0.9rem;">ID Parsed: ${studentId}</p>
                </div>
            `);
        } else {
            res.send("<h3>No student record found matching that ID.</h3>");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Database connection error occurred.");
    }
});

// Start the web server listening on port 3000
app.listen(3000, function() {
    console.log("Server running on port 3000...");
});