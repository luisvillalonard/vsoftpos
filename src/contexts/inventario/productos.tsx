import { createContext } from "react"
import { ACTIONS, GlobalContextState } from "../../reducers/global"
import { ControlProps, ResponseResult } from "../../interfaces/globales"
import { useReducerHook } from "../../hooks/useReducer"
import { Producto, ProductoPos } from "../../interfaces/inventario"
import { useFetch } from "../../hooks/useFetch"
import { useConstants } from "../../hooks/useConstants"

export interface ProductoContextState<T> extends GlobalContextState<T> {
    nuevo: () => void,
    toList: () => Promise<ResponseResult<ProductoPos[]>>,
};

export const ProductosContext = createContext<ProductoContextState<Producto>>({} as ProductoContextState<Producto>)

function ProductosProvider({ children }: ControlProps) {

    const { Urls } = useConstants()
    const { state, dispatch, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Producto>(Urls.Inventario.Productos);
    const api = useFetch();

    const nuevo = () => {
        editar({
            id: 0,
            esProducto: true,
            especifico: false,
            detallable: false,
            codigo: null,
            nombre: '',
            descripcion: null,
            codigoBarra: null,
            grupo: null,
            seCompra: false,
            categoria606: null,
            seVende: false,
            categoria607: null,
            suplidor: null,
            impuesto: null,
            costo: 0,
            precio: 0,
            reorden: 0,
            ventaSinStock: false,
            costoCc: null,
            ventaCc: null,
            descuentoCc: null,
            stock: [],
            foto: null,
            activo: true,
        })
    }

    const toList = async (): Promise<ResponseResult<ProductoPos[]>> => {
        dispatch({ type: ACTIONS.FETCHING });
        let resp: ResponseResult<ProductoPos[]>;
        
        try 
        {
            resp = await api.Get<ProductoPos[]>(`${Urls.Inventario.Productos}/tolist`);
        } catch (error: any) {
            let message = 'Situación inesperada tratando de ejecutar la petición'
            if (error instanceof Error) message = error.message
            return Promise.resolve({
                ok: false,
                mensaje: message,
            } as ResponseResult<ProductoPos[]>)
        }

        dispatch({ type: ACTIONS.FETCH_COMPLETE });
        return resp;
    }

    return (
        <ProductosContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
            toList,
        }}>
            {children}
        </ProductosContext.Provider>
    )
}
export default ProductosProvider;
