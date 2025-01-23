
import {SessionData} from "express-session";
import mongoose from "mongoose";

export interface IMySessionData extends SessionData {
  loggedin?: boolean;
  user?: {
    type?: string;
  };
}



export interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  type: string;
}

export interface UserBody {
  username: string;
  email: string;
  password: string;
}

export interface IUserModel extends mongoose.Model<IUser> {}

const UserSchema= new mongoose.Schema<IUser>({
	username: {
		type: String,
		required: [true, "user name is required"],
		maxlength: [30, "user name can not be more than 30 characters"],
	},
	email: {
		type: String,
		required: [true, "user email is required"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "user password is required"],
	},
	type:{
		type:String,
		default:"user",
		enum:["user","admin"]
	},


}, { timestamps: true });


const User = mongoose.model("User", UserSchema);
export default User
