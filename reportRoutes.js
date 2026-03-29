const express = require("express");
const router = express.Router();
const db = require("./db");


// ✅ Test Route
router.get("/test", (req, res) => {
  res.send("Report Routes Working ✅");
});


// ✅ Heatmap API
router.get("/heatmap", (req, res) => {
  const sql = "SELECT latitude, longitude, risk_level FROM safety_reports";

  db.query(sql, (err, results) => {
    if (err) {
      console.log("Heatmap Error ❌", err);
      return res.status(500).json({ message: "Error fetching heatmap data" });
    }

    res.json(results);
  });
});

module.exports = router;
