import zod from 'zod';

export const UserValidation  = zod.object({
     name : zod.string(),
     email : zod.string().email(),
     password: zod.string().min(5)
})
