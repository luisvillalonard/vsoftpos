import { createContext } from "react";
import { ACTIONS, GlobalContextState, initState } from "../../reducers/global";
import { ControlProps, ResponseResult } from "../../interfaces/globales";
import { Urls } from "../../components/rutas";
import { useReducerHook } from "../../hooks/useReducer";
import { Factura, FacturaPago } from "../../interfaces/ventas";
import { useFetch } from "../../hooks/useFetch";

export interface FacturaContextState<T> extends GlobalContextState<T> {
    nuevo: () => void,
    abiertas: () => Promise<ResponseResult<Factura[]>>,
    pago: (item: FacturaPago[]) => Promise<ResponseResult<FacturaPago>>,
};

export const FacturasContext = createContext<FacturaContextState<Factura>>({} as FacturaContextState<Factura>)

function FacturasProvider({ children }: ControlProps) {
    const { state, dispatch, editar, cancelar, agregar, actualizar, todos, errorResult } = useReducerHook<Factura>(Urls.Ventas.Facturas);
    const api = useFetch()

    const nuevo = () => {
        editar({
            id: 0,
            numero: 0,
            empresa: null,
            cliente: null,
            facturaTipo: null,
            fechaEmision: new Date().toISOString().slice(0, 10),
            fechaSaldo: null,
            fechaLimitePago: null,
            fechaEntrega: null,
            ncf: null,
            comprobante: null,
            subTotal: 0,
            itbis: 0,
            descuento: 0,
            total: 0,
            pagado: 0,
            devuelto: 0,
            nota: null,
            abierta: true,
            anulada: false,
            items: [],
            pagos: [],
            notas: [],
        })
    }

    const abiertas = async (): Promise<ResponseResult<Factura[]>> => {

        dispatch({ type: ACTIONS.FETCHING });
        let resp: ResponseResult<Factura[]> = {} as ResponseResult<Factura[]>;

        try {
            resp = await api.Get<Factura[]>(`${Urls.Ventas.Facturas}/abiertas`);
            dispatch({ type: ACTIONS.FETCH_COMPLETE, recargar: false });
        } catch (error: any) {
            resp = errorResult(error);
            dispatch({ type: ACTIONS.FETCH_COMPLETE, recargar: false });
        }

        return resp;

    }

    const pago = async (items: FacturaPago[]): Promise<ResponseResult<FacturaPago>> => {
        dispatch({ type: ACTIONS.FETCHING });
        let resp: ResponseResult<FacturaPago>;

        try {
            resp = await api.Post<FacturaPago>(`${Urls.Ventas.Facturas}/pago`, items);
        } catch (error: any) {
            resp = errorResult<FacturaPago>(error);
        }

        dispatch({ type: ACTIONS.FETCH_COMPLETE, recargar: true });
        return resp;
    }

    return (
        <FacturasContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
            abiertas,
            pago,
        }}>
            {children}
        </FacturasContext.Provider>
    )
}
export default FacturasProvider;
