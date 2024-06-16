import zod from 'zod';

export const UserSignup  = zod.object({
     name : zod.string(),
     email : zod.string().email(),
     password: zod.string().min(5)
})


export const UserValidation = zod.object({
     email : zod.string().email(),
     password: zod.string().min(5)
})