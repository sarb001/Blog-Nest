
import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { env } from "hono/adapter";
import { sign ,verify } from 'hono/jwt' ;
import { UserSignup , UserValidation } from '../types';
import { userRouter } from "./routes/UserRoute";
import { BlogRouter } from "./routes/BlogRoutes";

type Bindingsts = {
	DATABASE_URL :string,
	PRIVATE_KEY : string
}

const app = new Hono<{Bindings : Bindingsts}>();

app.route('/api/v1/user',userRouter);

app.route('/api/v1/blog',BlogRouter);


async function middleware(c:any,next:any){

	const jwt  = c.req.header('Authorization');
	console.log('token is==',jwt);

	if(!jwt){
		return c.json({ msg: "UnAuthorized"})
	}

	const Privatekey = c.env.PRIVATE_KEY;
	console.log('key is=',Privatekey);

	const user = await verify(jwt,Privatekey);
	console.log('user is =',user);
	
	if(!user){
		return c.json({
			msg : "User not Present"
		})
	}else{
		c.set('userid',user?.id)
		next();
	}
}

// app.get('/' , middleware ,async(c) => {
// 	console.log('Databse URL1 =', c.env.DATABASE_URL);

// 	return c.text('Fetchign Yess All')
// })




export  default app;
