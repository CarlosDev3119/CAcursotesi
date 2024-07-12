import { StatusRole } from "../domain"

// Crear un objeto que contenga los siguientes atributos

interface User {
    id_user: number,
    name_user: string
    email: string
    role: StatusRole
    password: string
}

export const userData: User[] = [
    {
        id_user: new Date().getTime(),
        name_user: 'Pedro',
        email: 'pedro@email.com',
        role: StatusRole.admin,
        password: '123123'
    },
    {
        id_user: new Date().getTime(),
        name_user: 'Luis',
        email: 'luis@email.com',
        role: StatusRole.user,
        password: '123123'
    }
]