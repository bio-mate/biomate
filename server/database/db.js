import { connect } from "mongoose";

const url = process.env.MONGODB_URI;
const connectToMongo = async () => {
  try {
    await connect(`${url}`);
    console.log("---***Database Connected Successfully***---");
  } catch (error) {
    console.log(error);
  }
};

export default connectToMongo;
