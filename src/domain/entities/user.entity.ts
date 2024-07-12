import { CustomError } from "../errors/custom.errors";

export enum StatusRole {
    admin = 'ADMIN_ROLE',
    user = 'USER_ROLE'
}


export class UserEntity {

    constructor(
        public id_user: number,
        public readonly name_user: string,
        public readonly email: string,
        public readonly role: StatusRole
    ){}

    static fromObject( object: {[key: string]: any} ){
        const {id_user, name_user, email, role} = object;

        if(!id_user) throw CustomError.badRequest('Missing id user');
        if(!name_user) throw CustomError.badRequest('Missing name user');
        if(!email) throw CustomError.badRequest('Missing email');
        if(!role) throw CustomError.badRequest('Missing role');

        return new UserEntity(id_user, name_user, email, role);

    }

}