import { JWTAdapter } from "../../config/jwt.adapter";
import { UserEntity } from "../entities/user.entity";
import { CustomError } from "../errors/custom.errors";

interface UserToken {
    token: string,
    user: UserEntity
}

type SignToken = (payload: Object, duration?: string) => Promise<string|null>

interface RenewUseCase {
    execute( user:UserEntity ): Promise<UserToken>
}


export class RenewUser implements RenewUseCase {

    constructor(
        private readonly signToken: SignToken = JWTAdapter.generateToken,
    ){}

    async execute(user: UserEntity): Promise<UserToken> {
        
        const token = await this.signToken({email: user.email});
        if(!token) throw CustomError.internalServer('Error generating token');

        return {
            token: token,
            user
        }

    }

}