import { createContext } from "react";
import { GlobalContextState } from "../../reducers/global";
import { ControlProps } from "../../interfaces/globales";
import { Urls } from "../../components/rutas";
import { useReducerHook } from "../../hooks/useReducer";
import { Grupo } from "../../interfaces/configuraciones";

interface Entidad extends Grupo {}
export interface GrupoContextState<T> extends GlobalContextState<T> {
    nuevo: () => void
};

export const GruposContext = createContext<GrupoContextState<Entidad>>({} as GrupoContextState<Entidad>)

function GruposProvider({ children }: ControlProps) {
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Entidad>(Urls.Configuraciones.Grupos);

    const nuevo = () => {
        editar({
            id: 0,
            nombre: '',
            descripcion: null,
            cliente: false,
            suplidor: false,
            producto: false,
            servicio: false,
            activo: true
        })
    }

    return (
        <GruposContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </GruposContext.Provider>
    )
}
export default GruposProvider;
