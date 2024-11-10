import { createContext } from "react"
import { GlobalContextState } from "../../reducers/global"
import { ControlProps } from "../../interfaces/globales"
import { ComprobanteSecuencia } from "../../interfaces/contabilidad"
import { useReducerHook } from "../../hooks/useReducer"
import { useConstants } from "../../hooks/useConstants"

interface Entidad extends ComprobanteSecuencia {}
export interface ComprobanteSecuenciaContextState<T> extends GlobalContextState<T> {
    nuevo: () => void
};

export const ComprobantesSecuenciasContext = createContext<ComprobanteSecuenciaContextState<Entidad>>({} as ComprobanteSecuenciaContextState<Entidad>)

function ComprobantesSecuenciasProvider({ children }: ControlProps) {

    const { Urls } = useConstants()
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Entidad>(Urls.Contabilidad.ComprobantesSecuencias);

    const nuevo = () => {
        editar({
            id: 0,
            comprobante: null,
            desde: 0,
            hasta: 0,
            ultimo: 0,
            empresa: null,
        })
    }

    return (
        <ComprobantesSecuenciasContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </ComprobantesSecuenciasContext.Provider>
    )
}
export default ComprobantesSecuenciasProvider;
