import { User,UserAttributes } from "../models/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const  JWT_SECRET = 'C56927AB6CFA9DE3198231EC893AC';




export class userService{
    public async registeruser(data:UserAttributes):Promise<User>{
        const hashpassword = await bcrypt.hash(data.password,10);
        const user = await User.create({...data,password:hashpassword});
        return user;
    }

    public async login(email:string,password:string){
        const user = await User.findOne({where:{email}});
        if(!user){
            throw new Error('Invalid Email or Password');
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            throw new Error('Invalid Email or Password');
        }

        const token = jwt.sign({id:user.id,username:user.username,email:user.email,password:user.password},JWT_SECRET,{expiresIn:'1h'});

        return {token};

}



    async getCurrentUser(token: string) {
        try {
   
            const decoded = jwt.verify(token, JWT_SECRET) as { id: string; username: string; email: string };
      
         
            const { id, username, email } = decoded;
      
            return { id, username, email };
          } catch (error) {
            throw new Error('Invalid or expired token');
          }
}



}

