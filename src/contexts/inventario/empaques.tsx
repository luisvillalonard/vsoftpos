import { createContext } from "react";
import { GlobalContextState } from "../../reducers/global";
import { ControlProps } from "../../interfaces/globales";
import { Urls } from "../../components/rutas";
import { useReducerHook } from "../../hooks/useReducer";
import { Empaque } from "../../interfaces/inventario";

interface Entidad extends Empaque {}
export interface EmpaqueContextState<T> extends GlobalContextState<T> {
    nuevo: () => void
};

export const EmpaquesContext = createContext<EmpaqueContextState<Entidad>>({} as EmpaqueContextState<Entidad>)

function EmpaquesProvider({ children }: ControlProps) {
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Entidad>(Urls.Inventario.Empaques);

    const nuevo = () => {
        editar({
            id: 0,
            nombre: '',
            unidades: 0,
            activo: true
        })
    }

    return (
        <EmpaquesContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </EmpaquesContext.Provider>
    )
}
export default EmpaquesProvider;
