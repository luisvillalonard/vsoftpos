import { createContext } from "react";
import { GlobalContextState } from "../../reducers/global";
import { ControlProps } from "../../interfaces/globales";
import { Urls } from "../../components/rutas";
import { useReducerHook } from "../../hooks/useReducer";
import { Genero } from "../../interfaces/auxiliares";

interface Entidad extends Genero {}

export const GenerosContext = createContext<Pick<GlobalContextState<Entidad>, "state" | "todos">>(
    {} as Pick<GlobalContextState<Entidad>, "state" | "todos">
)

function GenerosProvider({ children }: ControlProps) {
    const { state, todos } = useReducerHook<Entidad>(Urls.Auxiliares.Generos);

    return (
        <GenerosContext.Provider value={{
            state,
            todos,
        }}>
            {children}
        </GenerosContext.Provider>
    )
}
export default GenerosProvider;
