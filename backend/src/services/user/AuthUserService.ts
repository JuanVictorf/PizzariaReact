
import prismaClient from "../../prisma";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface AuthRequest{
    email: string,
    password: string,
}

class AuthUserService{
    async execute({ email, password }: AuthRequest){
        // Verificar se o email existe.

        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(!user){
            throw new Error("Usuário ou senha incorretos.");
        }
        
        // Preciso verificar se a senha informada está correta.
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Usuário ou senha incorretos.");
        }

        // Se deu tudo certo, autentica
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return {
            id: user.id,
            namer: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService };