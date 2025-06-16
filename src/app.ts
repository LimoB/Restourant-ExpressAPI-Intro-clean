import express, { Application, Response } from "express";
import dotenv from "dotenv"
import { logger } from "./middleware/logger";
import { userRouter } from "./users/user.route";
import { stateRouter } from "./state/state.route";
import { cityRouter } from "./city/city.route";
import { authRouter } from "./auth/auth.route";
import { RateLimiterMiddleware } from "./middleware/rateLimiter";
 
dotenv.config()
 
const app:Application = express()
 
const PORT = process.env.PORT || 5000
 
 
//Basic MIddleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(logger)
app.use(RateLimiterMiddleware)
 
//default route
app.get('/',(req,res:Response)=>{
    res.send("Welcome to Express API Backend WIth Drizzle ORM and PostgreSQL")
})
 
//import routes
app.use('/api', userRouter)
app.use('/api', stateRouter)
app.use('/api', cityRouter)
app.use('/api', authRouter)


//Start server
  export default app;
