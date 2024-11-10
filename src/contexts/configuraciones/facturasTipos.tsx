import { createContext } from "react"
import { GlobalContextState } from "../../reducers/global"
import { ControlProps } from "../../interfaces/globales"
import { useReducerHook } from "../../hooks/useReducer"
import { FacturaTipo } from "../../interfaces/configuraciones"
import { useConstants } from "../../hooks/useConstants"

interface Entidad extends FacturaTipo {}
export interface FacturaTipoContextState<T> extends GlobalContextState<T> {
    nuevo: () => void
};

export const FacturaTiposContext = createContext<FacturaTipoContextState<Entidad>>({} as FacturaTipoContextState<Entidad>)

function FacturaTiposProvider({ children }: ControlProps) {

    const { Urls } = useConstants()
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Entidad>(Urls.Configuraciones.FacturasTipos);

    const nuevo = () => {
        editar({
            id: 0,
            descripcion: '',
            primaria: false,
            requiereMonto: false,
        })
    }

    return (
        <FacturaTiposContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </FacturaTiposContext.Provider>
    )
}
export default FacturaTiposProvider;
