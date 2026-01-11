import jwt from "jsonwebtoken"
import { findUserByUsername } from "../services/auth.service.js"
import { comparePassword } from "../utils/password.js";
import { accessTokenExpiry,accessTokenSecret,refreshTokenExpiry,refreshTokenSecret} from "../config/jwt.js";

export const login = async (req,res) => {
    const {username,password} = req.body;
    if(!username || !password) {
        return res.status(400).json({message:"Username and Password required"});
    }

    const user = await findUserByUsername(username);
    if(!user) {
        return res.status(401).json({message: "Invalid Credentials"});
    }

    const isMatch = await comparePassword(password,user.password);
    if(!isMatch){
        return res.status(401).json({message: "Invalid Credentials"});
    }

    const accessToken = jwt.sign(
        {
         id : user.id,
        role:user.role
        },
        accessTokenSecret,
        {
            expiresIn:accessTokenExpiry
        }
    );

    const refreshToken = jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        refreshTokenSecret,
        {
            expiresIn:refreshTokenExpiry
        }
    );
    return res.json({accessToken,refreshToken});

}

