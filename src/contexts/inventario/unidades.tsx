import { createContext } from "react"
import { GlobalContextState } from "../../reducers/global"
import { ControlProps } from "../../interfaces/globales"
import { useReducerHook } from "../../hooks/useReducer"
import { Unidad } from "../../interfaces/inventario"
import { useConstants } from "../../hooks/useConstants"

interface Entidad extends Unidad {}
export interface UnidadContextState<T> extends GlobalContextState<T> {
    nuevo: () => void
};

export const UnidadesContext = createContext<UnidadContextState<Entidad>>({} as UnidadContextState<Entidad>)

function UnidadesProvider({ children }: ControlProps) {

    const { Urls } = useConstants()
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Entidad>(Urls.Inventario.Unidades);

    const nuevo = () => {
        editar({
            id: 0,
            descripcion: '',
            medida: null,
            activa: true
        })
    }

    return (
        <UnidadesContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </UnidadesContext.Provider>
    )
}
export default UnidadesProvider;
