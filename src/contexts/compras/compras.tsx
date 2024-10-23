import { createContext } from "react";
import { GlobalContextState } from "../../reducers/global";
import { ControlProps } from "../../interfaces/globales";
import { Urls } from "../../components/rutas";
import { useReducerHook } from "../../hooks/useReducer";
import { Compra, Suplidor } from "../../interfaces/compras";
import { Empresa } from "../../interfaces/empresas";

interface Entidad extends Compra {}
export interface CompraContextState<T> extends GlobalContextState<T> {
    nuevo: () => void
};

export const ComprasContext = createContext<CompraContextState<Entidad>>({} as CompraContextState<Entidad>)

function ComprasProvider({ children }: ControlProps) {
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Entidad>(Urls.Compras.Compras);

    const nuevo = () => {
        editar({
            id: 0,
            fecha: new Date().toISOString().slice(0, 10),
            numeroFactura: '',
            suplidor: {} as Suplidor,
            empresa: {} as Empresa,
            fechaLimite: null,
            nomtoFactura: 0,
            montoPagado: 0,
            pagada: false,
            anulada: false,
            detalle: [],
            pagos: []
        })
    }

    return (
        <ComprasContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </ComprasContext.Provider>
    )
}
export default ComprasProvider;
