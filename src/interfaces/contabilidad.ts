import { Empresa } from "./empresas"

export interface Banco {
    id: number,
    nombre: string,
    descripcion?: string,
    activo: boolean,
}

export interface CatalogoCc {
    id: number,
    nombre: string,
    codigo: string,
    grupo: number | null,
    nivel1: number | null,
    nivel2: number | null,
    nivel3: number | null,
}

export interface Comprobante {
    id: number,
    tipo: ComprobanteTipo | null,
    nombre: string,
    descripcion?: string,
    prefijo: string,
    excento: boolean,
    empresa: Empresa | null,
    activo: boolean
}

export interface ComprobanteSecuencia {
    id: number,
    comprobante: Comprobante | null,
    desde: number,
    hasta: number,
    ultimo: number,
    fechaVence?: string,
    empresa: Empresa | null,
}

export interface ComprobanteTipo {
    id: number,
    descripcion: string,
    activo: boolean
}

export interface CuentaBanco {
    id: number,
    banco: Banco | null,
    empresa: Empresa | null,
    numeroCuenta: string,
    fechaApertura: string | null,
    monto: number,
    activa: boolean,
}

export interface Impuesto {
    id: number,
    codigo: string,
    nombre: string,
    tasa: number,
    activo: boolean
}