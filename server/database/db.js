
import { connect } from "mongoose";

const url = "mongodb+srv://Biomate:Biomate7674@biomate.hudmm.mongodb.net/"
const connectToMongo = async () => {
  try {
    await connect(`${url}`);
    console.log("---***Database Connected Successfully***---")
  } catch (error) {
    console.log(error);
  }
}

export default connectToMongo;


