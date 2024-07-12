import { CustomError, UserEntity } from "../../domain";


export class UserMapper {
    static userEntityFromObject(object: {[key: string]: any}){
        
        const {id_user, name_user, email, role} = object;
        if(!id_user) throw CustomError.badRequest('Missing id user');
        if(!name_user) throw CustomError.badRequest('Missing name_user');
        if(!email) throw CustomError.badRequest('Missing email');
        if(!role) throw CustomError.badRequest('Missing role');

        return new UserEntity(id_user, name_user, email, role);
        
    }
}