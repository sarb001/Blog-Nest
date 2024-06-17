import { PrismaClient } from '@prisma/client/edge';
import { Hono } from 'hono';
import { BlogValidation, UserSignup , UserValidation } from '../../types';
import { verify } from 'hono/jwt';
import { withAccelerate } from '@prisma/extension-accelerate';
 
export const BlogRouter = new Hono<{
    Bindings : {
        DATABASE_URL :string,
        PRIVATE_KEY : string
    },
    Variables : {
        userid : string
    }
}>();


BlogRouter.use('/*' , async(c,next) => {
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
        c.set("jwtPayload",user?.id)
		next();
	}
})




// Edit the Blog 
BlogRouter.put('/' , async(c) => {
    
});

// Delete the Blog Specifically  
BlogRouter.put('/' , async(c) => {
    
});

// Get All Blogs
BlogRouter.get('/bulk' , async(c) => {

})