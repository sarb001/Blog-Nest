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
		return next();
	}
})

BlogRouter.post('/createblog' , async(c) => {
	const prisma = new  PrismaClient({
		datasourceUrl : c.env.DATABASE_URL
	 }).$extends(withAccelerate());

	 const getUserID = c.get('jwtPayload');
	 console.log('getUser =',getUserID);

	const Body = await c.req.json();
	const ParsedResponse = BlogValidation.safeParse(Body);
	
	if(!ParsedResponse.success){
	 	c.json({
			msg : "You sent the wrong inputs",
			errors: ParsedResponse.error.issues
		})
		return;
	}

	const response = await prisma.blogs.create({
		data : {
			Blogid: 5,
			title : ParsedResponse?.data.title,
			description : ParsedResponse?.data.description,
		}
	});

	console.log('response =',response);

	return c.json({
		msg: "Blog Post Created",
		response
	})

})


BlogRouter


// Edit the Blog 
BlogRouter.put('/' , async(c) => {
    
});

// Delete the Blog Specifically  
BlogRouter.put('/' , async(c) => {
    
});

// Get All Blogs
BlogRouter.get('/bulk' , async(c) => {

})