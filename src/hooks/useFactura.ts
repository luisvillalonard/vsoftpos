import { useEffect, useState } from "react"
import { ProductoPos } from "../interfaces/inventario"
import { Cliente, FacturaDetalle, FacturaPago } from "../interfaces/ventas"
import { useData } from "./useData"
import { FormatNumber } from "./useUtils"

export function useFactura() {

    const {
        contextFacturas: { state: { modelo: factura }, nuevo: nueva, editar, agregar: guardar },
        contextProductos: { toList },
        contextFacturasTipos: { state: { datos: tiposFacturas } },
        contextFormasPago: { state: { datos: formasPago } },
        contextComprobantesSecuencias: { state: { datos: secuencias, procesando: cargandoComprobantes }, todos: cargarSecuencias },
    } = useData()
    const [productos, setProductos] = useState<ProductoPos[]>([])
    const [errores, setErrores] = useState<string[]>([])
    let arrErrores: string[] = [];

    const cargarProductos = async () => {
        const resp = await toList();
        if (resp && resp.ok) {
            setProductos(resp.datos ?? [])
        }
    }

    const agregar = (item: ProductoPos) => {

        if (factura) {

            let detalle = factura.items.filter(prod => prod.productoId === item.productoId)[0];
            let newItems = !detalle
                ? [...factura.items, item]
                : [
                    ...factura.items.map(prod => prod.productoId === item.productoId
                        ? { ...detalle, cantidad: detalle.cantidad + item.cantidad }
                        : prod)
                ];

            editar({
                ...factura,
                items: newItems,
            });
            
            setProductos(prev => prev.map(prod => prod.id === item.productoId ? { ...prod, cantidad: 0 } : prod));
            
        }

    }

    const editarCantidad = (item: FacturaDetalle) => {

        if (factura) {
            editar({
                ...factura,
                items: factura.items.map(old => old.productoId == item.productoId ? { ...old, cantidad: item.cantidad } : old)
            })
        }

    }

    const eliminarProducto = (item: FacturaDetalle) => {
        
        if (factura) {
            editar({
                ...factura,
                items: factura.items.filter(old => old.productoId !== item.productoId) ?? []
            })
        }

    }

    const calcularTotales = () => {

        if (factura) {

            const subTotal: number = Number(factura.items.reduce((acc: number, item: FacturaDetalle) => {
                return acc + item.monto * item.cantidad
            }, 0.00).toFixed(2));

            const itbis: number = Number(factura.items.reduce((acc: number, item: FacturaDetalle) => {
                return acc + item.itbis * item.cantidad
            }, 0.00).toFixed(2));

            editar({
                ...factura,
                subTotal: subTotal,
                itbis: itbis,
                total: Number((subTotal + itbis).toFixed(2))
            });
            
        }
        
    }

    const editarCliente = (cliente: Cliente) => {
        if (factura) {
            editar({ 
                ...factura, 
                cliente: cliente, 
                comprobante: cliente.comprobante
            });
        }
    }

    const validaFactura = (): boolean => {

        arrErrores = [];

        if (!factura) {
            arrErrores.push('La factura es inválida.')

        } else {

            if (!factura.facturaTipo) {
                arrErrores.push('Debe indicar el tipo de factura.')
            }

            if (!factura.comprobante) {
                arrErrores.push('Debe indicar el comprobante fiscal de la factura.')

            } else if (secuencias.filter(sec => sec.comprobante?.id === factura.comprobante?.id).length === 0) {
                arrErrores.push('Debe indicar el comprobante fiscal de la factura.')

            } else {

                const totalPagos = factura.pagos.filter(item => item.monto > 0).reduce((acc: number, item: FacturaPago) => {
                    return acc = acc + item.monto;
                }, 0.00) ?? 0.00;

                if (totalPagos < factura.total) {
                    if (factura.facturaTipo?.requiereMonto) {
                        arrErrores.push('El monto total de las formas de pago no puede ser menor al monto total de la factura.')
                    } else {
                        if (factura.cliente?.credito) {
                            if (((factura.total - factura.descuento - totalPagos) + factura.cliente.credito.deuda) > factura.cliente.credito.monto) {
                                arrErrores.push(`El monto pendiente de la factura supera el monto disponible del crédito del cliente que es de ${FormatNumber(factura.cliente.credito.monto - factura.cliente.credito.deuda, 2)}.`)
                            }
                        }
                    }
                }
            }

        }

        setErrores(arrErrores);
        return arrErrores.length === 0;
    }

    const pagaFactura = async (): Promise<boolean> => {

        arrErrores = [];

        if (factura) {

            if (!validaFactura()) {
                return Promise.reject(false);
            }

            const pagado = Number(factura.pagos.reduce((acc: number, item: FacturaPago) => {
                return acc = acc + item.monto;
            }, 0.00).toFixed(2))

            const resp = await guardar({
                ...factura,
                pagado: pagado,
                devuelto: !factura.facturaTipo?.requiereMonto ? 0 : Number((pagado - (factura.total - factura.descuento)).toFixed(2)),
                abierta: pagado >= (factura.total - factura.descuento) ? false : true
            });

            if (!resp) {
                arrErrores.push('Situación inesperada tratando de generar la factura.');

            } else if (!resp.ok) {
                arrErrores.push(resp.mensaje || 'Situación inesperada tratando de guardar la factura.');

            } else if (resp.ok) {
                nueva();
            }
        }

        setErrores(arrErrores);
        return Promise.resolve(arrErrores.length === 0);

    }
    
    useEffect(() => { setErrores([]) }, [factura])

    useEffect(() => { calcularTotales() }, [factura?.items])

    return {
        factura,
        productos,
        tiposFacturas,
        formasPago,
        errores,

        /* PRODUCTOS */
        editarCantidad,
        eliminarProducto,
        cargarProductos,

        /* FACTURA */
        nueva,
        editar,
        agregar,
        guardar,
        validaFactura,
        pagaFactura,

        /* CLIENTE */
        editarCliente,

        /* COMPROBANTES */
        secuencias,
        cargandoComprobantes,
        cargarSecuencias,
    }

}