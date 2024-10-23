import { createContext } from "react";
import { GlobalContextState } from "../../reducers/global";
import { ControlProps } from "../../interfaces/globales";
import { Urls } from "../../components/rutas";
import { useReducerHook } from "../../hooks/useReducer";
import { FormaPago } from "../../interfaces/configuraciones";

interface Entidad extends FormaPago {}
export interface FormaPagoContextState<T> extends GlobalContextState<T> {
    nuevo: () => void
};

export const FormaPagosContext = createContext<FormaPagoContextState<Entidad>>({} as FormaPagoContextState<Entidad>)

function FormaPagosProvider({ children }: ControlProps) {
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Entidad>(Urls.Configuraciones.FormasPago);

    const nuevo = () => {
        editar({
            id: 0,
            nombre: '',
            descripcion: null,
            primaria: false,
            aplicaEnFactura: false,
            aplicaEnCuadre: false,
            referencia: false,
            activa: true,
        })
    }

    return (
        <FormaPagosContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </FormaPagosContext.Provider>
    )
}
export default FormaPagosProvider;
