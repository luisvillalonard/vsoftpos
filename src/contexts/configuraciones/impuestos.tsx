import { createContext } from "react"
import { GlobalContextState } from "../../reducers/global"
import { ControlProps } from "../../interfaces/globales"
import { useReducerHook } from "../../hooks/useReducer"
import { Impuesto } from "../../interfaces/contabilidad"
import { useConstants } from "../../hooks/useConstants"

interface Entidad extends Impuesto {}
export interface ImpuestoContextState<T> extends GlobalContextState<T> {
    nuevo: () => void
};

export const ImpuestosContext = createContext<ImpuestoContextState<Entidad>>({} as ImpuestoContextState<Entidad>)

function ImpuestosProvider({ children }: ControlProps) {

    const { Urls } = useConstants()
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Entidad>(Urls.Configuraciones.Impuestos);

    const nuevo = () => {
        editar({
            id: 0,
            codigo: '',
            nombre: '',
            tasa: 0,
            activo: true
        })
    }

    return (
        <ImpuestosContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </ImpuestosContext.Provider>
    )
}
export default ImpuestosProvider;
