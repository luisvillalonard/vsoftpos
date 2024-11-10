import { createContext } from "react"
import { GlobalContextState } from "../../reducers/global"
import { ControlProps } from "../../interfaces/globales"
import { Empresa, Horario } from "../../interfaces/empresas"
import { useReducerHook } from "../../hooks/useReducer"
import { useConstants } from "../../hooks/useConstants"

interface Entidad extends Horario {}
export interface HorarioContextState<T> extends GlobalContextState<T> {
    nuevo: () => void
};

export const HorariosContext = createContext<HorarioContextState<Entidad>>({} as HorarioContextState<Entidad>)

function HorariosProvider({ children }: ControlProps) {

    const { Urls } = useConstants()
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Entidad>(Urls.Empresas.Horarios);

    const nuevo = () => {
        editar({
            id: 0,
            nombre: '',
            horaInicio: '',
            horaFin: '',
            empresa: {} as Empresa,
            activo: true
        })
    }

    return (
        <HorariosContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </HorariosContext.Provider>
    )
}
export default HorariosProvider;
