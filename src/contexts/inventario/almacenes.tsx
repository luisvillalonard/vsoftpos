import { createContext } from "react"
import { GlobalContextState } from "../../reducers/global"
import { ControlProps } from "../../interfaces/globales"
import { useReducerHook } from "../../hooks/useReducer"
import { Almacen } from "../../interfaces/inventario"
import { useConstants } from "../../hooks/useConstants"

interface Entidad extends Almacen {}
export interface AlmacenContextState<T> extends GlobalContextState<T> {
    nuevo: () => void
};

export const AlmacenesContext = createContext<AlmacenContextState<Entidad>>({} as AlmacenContextState<Entidad>)

function AlmacenesProvider({ children }: ControlProps) {

    const { Urls } = useConstants()
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Entidad>(Urls.Inventario.Almacenes);

    const nuevo = () => {
        editar({
            id: 0,
            nombre: '',
            descripcion: '',
            empresa: null,
            activo: true
        })
    }

    return (
        <AlmacenesContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </AlmacenesContext.Provider>
    )
}
export default AlmacenesProvider;
