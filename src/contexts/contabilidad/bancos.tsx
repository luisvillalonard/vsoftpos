import { createContext } from "react";
import { GlobalContextState } from "../../reducers/global";
import { ControlProps } from "../../interfaces/globales";
import { Urls } from "../../components/rutas";
import { Banco } from "../../interfaces/contabilidad";
import { useReducerHook } from "../../hooks/useReducer";

interface Entidad extends Banco {}
export interface BancoContextState<T> extends GlobalContextState<T> {
    nuevo: () => void
};

export const BancosContext = createContext<BancoContextState<Entidad>>({} as BancoContextState<Entidad>)

function BancosProvider({ children }: ControlProps) {
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Entidad>(Urls.Contabilidad.Bancos);

    const nuevo = () => {
        editar({
            id: 0,
            nombre: '',
            activo: true,
        })
    }

    return (
        <BancosContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </BancosContext.Provider>
    )
}
export default BancosProvider;
