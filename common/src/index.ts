import zod from 'zod';

// used for backend
export const UserSignup  = zod.object({
     name : zod.string(),
     email : zod.string().email(),
     password: zod.string().min(5)
})

export const UserValidation = zod.object({
     email : zod.string().email(),
     password: zod.string().min(5)
})

export const BlogValidation = zod.object({
     title  : zod.string() ,
     description : zod.string(),
     imageUrl : zod.string()
})


// used for frontend for ease 

export type SignupInput =  zod.infer<typeof UserSignup>
export type SignInValidation =  zod.infer<typeof UserValidation>
export type BlogVal =  zod.infer<typeof BlogValidation>
