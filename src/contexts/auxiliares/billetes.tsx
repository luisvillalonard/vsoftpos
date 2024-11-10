import { createContext } from "react";
import { GlobalContextState } from "../../reducers/global";
import { ControlProps } from "../../interfaces/globales";
import { useReducerHook } from "../../hooks/useReducer";
import { Billete } from "../../interfaces/auxiliares";
import { useConstants } from "../../hooks/useConstants";

interface Entidad extends Billete {}

export const BilletesContext = createContext<Pick<GlobalContextState<Entidad>, "state" | "todos">>(
    {} as Pick<GlobalContextState<Entidad>, "state" | "todos">
)

function BilletesProvider({ children }: ControlProps) {

    const { Urls } = useConstants()
    const { state, todos } = useReducerHook<Entidad>(Urls.Auxiliares.Generos);

    return (
        <BilletesContext.Provider value={{
            state,
            todos,
        }}>
            {children}
        </BilletesContext.Provider>
    )
}
export default BilletesProvider;
