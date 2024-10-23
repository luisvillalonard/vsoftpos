import { createContext } from "react";
import { GlobalContextState } from "../../reducers/global";
import { ControlProps } from "../../interfaces/globales";
import { Urls } from "../../components/rutas";
import { CuentaBanco } from "../../interfaces/contabilidad";
import { useReducerHook } from "../../hooks/useReducer";

interface Entidad extends CuentaBanco {}
export interface CuentaBancoContextState<T> extends GlobalContextState<T> {
    nuevo: () => void
};

export const CuentasBancosContext = createContext<CuentaBancoContextState<Entidad>>({} as CuentaBancoContextState<Entidad>)

function CuentasBancosProvider({ children }: ControlProps) {
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Entidad>(Urls.Contabilidad.CuentasBancos);

    const nuevo = () => {
        editar({
            id: 0,
            banco: null,
            empresa: null,
            numeroCuenta: '',
            fechaApertura: null,
            monto: 0,
            activa: true,
        })
    }

    return (
        <CuentasBancosContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </CuentasBancosContext.Provider>
    )
}
export default CuentasBancosProvider;
