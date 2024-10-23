import { createContext } from "react";
import { GlobalContextState } from "../../reducers/global";
import { ControlProps } from "../../interfaces/globales";
import { Urls } from "../../components/rutas";
import { useReducerHook } from "../../hooks/useReducer";
import { Cliente } from "../../interfaces/ventas";

export interface ClienteContextState<T> extends GlobalContextState<T> {
    nuevo: () => void,
};

export const ClientesContext = createContext<ClienteContextState<Cliente>>({} as ClienteContextState<Cliente>)

function ClientesProvider({ children }: ControlProps) {
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Cliente>(Urls.Ventas.Clientes);

    const nuevo = () => {
        editar({
            id: 0,
            fechaIngreso: new Date().toISOString().slice(0, 10),
            esEmpresa: true,
            generico: false,
            nombre: '',
            cedula: null,
            rnc: null,
            direccion: null,
            telefono: null,
            correo: null,
            condicionPago: null,
            comprobante: null,
            credito: null,
            activo: true,
        })
    }

    return (
        <ClientesContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </ClientesContext.Provider>
    )
}
export default ClientesProvider;
