import { IsHexColor, IsOptional, IsString } from "class-validator"

export class createListDTO {

    @IsString()
    name!:string

    @IsHexColor()
    @IsOptional()
    color!:string
}