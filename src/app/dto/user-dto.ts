import { Municipality } from "../enum/municipality.enum";

export interface UserDTO {
    id: string,
    name: string,
    email: string,
    phone: string,
    municipality: Municipality,
    address: string
}
