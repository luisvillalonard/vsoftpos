import { createContext } from "react"
import { GlobalContextState } from "../../reducers/global"
import { ControlProps } from "../../interfaces/globales"
import { useReducerHook } from "../../hooks/useReducer"
import { CondicionPago } from "../../interfaces/configuraciones"
import { useConstants } from "../../hooks/useConstants"

interface Entidad extends CondicionPago {}
export interface CondicionPagoContextState<T> extends GlobalContextState<T> {
    nuevo: () => void
};

export const CondicionPagosContext = createContext<CondicionPagoContextState<Entidad>>({} as CondicionPagoContextState<Entidad>)

function CondicionPagosProvider({ children }: ControlProps) {

    const { Urls } = useConstants()
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Entidad>(Urls.Configuraciones.CondicionesPago);

    const nuevo = () => {
        editar({
            id: 0,
            nombre: '',
            descripcion: null,
            aplicaCliente: false,
            aplicaSuplidor: false,
            alContado: false,
            diasVencimiento: 0,
            activo: true
        })
    }

    return (
        <CondicionPagosContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </CondicionPagosContext.Provider>
    )
}
export default CondicionPagosProvider;
