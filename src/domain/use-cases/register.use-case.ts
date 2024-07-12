import { JWTAdapter } from "../../config/jwt.adapter";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";
import { CustomError } from "../errors/custom.errors";
import { AuthRepository } from "../repositories/auth.repository";

interface UserToken {
    token: string,
    user: UserEntity
}

interface RegisterUseCase {
    execute(registerUserDto: RegisterUserDto): Promise<UserToken>
}

type SignToken = (payload: Object, duration?: string) => Promise<string|null>

export class RegisterUser implements RegisterUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JWTAdapter.generateToken
        //pendiente token
    ){}
    
    
    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
                
        const user = await this.authRepository.register(registerUserDto) 
        const token = await this.signToken({email: user.email})
        if(!token) throw CustomError.internalServer('Error generating token')

        return {
            token: token,
            user: user
        }
    
    }

}


//async y el await solo sirven dentro de metodos o funciones






