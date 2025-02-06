const express = require("express");
const fs = require("fs");

const cors = require("cors");
const allowedOrigins = ["http://localhost:3000", "http://localhost:5000"]; // Add your allowed origins here
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
// server.js
const mysql = require("mysql");
const pool = mysql.createPool({
  connectionLimit: 10, // Adjust as needed
  host: "50.87.221.65",
  user: "waltekc1_2b7b_cg",
  password: "BIGterry01!!",
  database: "waltekc1_Cust_1",
});
///"waltekc1_testing",http://localhost:5000/query?operation=insertCutList&User=8&Job=7&db=testing
// Connect to MySQL

// MySQL connection configuration
const authenticateUser = (req, res, next) => {
  const apiKey = req.body.apiKey;
  if (!apiKey) {
    return res.status(401).json({ error: "API key is required" });
  }
  const sql = `SELECT * FROM Users WHERE apiKey = ?`;
  pool.query(sql, [apiKey], (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid API key" });
    }
    req.user = results[0]; // Assuming only one user is returned
    pool.config.connectionConfig.database = "waltekc1_" + results[0].tablename;
    next();
  });
};
app.post("/AddCutList", authenticateUser, (req, res) => {
  // Access request body
  const data = req.body;
  // Process the data (example)

  Object.entries(data.grouped).forEach((item) => {
    var descri = "";

    if (item[1].Description) {
      descri = data.Description;
    }
    const settingsJson = {
      Settings: [
        "0.1875",
        item[1].Stock,
        "0",
        "0",
        "100",
        "100",
        "1",
        ".3",
        "0.8",
        "0.3",
        "0.15",
        "50",
      ],
    };

    const jsonArray = item[1].PartsArr.map(item => {
      const [partNumber, qty, length, type] = JSON.parse(item);
      return [partNumber, qty, length, type ];
    });
    
    const parts = { PartList: jsonArray};
  
    const sql = `INSERT INTO \`Optimize\` (Opt_Date, Opt_Job, Opt_FP_ID, Opt_Die, Opt_DieDesc, Opt_Finish, Opt_Settings, Opt_Part_List, Results, Material_Source, UserID, DieWeightFt) VALUES (now(), ?, '0', ?, ?, ?, ?, ?, '{"Results": ""}', '{"Order": "", "Available": "", "Mat_Comment": ""}', ?, '');`;
    pool.query(
      sql,
      [data.Job, item[1].Die, descri, item[1].Finish,  JSON.stringify(settingsJson), JSON.stringify( parts), data.User],
      (error, results) => {
        pool.config.connectionConfig.database = "waltekc1_Cust_1";
        if (error) {
          console.error("Error executing query:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
        if (results.length === 0) {
          return res.status(401).json({ error: "Invalid API key" });
        }
      }
    );
  });
  // Respond with a message
  pool.config.connectionConfig.database = "waltekc1_Cust_1";
  res.status(200).json({ message: data });
});
app.post("/DeleteCutList", authenticateUser, (req, res) => {
  // Access request body
  const data = req.body;
  // Process the data (example)

  
    const sql = "DELETE FROM `Optimize` WHERE `Opt_ID` IN(?);";
    pool.query(
      sql,
      [data.IDs],
      (error, results) => {
        pool.config.connectionConfig.database = "waltekc1_Cust_1";
        if (error) {
          console.error("Error executing query:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
        if (results.length === 0) {
          return res.status(401).json({ error: "Invalid API key" });
        }
      }
    );

  // Respond with a message
  pool.config.connectionConfig.database = "waltekc1_Cust_1";
  res.status(200).json({ message: data });
});

// Define API endpoint to execute SQL query
app.get("/query", authenticateUser, (req, res) => {
  if (!req.user) {
    console.log(req);
    return;
  }
  const userId = req.user.id;
  const { operation, db } = req.query;
  const connection2 = mysql.createConnection({
    host: "50.87.221.65",
    user: "waltekc1_2b7b_cg",
    password: "BIGterry01!!",
    database: `waltekc1_${req.user.tablename}`,
  });
  ///"waltekc1_testing",http://localhost:5000/query?operation=insertCutList&User=8&Job=7&db=testing
  // Connect to MySQL
  connection2.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    //"Connected to MySQL"
  });

  let sqlQuery;

  // Determine the SQL query based on the operation
  switch (operation) {
    case "select":
      var { table, idname, idkey } = req.query;
      sqlQuery = `SELECT * FROM ${table} WHERE ${idname} = ${idkey}`;
      break;
    case "insertCutList":
      var { User, Job } = req.query;
      sqlQuery = `INSERT INTO \`Optimize\` (Opt_Date, Opt_Job, Opt_FP_ID, Opt_Die, Opt_DieDesc, Opt_Finish, Opt_Settings, Opt_Part_List, Results, Material_Source, UserID, DieWeightFt) VALUES (now(), '${Job}', '0', '', 'New', '', '{"Settings": ["0.1875", "288", "0", "0", "100", "100", "1", ".3", "0.8", "0.3", "0.15", "50"]}', '{"PartList": []}', '{"Results": ""}', '{"Order": "", "Available": "", "Mat_Comment": ""}', '${User}', '0');`;
      /// this is wheere i left off
      break;
    case "update":
      var { table, idname, idkey } = req.query;
      sqlQuery = `UPDATE ${table} SET column1 = ${param1} WHERE column2 = ${param2}`;
      break;
    case "delete":
      var { table, idkey } = req.query;
      sqlQuery = `DELETE FROM ${table} WHERE column1 = ${param1}`;
      break;
    default:
      return res.status(400).json({ error: "Invalid operation" });
  }

  // Execute the SQL query
  connection2.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(results);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
