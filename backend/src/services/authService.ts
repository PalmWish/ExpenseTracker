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

const getIdUser = async (user_Id: string) =>{

    const idUser = await userRepository.findById(user_Id)

    if(!idUser){
        throw new Error("Invalid Id.")
    } 

    return idUser
}

const updateUser = async(
    user_Id: string,
    data:{
        name: string,
        email: string,
        password: string
    }) =>{
        if(data.password){
            data.password = await bcrypt.hash(
                data.password, 10 
            )
        }

        const user = await userRepository.updateUser(
            user_Id,
            data
        )

        if(!user){
            throw new Error("User not found.")
        }

        return user;
    
    }


const deleteUser = async (userId: string) =>{

    const del = await userRepository.deleteUser(userId)

    if(!del){
        throw new Error("User not found.")
    }

    return del;
}
export {register, login, getIdUser, updateUser, deleteUser }