import {Router,Request,Response} from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"



const client=new PrismaClient();
const authRouter=Router();


interface SignInBody {
    email: string;
    password: string;
}
interface TokenPayload {
    userId: number;
    email: string;
}

interface SignUpBody{
    firstName:string
    lastName:string
    email:string
    password:string
}


authRouter.post("/signup", async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password }: SignUpBody = req.body;
        console.log(req.body);

        // // Validate required fields
        // if (!firstName || !lastName || !email || !password) {
        //      res.status(400).json({ message: "All fields are required" });
        //      return;
        // }

        // Check if user already exists
        const existingUser = await client.user.findUnique({
            where: { email }
        });

        if (existingUser) {
             res.status(400).json({ message: "Email already exists" });
             return
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = await client.user.create({
            data: {
                name:firstName+" "+lastName,
                email,
                password: hashedPassword
            },
        });

         res.json(newUser);
         return;
    } catch (error) {
        console.error("Signup error:", error);
         res.status(500).json({ message: "Internal server error" });
         return
    }
}) ;

authRouter.post("/signin",async(req:Request,res:Response)=>{
    try {
        const { email, password }: SignInBody = req.body;
    
        // Validate input
        if (!email || !password) {
           res.status(400).json({ message: "Email and password are required" });
           return
        }
    
        // Find user by email
        const user = await client.user.findUnique({
          where: { email },
        });
    
        if (!user) {
           res.status(401).json({ message: "Invalid credentials" });
           return
        }
    
        // Verify password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
           res.status(401).json({ message: "Invalid credentials" });
           return
        }
    
        // Create JWT token
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET || "default_secret",
          { expiresIn: "1h" }
        );
    
        // Return user data without password
        const userData = {
          id: user.id,
          email: user.email,
          name: user.name,
          token,
        };
    
         res.status(200).json(userData);
         return
        
      } catch (error) {
        console.error("Signin error:", error);
         res.status(500).json({ message: "Internal server error" });
         return
      }
})

export default authRouter;

