import { createContext } from "react";
import { GlobalContextState } from "../../reducers/global";
import { ControlProps } from "../../interfaces/globales";
import { Urls } from "../../components/rutas";
import { Empleado, Empresa } from "../../interfaces/empresas";
import { useReducerHook } from "../../hooks/useReducer";

export interface EmpleadoContextState<T> extends GlobalContextState<T> {
    nuevo: () => void
};

export const EmpleadosContext = createContext<EmpleadoContextState<Empleado>>({} as EmpleadoContextState<Empleado>)

function EmpleadosProvider({ children }: ControlProps) {
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Empleado>(Urls.Empresas.Empleados);

    const nuevo = () => {
        editar({
            id: 0,
            nombre: '',
            genero: null,
            cedula: null,
            pasaporte: null,
            horario: null,
            posicion: null,
            empresa: {} as Empresa,
            salario: 0,
            fechaEntrada: null,
            fechaSalida: null,
            correo: null,
            foto: null,
            activo: true
        })
    }

    return (
        <EmpleadosContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </EmpleadosContext.Provider>
    )
}
export default EmpleadosProvider;
