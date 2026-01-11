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

export const refreshToken = (req,res) => {
    const {refreshToken} = req.body;

    if(!refreshToken){
        return res.status(400).json({message:"Refresh Token required"});
    }
     try {
    const result = jwt.verify(refreshToken, refreshTokenSecret);

    const accessToken = jwt.sign(
      {
        id:result.id,
        role:result.role
      },
      accessTokenSecret,
      { expiresIn: accessTokenExpiry }
    );

    res.json({ accessToken });
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }
}

