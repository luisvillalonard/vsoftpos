import { createContext } from "react";
import { GlobalContextState } from "../../reducers/global";
import { ControlProps } from "../../interfaces/globales";
import { Urls } from "../../components/rutas";
import { useReducerHook } from "../../hooks/useReducer";
import { Medida } from "../../interfaces/inventario";

interface Entidad extends Medida {}
export interface MedidaContextState<T> extends GlobalContextState<T> {
    nuevo: () => void
};

export const MedidasContext = createContext<MedidaContextState<Entidad>>({} as MedidaContextState<Entidad>)

function MedidasProvider({ children }: ControlProps) {
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Entidad>(Urls.Inventario.Medidas);

    const nuevo = () => {
        editar({
            id: 0,
            nombre: '',
        })
    }

    return (
        <MedidasContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </MedidasContext.Provider>
    )
}
export default MedidasProvider;
