
import { userService } from "../services/userService";
import { Request,Response } from "express";



const userservice = new userService();

export const registeruser = async (req:Request,res:Response) =>{
    try{
        const newuser = await userservice.registeruser(req.body);
        res.json(newuser)
}
catch(error){
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
}
}


export const loginuser = async (req:Request,res:Response) =>{
    try{
        const {email,password} = req.body;
        const {token } = await userservice.login(email,password);
        res.json({token});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}



export const getCurrentUser = async (req: Request, res: Response) => {
    try {
      const token = req.headers['authorization']?.split(' ')[1]; // Extract token from the Authorization header
      if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided' });
      }
  
  
      const user = await userservice.getCurrentUser(token);

 
      res.status(200).json(user);
    } catch (error) {
      console.error('Error while fetching current user:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  };