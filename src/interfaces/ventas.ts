import { CondicionPago, FacturaTipo, FormaPago } from "./configuraciones"
import { Comprobante } from "./contabilidad"
import { Empresa } from "./empresas"

export interface Cliente {
    id: number,
    fechaIngreso: string,
    esEmpresa: boolean,
    generico: boolean,
    nombre: string,
    cedula: string | null,
    rnc: string | null,
    direccion: string | null,
    telefono: string | null,
    correo: string | null,
    condicionPago: CondicionPago | null,
    comprobante: Comprobante | null,
    credito: Credito | null,
    activo: boolean,
}

export interface Cotizacion {
    id: number,
    empresaId: number,
    empresa: string,
    clienteId: number,
    cliente: string,
    fecha: number,
    hora: number,
    subTotal: number,
    itbis: number,
    descuento: number,
    total: number,
    usuarioId: number,
    comentario?: string,
    abierta: boolean,
    anulada: boolean,
    fechaAnulada?: number,
    usuarioIdAnulada?: number
}

export interface CotizacionDetalle {
    id: Number,
    cotizacionId: number,
    productoId: number,
    producto: string,
    monto: number,
    cantidad: number,
    total: number,
    itbis: number,
    orden: number
}

export interface Credito {
    id: number,
    clienteId: number,
    monto: number,
    deuda: number
}

export interface Cuadre {
    id: number,
    fecha: number,
    hora: number,
    montoInicial: number,
    cantidadCerradas: number,
    cantidadAbiertas: number,
    cantidadANuladas: number,
    montoFacturas: number,
    montoCuadre: number,
    montoFaltante: number,
    montoSobrante: number,
    montoGastos: number,
    abiarta: boolean,
    usuarioId: number,
    comentario?: string
}

export interface CuadreBillete {
    id: number,
    cuadreId: number,
    billeteId: number,
    denominacion: string,
    valor: number,
    cantidad: number
}

export interface CuadrePago {
    id: number,
    cuadreId: number,
    formaPagoId: number,
    monto: number,
    referencia?: string,
    fecha: number,
    hora: number
}

export interface Devolucion {
    id: number,
    facturaId: number,
    fecha: number,
    hora: number,
    nota?: string,
    usuarioId: number,
    anulada: number,
    fechaAnulada?: number,
    usuarioIdAnulada?: number
}

export interface DevolucionDetalle {
    id: number,
    devolucionId: number,
    productoId: number,
    producto: string,
    cantidadFacturada: number,
    cantidadDevolucion: number,
    orden: number,
    nota?: string
}

export interface Factura {
    id: number,
    numero: number,
    empresa: Empresa | null,
    cliente: Cliente | null,
    facturaTipo: FacturaTipo | null,
    fechaEmision: string,
    fechaSaldo: string | null,
    fechaLimitePago: string | null,
    fechaEntrega: string | null,
    ncf: string | null,
    comprobante: Comprobante | null,
    subTotal: number,
    itbis: number,
    descuento: number,
    total: number,
    pagado: number,
    devuelto: number,
    nota: string | null,
    abierta: boolean,
    anulada: boolean,
    items: FacturaDetalle[],
    pagos: FacturaPago[],
    notas: FacturaNota[],
}

export interface FacturaDetalle {
    id: number,
    facturaId: number,
    productoId: number,
    producto: string,
    monto: number,
    cantidad: number,
    total: number,
    itbis: number,
    comision: number,
    orden: number,
    cortesia: boolean
}

export interface FacturaNota {
    id: number,
    facturaId: number,
    nota: string
}

export interface FacturaPago {
    id: number,
    facturaId: number,
    formaPago: FormaPago | null,
    monto: number,
    fecha: string,
    numero?: string
}