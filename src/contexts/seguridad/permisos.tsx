import { createContext } from "react";
import { GlobalContextState } from "../../reducers/global";
import { ControlProps } from "../../interfaces/globales";
import { Urls } from "../../components/rutas";
import { useReducerHook } from "../../hooks/useReducer";
import { Permiso } from "../../interfaces/seguridad";

interface Entidad extends Permiso {}

export const PermisosContext = createContext<GlobalContextState<Entidad>>({} as GlobalContextState<Entidad>)

function PermisosProvider({ children }: ControlProps) {
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
