import { createContext, useReducer } from "react";
import { ControlProps, ResponseResult } from "../../interfaces/globales";
import { Login, UserApp } from "../../interfaces/seguridad";
import { useFetch } from "../../hooks/useFetch";
import authReducer, { initState } from "../../reducers/auth";
import { getCookie, removeCookie, setCookie } from "../../hooks/useCookies";
import { Urls } from "../../components/rutas";

export interface AuthState {
    user: UserApp | null;
    isLogged: boolean;
    viewMenu: boolean;
    viewInfoUser: boolean,
    procesando: boolean,
}

export interface AuthReducerState {
    state: AuthState,
    validar: (user: Login) => Promise<ResponseResult<UserApp>>,
    LoggedIn: (user: UserApp) => void,
    LoggedOut: () => void,
    showMenu: () => void,
    showUserInfo: () => void,
    getUser: () => void
}

export const AuthContext = createContext<AuthReducerState>({} as AuthReducerState);

export const AuthProvider = ({ children }: ControlProps) => {

    const [state, dispatch] = useReducer(authReducer, initState);
    const api = useFetch();

    const validar = async (user: Login): Promise<ResponseResult<UserApp>> => {
        dispatch({ type: 'FETCHING' })
        const resp = await api.Post<UserApp>(Urls.Seguridad.Usuarios.Validar, user);
        if (resp.ok) {
            LoggedIn(resp.datos as UserApp);
        }
        dispatch({ type: 'FETCH_COMPLETE' })
        return resp;
    }

    const getUser = (): UserApp | null => {
        const valor: UserApp | null = getCookie();
        if (valor) {
            dispatch({ type: 'SIGN_IN', payload: valor })
        } else {
            dispatch({ type: 'SIGN_OUT' })
        }
        return valor;
    }

    const LoggedIn = (user: UserApp) => {
        setCookie(user);
        dispatch({ type: 'SIGN_IN', payload: user })
    }

    const LoggedOut = () => {
        removeCookie();
        dispatch({ type: 'SIGN_OUT' })
    }
    
    const showMenu = () => {
        dispatch({ type: 'SHOW_MENU' })
    }
    
    const showUserInfo = () => {
        dispatch({ type: 'SHOW_USER_INFO' })
    }
    
    return (
        <AuthContext.Provider value={{
            state,
            validar,
            LoggedIn,
            LoggedOut,
            getUser,
            showMenu,
            showUserInfo,
}}>
            {children}
        </AuthContext.Provider>
    )
}