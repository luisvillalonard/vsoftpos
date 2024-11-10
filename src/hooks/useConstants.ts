export const secretKey = 'D7B9F2FD64B04F18B4D1EC4869FC52BA';

export function useConstants() {

    const API_URL = {
        Base: import.meta.env.PROD ? 'https://www.factuvapi.somee.com' : 'https://localhost/factuv.api',
        //Base: 'https://localhost:44340',

        ApiDefaultProps: {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
                mode: 'cors', // no-cors, *cors, same-origin,
                Authorization: '',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: undefined // body data type must match "Content-Type" header
        }
    }

    const Urls = {
        Home: '/',
        Login: '/login',
        Empresas: {
            Base: 'empresas',
            Horarios: 'horarios',
            Posiciones: 'posiciones',
            Empleados: 'empleados',
        },
        Inventario: {
            Base: 'inventario',
            Almacenes: 'almacenes',
            Empaques: 'empaques',
            Medidas: 'medidas',
            Productos: 'productos',
            Unidades: 'medidas/unidades',
        },
        Compras: {
            Base: 'compras',
            Facturas: 'facturas',
            Suplidores: 'suplidores',
            Gastos: 'gastos',
            GastosTipos: 'gastos/tipos',
        },
        Ventas: {
            Base: 'ventas',
            Clientes: 'clientes',
            PuntoDeVenta: 'pos',
            Facturas: 'facturas',
            PagosFacturas: 'facturas/pagos',
        },
        Contabilidad: {
            Base: 'contabilidad',
            Bancos: 'bancos',
            CatalogoCc: 'catalogoCc',
            CuentasBancos: 'cuentasBancos',
            Comprobantes: 'comprobantes',
            ComprobantesTipos: 'comprobantes/tipos',
            ComprobantesSecuencias: 'comprobantes/secuencias',
        },
        Seguridad: {
            Base: 'seguridad',
            Roles: 'roles',
            Permisos: 'permisos',
            Usuarios: 'usuarios',
            Validar: 'validar',
            CambiarClave: 'cambioClave/:codigo',
        },
        Configuraciones: {
            Base: 'configuraciones',
            Grupos: 'grupos',
            FormasPago: 'formasPago',
            CondicionesPago: 'condicionesPago',
            FacturasTipos: 'facturas/tipos',
            Impuestos: 'impuestos',
        },
        Auxiliares: {
            Base: 'auxiliares',
            Generos: 'generos',
            Billetes: 'billetes',
        }
    }

    const Colors = {
        Font: {
            Primary: '#85a5ff',
            Success: '#95de64',
            Warning: '#ffd666',
            Danger: '#ff4d4f',
        },
        Bg: {
            Primary: '#85a5ff',
            Success: '#95de64',
            Warning: '#ffd666',
            Danger: '#ff4d4f',
        },
        Border: {
            Secondary: "#969696e0"
        },
        White: "#FFFFFF",
    }

    return {
        API_URL,
        Urls,
        Colors,
    }

}
