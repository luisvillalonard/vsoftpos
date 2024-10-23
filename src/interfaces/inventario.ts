import { Suplidor } from "./compras";
import { Grupo } from "./configuraciones";
import { Impuesto } from "./contabilidad";
import { Empresa } from "./empresas";
import { Anexo } from "./globales";
import { FacturaDetalle } from "./ventas";

export interface Almacen {
    id: number,
    nombre: string,
    descripcion: string,
    empresa: Empresa | null,
    activo: boolean,
}

export interface AlmacenEntradaSalida {
    id: number,
    almacen: Almacen,
    fecha: string,
    nota?: string,
    anulada: boolean,
}

export interface AlmacenEntradaSalidaDetalle {
    id: number,
    productoId: number,
    cantidad: number,
    precio: number,
    itbis: number,
    total: number,
}

export interface AlmacenEntradaDetalle extends AlmacenEntradaSalidaDetalle {
    entradaId: number,
}

export interface AlmacenSalidaDetalle extends AlmacenEntradaSalidaDetalle {
    salidaId: number,
}

export interface Empaque {
    id: number,
    nombre: string,
    unidades: number,
    activo: boolean,
}

export interface Medida {
    id: number,
    nombre: string,
}

export interface Unidad {
    id: number,
    descripcion: string,
    medida: Medida | null,
    activa: boolean,
}

export interface Producto {
    id: number,
    esProducto: boolean,
    especifico: boolean,
    detallable: boolean,
    codigo: string | null,
    nombre: string
    descripcion: string | null,
    codigoBarra: string | null,
    grupo: Grupo | null,
    seCompra: boolean,
    categoria606: number| null,
    seVende: boolean,
    categoria607: number| null,
    suplidor: Suplidor | null,
    impuesto: Impuesto | null,
    costo: number,
    precio: number,
    reorden: number,
    ventaSinStock: boolean,
    costoCc: number | null,
    ventaCc: number | null,
    descuentoCc: number | null,
    stock: Stock[],
    foto: Anexo | null,
    activo: boolean,
}

export interface ProductoPos extends FacturaDetalle {
    esProducto: boolean,
    especifico: boolean,
    detallable: boolean,
    codigo: string | null,
    codigoBarra: string | null,
    grupo: Grupo | null,
}

export interface Stock {
    id: number,
    productoId: number,
    almacenId: number,
    cantidad: number,
    fraccion: number,
}