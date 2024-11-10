import { createContext } from "react"
import { GlobalContextState } from "../../reducers/global"
import { ControlProps } from "../../interfaces/globales"
import { Empresa } from "../../interfaces/empresas"
import { useReducerHook } from "../../hooks/useReducer"
import { useConstants } from "../../hooks/useConstants"

interface Entidad extends Empresa {}
export interface EmpresaContextState<T> extends GlobalContextState<T> {
    nuevo: () => void
}

export const EmpresasContext = createContext<EmpresaContextState<Entidad>>({} as EmpresaContextState<Entidad>)

function EmpresasProvider({ children }: ControlProps) {

    const { Urls } = useConstants()
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Entidad>(Urls.Empresas.Base);

    const nuevo = () => {
        editar({
            id: 0,
            nombre: '',
            rnc: '',
            direccion: '',
            telefono: '',
            webSite: null,
            fax: null,
            correo: null,
            foto: null,
            principal: true,
            empresaId: null,
            activa: true
        })
    }

    return (
        <EmpresasContext.Provider value={{
            state,
            nuevo,
            editar,
            agregar,
            actualizar,
            cancelar,
            todos,
        }}>
            {children}
        </EmpresasContext.Provider>
    )
}
export default EmpresasProvider;
