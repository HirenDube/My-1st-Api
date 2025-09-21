const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/welcome", (req, res) => {
  const name = req.query.name || "Guest";
//   res.send(`Welcome, ${name}! 🎉`);
  res.send({"message":"Welcome, "+name+"! 🎉"});
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
