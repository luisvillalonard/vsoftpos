import { Empleado, Empresa } from "./empresas"

export interface Login {
    acceso: string,
    clave: string,
    recuerdame: boolean
}

export interface UserApp extends Usuario {
    token?: string,
}

export interface Rol {
    id: number,
    nombre: string,
    esAdministrador: boolean

}

export interface Usuario {
    id: number,
    acceso: string,
    cambio: boolean,
    empleado: Empleado | null,
    rol: Rol | null,
    empresa: Empresa | null,
    correo?: string;
    enviarCorreo: boolean,
    activo: boolean
}

export interface UsuarioCambioClave {
    id: number,
    passwordNew: string,
    passwordConfirm: string,
}

export interface Permiso {
    id: number,
    rolId: number,
    menuId: number
}