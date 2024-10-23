import { createContext } from "react";
import { GlobalContextState } from "../../reducers/global";
import { ControlProps } from "../../interfaces/globales";
import { Urls } from "../../components/rutas";
import { useReducerHook } from "../../hooks/useReducer";
import { Gasto, GastoTipo } from "../../interfaces/compras";
import { Empresa } from "../../interfaces/empresas";

interface Entidad extends Gasto {}
export interface GastoContextState<T> extends GlobalContextState<T> {
    nuevo: () => void
};

export const GastosContext = createContext<GastoContextState<Entidad>>({} as GastoContextState<Entidad>)

function GastosProvider({ children }: ControlProps) {
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Entidad>(Urls.Compras.Gastos);

    const nuevo = () => {
        editar({
            id: 0,
            tipo: {}  as GastoTipo,
            fecha: new Date().toISOString().slice(0, 10),
            monto: 0,
            empleado: null,
            comentario: '',
            empresa: {} as Empresa,
            anulado: false,
        })
    }

    return (
        <GastosContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </GastosContext.Provider>
    )
}
export default GastosProvider;
