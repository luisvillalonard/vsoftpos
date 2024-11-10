import { createContext } from "react"
import { GlobalContextState } from "../../reducers/global"
import { ControlProps } from "../../interfaces/globales"
import { Comprobante } from "../../interfaces/contabilidad"
import { useReducerHook } from "../../hooks/useReducer"
import { useConstants } from "../../hooks/useConstants"

interface Entidad extends Comprobante {}
export interface ComprobanteContextState<T> extends GlobalContextState<T> {
    nuevo: () => void
};

export const ComprobantesContext = createContext<ComprobanteContextState<Entidad>>({} as ComprobanteContextState<Entidad>)

function ComprobantesProvider({ children }: ControlProps) {

    const { Urls } = useConstants()
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Entidad>(Urls.Contabilidad.Comprobantes);

    const nuevo = () => {
        editar({
            id: 0,
            tipo: null,
            nombre: '',
            prefijo: '',
            excento: false,
            empresa: null,
            activo: true
        })
    }

    return (
        <ComprobantesContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </ComprobantesContext.Provider>
    )
}
export default ComprobantesProvider;
