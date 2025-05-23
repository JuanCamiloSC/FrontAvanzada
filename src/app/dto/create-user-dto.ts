import { Rol } from "../enum/rol.enum"
import { Municipality } from "../enum/municipality.enum"

export interface CreateUserDTO {
    name: string,
    phone: string,
    municipality: Municipality,
    address: string,
    email: string,
    password: string
    rol: Rol

}
