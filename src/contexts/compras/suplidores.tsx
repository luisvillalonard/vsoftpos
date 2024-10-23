import { createContext } from "react";
import { GlobalContextState } from "../../reducers/global";
import { ControlProps } from "../../interfaces/globales";
import { Urls } from "../../components/rutas";
import { useReducerHook } from "../../hooks/useReducer";
import { Suplidor } from "../../interfaces/compras";

interface Entidad extends Suplidor {}
export interface SuplidorContextState<T> extends GlobalContextState<T> {
    nuevo: () => void
};

export const SuplidoresContext = createContext<SuplidorContextState<Entidad>>({} as SuplidorContextState<Entidad>)

function SuplidoresProvider({ children }: ControlProps) {
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Entidad>(Urls.Compras.Suplidores);

    const nuevo = () => {
        editar({
            id: 0,
            fechaIngreso: new Date().toISOString().slice(0, 10),
            esEmpresa: true,
            nombre: '',
            cedula: null,
            rnc: null,
            direccion: null,
            telefono: null,
            correo: null,
            informal: false,
            condicionPago: null,
            credito: false,
            activo: true,
        })
    }

    return (
        <SuplidoresContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </SuplidoresContext.Provider>
    )
}
export default SuplidoresProvider;
