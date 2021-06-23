/* index.js - Main entry point for starting the server */

const app = require("./routes/words");

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log("Server Started"));
