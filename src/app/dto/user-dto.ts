import { Municipality } from "../enum/municipality.enum";

export interface UserDTO {
    id: string,
    name: string,
    municipality: Municipality,
}
