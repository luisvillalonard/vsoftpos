import { createContext } from "react"
import { GlobalContextState } from "../../reducers/global"
import { ControlProps } from "../../interfaces/globales"
import { useReducerHook } from "../../hooks/useReducer"
import { GastoTipo } from "../../interfaces/compras"
import { useConstants } from "../../hooks/useConstants"

interface Entidad extends GastoTipo {}
export interface GastoTipoContextState<T> extends GlobalContextState<T> {
    nuevo: () => void
};

export const GastosTiposContext = createContext<GastoTipoContextState<Entidad>>({} as GastoTipoContextState<Entidad>)

function GastosTiposProvider({ children }: ControlProps) {

    const { Urls } = useConstants()
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Entidad>(Urls.Compras.GastosTipos);

    const nuevo = () => {
        editar({
            id: 0,
            nombre: '',
            descripcion: '',
            activo: true
        })
    }

    return (
        <GastosTiposContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </GastosTiposContext.Provider>
    )
}
export default GastosTiposProvider;
