import app from "./app.js";
import connectToMongoDB from "./database/index.js";
import dotenv from "dotenv";

// Apply middlewares for cors
dotenv.config({
    path: "/.env"
});

connectToMongoDB()
.then(() => {
    // Listening our app on particular port
    app.listen(process.env.PORT || 2000, () => {
        app.on("error", (error) => {
            console.log("Error encountered in DB Connection : ", error);
            throw error;
        });
        console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
    });
})
.catch((error) => {
    console.log("MongoDB connection failed: ", error);
});