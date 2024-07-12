import { StatusRole } from "../../entities/user.entity";



export class RegisterUserDto {

    constructor(
        public readonly name_user: string,
        public readonly password: string,
        public readonly email: string,
        public readonly role: StatusRole = StatusRole.user
    ){}

    static create(object: { [key: string]: any }): [string?, RegisterUserDto?]{

        const { name_user, password, email, role } = object;

        let roleUser: StatusRole = role;
        if(!role) roleUser = StatusRole.user;
        if(!name_user) return ['Missing name_user'];
        if(!password) return ['Missing password'];
        if(!email) return ['Missing email'];

        return [undefined, new RegisterUserDto(name_user, password, email, roleUser)]

    }

}


