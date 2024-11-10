import { createContext } from "react"
import { GlobalContextState } from "../../reducers/global"
import { ControlProps } from "../../interfaces/globales"
import { Empresa, Posicion } from "../../interfaces/empresas"
import { useReducerHook } from "../../hooks/useReducer"
import { useConstants } from "../../hooks/useConstants"

interface Entidad extends Posicion {}
export interface PosicionContextState<T> extends GlobalContextState<T> {
    nuevo: () => void
};

export const PosicionesContext = createContext<PosicionContextState<Entidad>>({} as PosicionContextState<Entidad>)

function PosicionesProvider({ children }: ControlProps) {

    const { Urls } = useConstants()
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Entidad>(Urls.Empresas.Posiciones);

    const nuevo = () => {
        editar({
            id: 0,
            nombre: '',
            descripcion: '',
            sueldo: 0,
            empresa: {} as Empresa,
            activa: true
        })
    }

    return (
        <PosicionesContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </PosicionesContext.Provider>
    )
}
export default PosicionesProvider;
