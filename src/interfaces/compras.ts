import { Almacen, Empaque, Producto } from "./inventario";
import { CondicionPago } from "./configuraciones";
import { Impuesto } from "./contabilidad";
import { Empleado, Empresa } from "./empresas";

export interface Compra {
    id: number,
    fecha: string,
    numeroFactura: string,
    suplidor: Suplidor,
    empresa: Empresa,
    fechaLimite: string | null,
    nomtoFactura: number,
    montoPagado: number,
    pagada: boolean,
    anulada: boolean,
    detalle: CompraDetalle[],
    pagos: CompraPago[]
}

export interface CompraDetalle {
    id: number,
    compraId: number,
    producto: Producto,
    empaque: Empaque,
    cantidad: number,
    impuesto: Impuesto,
    monto: number,
    almacen: Almacen,
}

export interface CompraPago {
    id: number,
    compraId: number,
    monto: number,
    fecha: string,
    numeroRecibo: number,
    anulado: boolean
}

export interface Gasto {
    id: number,
    tipo: GastoTipo,
    fecha: string | null,
    monto: number,
    empleado: Empleado | null,
    comentario: string | null,
    empresa: Empresa,
    anulado: boolean,
}

export interface GastoTipo {
    id: number,
    nombre: string,
    descripcion?: string,
    activo: boolean
}

export interface Suplidor {
    id: number,
    fechaIngreso: string,
    esEmpresa: boolean,
    nombre: string,
    cedula: string | null,
    rnc: string | null,
    direccion: string | null,
    telefono: string | null,
    correo: string | null,
    informal: boolean,
    condicionPago: CondicionPago | null,
    credito: boolean,
    activo: boolean,
}