export interface CondicionPago {
    id: number,
    nombre: string,
    descripcion: string | null,
    aplicaCliente: boolean,
    aplicaSuplidor: boolean,
    alContado: boolean,
    diasVencimiento: number,
    activo: boolean
}

export interface Configs {
    id: number,
    clienteGenericoId?: number,
    compraDiasAnularFactura?: number,
    inventarioDiasAnularCompra?: number,
    facturaDiasAnularFactura?: number,
    facturaModificaPrecioEnVenta?: number,
    facturaNota1?: string,
    facturaNota2?: string,
    facturaNota3?: string,
    facturaNota4?: string,
    facturaNota5?: string,
}

export interface FormaPago {
    id: number,
    nombre: string,
    descripcion: string | null,
    primaria: boolean,
    aplicaEnFactura: boolean,
    aplicaEnCuadre: boolean,
    referencia: boolean,
    activa: boolean
}

export interface Grupo {
    id: number,
    nombre: string,
    descripcion: string | null,
    cliente: boolean,
    suplidor: boolean,
    producto: boolean,
    servicio: boolean,
    activo: boolean
}

export interface FacturaTipo {
    id: number,
    descripcion: string,
    primaria: boolean,
    requiereMonto: boolean
}