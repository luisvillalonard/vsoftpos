import { createContext } from "react"
import { GlobalContextState } from "../../reducers/global"
import { ControlProps } from "../../interfaces/globales"
import { CatalogoCc } from "../../interfaces/contabilidad"
import { useReducerHook } from "../../hooks/useReducer"
import { useConstants } from "../../hooks/useConstants"

interface Entidad extends CatalogoCc {}
export interface CatalogoCcContextState<T> extends GlobalContextState<T> {
    nuevo: () => void
};

export const CatalogoCcContext = createContext<CatalogoCcContextState<Entidad>>({} as CatalogoCcContextState<Entidad>)

function CatalogoCcProvider({ children }: ControlProps) {

    const { Urls } = useConstants()
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Entidad>(Urls.Contabilidad.CatalogoCc);

    const nuevo = () => {
        editar({
            id: 0,
            nombre: '',
            codigo: '',
            grupo: 0,
            nivel1: null,
            nivel2: null,
            nivel3: null,
        })
    }

    return (
        <CatalogoCcContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </CatalogoCcContext.Provider>
    )
}
export default CatalogoCcProvider;
