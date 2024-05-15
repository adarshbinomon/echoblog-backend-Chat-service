import { app } from "./app";
import connectDb from "./config/db";

const port = process.env.PORT;

const start = async () => {
  try {
    await connectDb();
  } catch (error) {
    console.log("connection to database failed😢");
  }
};

app.listen(port, () => {
  console.log(`Chat server started on port ${port}`);
});

start();