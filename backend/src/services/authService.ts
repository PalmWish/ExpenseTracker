import * as userRepository from "../repositories/userRepository"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (
    name: string,
    email: string,
    password: string
) => {

    if(!name || !email || ! password){
        throw new Error("Please fill all fields.")
    }

    const existingUser = await userRepository.findByEmail(email);
    
    if(existingUser){
        throw new Error("Email already exists!")
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    return await userRepository.createUser(
        name,
        email,
        hashedPassword
    );
}

const login = async (
    email: string,
    password: string
) => {

    if( !email || !password){
        throw new Error("Please fill all fileds.")
    }
    const user = await userRepository.findByEmail(email);

    if(!user){
        throw new Error("Invalid email or password.")
    }

    const compare = await bcrypt.compare(
        password,
        user.password
    )

    if(!compare){
        throw new Error("Invalid email or password.")
    }
    
    const token = jwt.sign(
        {
            userId: user._id
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "7d"
        }
    )
    return { token, user:{
        Id: user._id,
        name: user.name,
        email: user.email
        } 
    }
}

export {register, login }