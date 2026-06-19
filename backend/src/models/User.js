import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema(
    {
        name:{
            type : String,
            required: [true,"Name is required"],
            trim : true,
        },
        email :{
            type : String,
            required : [true ,"Email is required "],
            unique : true,
            lowercase : true,
            trim : true,
        },
        password : {
            type : Stirng,
            required : [true , "password is required"],
            minlength : 6 ,
            select : false ,
        },
        bio :{
            type : String ,
            default : ""
        },
        skills : {
            type : [String],
            default :[]
        },
    },
    {timestamps : true}

);

UserSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next()

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
    next()
});

UserSchema.methods.comparePassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword,this.password)
};

const User = mongoose.model("User",UserSchema)

export default User;