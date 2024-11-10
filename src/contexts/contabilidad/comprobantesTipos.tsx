import { createContext } from "react"
import { GlobalContextState } from "../../reducers/global"
import { ControlProps } from "../../interfaces/globales"
import { ComprobanteTipo } from "../../interfaces/contabilidad"
import { useReducerHook } from "../../hooks/useReducer"
import { useConstants } from "../../hooks/useConstants"

interface Entidad extends ComprobanteTipo {}
export interface ComprobanteTipoContextState<T> extends GlobalContextState<T> {
    nuevo: () => void
};

export const ComprobantesTiposContext = createContext<ComprobanteTipoContextState<Entidad>>({} as ComprobanteTipoContextState<Entidad>)

function ComprobantesTiposProvider({ children }: ControlProps) {

    const { Urls } = useConstants()
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Entidad>(Urls.Contabilidad.ComprobantesTipos);

    const nuevo = () => {
        editar({
            id: 0,
            descripcion: '',
            activo: true
        })
    }

    return (
        <ComprobantesTiposContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </ComprobantesTiposContext.Provider>
    )
}
export default ComprobantesTiposProvider;
