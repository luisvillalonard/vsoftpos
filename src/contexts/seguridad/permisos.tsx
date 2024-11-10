import { createContext } from "react"
import { GlobalContextState } from "../../reducers/global"
import { ControlProps } from "../../interfaces/globales"
import { useReducerHook } from "../../hooks/useReducer"
import { Permiso } from "../../interfaces/seguridad"
import { useConstants } from "../../hooks/useConstants"

interface Entidad extends Permiso {}

export const PermisosContext = createContext<GlobalContextState<Entidad>>({} as GlobalContextState<Entidad>)

function PermisosProvider({ children }: ControlProps) {

    const { Urls } = useConstants()
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Entidad>(Urls.Seguridad.Permisos);

    return (
        <PermisosContext.Provider value={{
            state,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </PermisosContext.Provider>
    )
}
export default PermisosProvider;
