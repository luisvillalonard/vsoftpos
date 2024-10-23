import { createContext } from "react";
import { GlobalContextState } from "../../reducers/global";
import { ControlProps } from "../../interfaces/globales";
import { Urls } from "../../components/rutas";
import { useReducerHook } from "../../hooks/useReducer";
import { Rol } from "../../interfaces/seguridad";

export interface RolesContextState<T> extends GlobalContextState<T> {
    nuevo: () => void,
}

export const RolesContext = createContext<RolesContextState<Rol>>({} as RolesContextState<Rol>)

function RolesProvider({ children }: ControlProps) {
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Rol>(Urls.Seguridad.Roles);

    const nuevo = async (): Promise<void> => {
        editar({
            id: 0,
            nombre: '',
            esAdministrador: false
        });
    }

    return (
        <RolesContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </RolesContext.Provider>
    )
}
export default RolesProvider;
