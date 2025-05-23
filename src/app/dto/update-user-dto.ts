import { Municipality } from "../enum/municipality.enum"


export interface UpdateUserDTO {
    id: string,
    name: string,
    phone: string,
    municipality: Municipality,
    address: string
}
