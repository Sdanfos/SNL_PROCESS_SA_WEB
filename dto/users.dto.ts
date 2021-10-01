import { Expose } from 'class-transformer'

export class baseUserDTO {

    @Expose()
    id_usuario:number;
    @Expose()
    nombre_usuario:string;
    @Expose()
    contrasena:string;
    @Expose()
    rut_usuario:string;
    @Expose()
    correo_usuario:string;
    @Expose()
    nombre:string;
    @Expose()
    apellido_materno:string;
    @Expose()
    apellido_paterno:string;
    @Expose()
    tipo_usuario_id:number;
    @Expose()
    estado_usuario_id_estado:number;

}