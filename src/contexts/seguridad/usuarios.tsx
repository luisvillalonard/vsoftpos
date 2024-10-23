import { createContext } from "react";
import { ACTIONS, GlobalContextState } from "../../reducers/global";
import { ControlProps, ResponseResult } from "../../interfaces/globales";
import { useFetch } from "../../hooks/useFetch";
import { Login, UserApp, Usuario, UsuarioCambioClave } from "../../interfaces/seguridad";
import { Urls } from "../../components/rutas";
import { useReducerHook } from "../../hooks/useReducer";

export interface UsuariosContextState<T> extends GlobalContextState<T> {
    nuevo: () => void,
    validar: (item: Login) => Promise<ResponseResult<UserApp>>,
    porCodigo: (codigo: string) => Promise<ResponseResult<T>>,
    cambiarClave: (item: UsuarioCambioClave) => Promise<ResponseResult<UserApp>>,
}

export const UsuariosContext = createContext<UsuariosContextState<Usuario>>({} as UsuariosContextState<Usuario>)

function UsuariosProvider({ children }: ControlProps) {
    const { state, dispatch, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Usuario>(Urls.Seguridad.Usuarios.Base);
    const api = useFetch();

    const nuevo = async (): Promise<void> => {
        editar({
            id: 0,
            acceso: '',
            cambio: false,
            empleado: null,
            rol: null,
            empresa: null,
            enviarCorreo: false,
            activo: false
        });
    }

    const porCodigo = async (codigo: string): Promise<ResponseResult<Usuario>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<Usuario>(`${Urls.Seguridad.Usuarios.Base}/${codigo}`);
        dispatch({ type: ACTIONS.FETCH_COMPLETE, recargar: false });
        return resp;
    }

    const cambiarClave = async (item: UsuarioCambioClave): Promise<ResponseResult<UserApp>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Post<UserApp>(Urls.Seguridad.Usuarios.CambiarClave.replace('/:codigo', ''), item);
        dispatch({ type: ACTIONS.FETCH_COMPLETE, recargar: true });
        return resp;
    }

    const validar = async (item: Login): Promise<ResponseResult<UserApp>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Post<UserApp>(Urls.Seguridad.Usuarios.Validar, item);
        dispatch({ type: ACTIONS.FETCH_COMPLETE, recargar: false });
        return resp;
    }

    return (
        <UsuariosContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
            porCodigo,
            cambiarClave,
            validar,
        }}>
            {children}
        </UsuariosContext.Provider>
    )
}
export default UsuariosProvider;
