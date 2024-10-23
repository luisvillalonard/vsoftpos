import { Genero } from "./auxiliares"
import { Anexo } from "./globales"

export interface Empresa {
    id: number,
    nombre: string,
    rnc: string,
    direccion: string,
    telefono: string,
    webSite: string | null,
    fax: string | null,
    correo: string | null,
    foto: Anexo | null,
    principal: boolean,
    empresaId: number | null,
    activa: boolean
}

export interface Horario {
    id: number,
    nombre: string,
    horaInicio: string | null,
    horaFin: string | null,
    empresa: Empresa,
    activo: boolean
}

export interface Posicion {
    id: number,
    nombre: string,
    descripcion: string | null,
    sueldo: number,
    empresa: Empresa,
    activa: boolean
}

export interface Empleado {
    id: number,
    nombre: string,
    genero: Genero | null,
    cedula: string | null,
    pasaporte: string | null,
    horario: Horario | null,
    posicion: Posicion | null,
    empresa: Empresa,
    salario: number,
    fechaEntrada: string | null,
    fechaSalida: string | null,
    correo: string | null,
    foto: Anexo | null,
    activo: boolean
}
