const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 4000;

(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
})();

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});