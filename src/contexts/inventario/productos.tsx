import { createContext } from "react";
import { ACTIONS, GlobalContextState } from "../../reducers/global";
import { ControlProps, ResponseResult } from "../../interfaces/globales";
import { Urls } from "../../components/rutas";
import { useReducerHook } from "../../hooks/useReducer";
import { Producto, ProductoPuntoVenta } from "../../interfaces/inventario";
import { useFetch } from "../../hooks/useFetch";

export interface ProductoContextState<T> extends GlobalContextState<T> {
    nuevo: () => void,
    toList: () => Promise<ResponseResult<ProductoPuntoVenta[]>>,
};

export const ProductosContext = createContext<ProductoContextState<Producto>>({} as ProductoContextState<Producto>)

function ProductosProvider({ children }: ControlProps) {
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
            stock: null,
            foto: null,
            activo: true,
        })
    }

    const toList = async (): Promise<ResponseResult<ProductoPuntoVenta[]>> => {
        dispatch({ type: ACTIONS.FETCHING });
        let resp: ResponseResult<ProductoPuntoVenta[]>;
        
        try 
        {
            resp = await api.Get<ProductoPuntoVenta[]>(`${Urls.Inventario.Productos}/tolist`);
        } catch (error: any) {
            let message = 'Situación inesperada tratando de ejecutar la petición'
            if (error instanceof Error) message = error.message
            return Promise.resolve({
                ok: false,
                mensaje: message,
            } as ResponseResult<ProductoPuntoVenta[]>)
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
