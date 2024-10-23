import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home";
import LoginPage from "../pages/seguridad/login";
import PageNotFound from "../pages/notFound";
import { MenuItems } from "../interfaces/globales";
import HorariosPage from "../pages/empresas/horarios/page";
import PosicionesPage from "../pages/empresas/posiciones/page";
import EmpleadosPage from "../pages/empresas/empleados/page";
import EmpresasPage from "../pages/empresas/empresas/page";
import AlmacenesPage from "../pages/inventario/almacenes/page";
import EmpaquesPage from "../pages/inventario/empaques/page";
import MedidasPage from "../pages/inventario/medidas/page";
import UnidadesMedidaPage from "../pages/inventario/unidades/page";
import ProductosPage from "../pages/inventario/productos/page";
import GruposPage from "../pages/configuraciones/grupos/page";
import ImpuestosPage from "../pages/configuraciones/impuestos/page";
import FacturasTiposPage from "../pages/configuraciones/facturasTipos/page";
import FormasPagoPage from "../pages/configuraciones/formasPago/page";
import CondicionesPagoPage from "../pages/configuraciones/condicionesPago/page";
import GastosTiposPage from "../pages/compras/gastosTipos/page";
import GastosPage from "../pages/compras/gastos/page";
import SuplidoresPage from "../pages/compras/suplidores/page";
import ClientesPage from "../pages/ventas/clientes/page";
import ComprobantesPage from "../pages/contabilidad/comprobantes/page";
import BancosPage from "../pages/contabilidad/bancos/page";
import CuentasBancosPage from "../pages/contabilidad/cuentasBancos/page";
import CuentasContablesPage from "../pages/contabilidad/catalogoCc/page";
import PosPage from "../pages/ventas/pos/page";
import FacturasPage from "../pages/ventas/facturas/page";
import FacturasPagosPage from "../pages/ventas/facturaPagos/page";
import UsuariosPage from "../pages/seguridad/usuarios/page";
import RolesPage from "../pages/seguridad/roles/page";

export const Urls = {
    Home: '/',
    Login: '/login',
    Empresas: {
        Base: 'empresas',
        Horarios: 'horarios',
        Posiciones: 'posiciones',
        Empleados: 'empleados',
    },
    Inventario: {
        Almacenes: 'almacenes',
        Empaques: 'empaques',
        Medidas: 'medidas',
        Productos: 'productos',
        Unidades: 'medidas/unidades',
    },
    Compras: {
        Compras: 'compras',
        Gastos: 'gastos',
        GastosTipos: 'gastos/tipos',
        Suplidores: 'suplidores',
    },
    Ventas: {
        Clientes: 'clientes',
        PuntoDeVenta: 'pos',
        Facturas: 'facturas',
        PagosFacturas: 'facturas/pagos',
    },
    Contabilidad: {
        Bancos: 'bancos',
        CatalogoCc: 'catalogoCc',
        CuentasBancos: 'cuentasBancos',
        Comprobantes: 'comprobantes',
        ComprobantesTipos: 'comprobantes/tipos',
        ComprobantesSecuencias: 'comprobantes/secuencias',
    },
    Seguridad: {
        Roles: 'roles',
        Permisos: 'permisos',
        Usuarios: {
            Base: 'usuarios',
            Validar: 'usuarios/validar',
            CambiarClave: 'usuarios/cambioClave/:codigo',
        },
    },
    Configuraciones: {
        Grupos: 'grupos',
        FormasPago: 'formasPago',
        CondicionesPago: 'condicionesPago',
        FacturasTipos: 'facturas/tipos',
        Impuestos: 'impuestos',
    },
    Auxiliares: {
        Generos: 'generos',
        Billetes: 'billetes',
    }
}

export const menuItems: Readonly<MenuItems>[] = [
    {
        key: '1', label: 'Empresas', icon: <></>, children: [
            { key: Urls.Empresas.Horarios, label: 'Horarios', icon: <></>, element: <HorariosPage /> },
            { key: Urls.Empresas.Posiciones, label: 'Posiciones', icon: <></>, element: <PosicionesPage /> },
            { key: Urls.Empresas.Empleados, label: 'Empleados', icon: <></>, element: <EmpleadosPage /> },
            { key: Urls.Empresas.Base, label: 'Empresas', icon: <></>, element: <EmpresasPage /> },
        ]
    },
    {
        key: '2', label: 'Inventario', icon: <></>, children: [
            { key: Urls.Inventario.Almacenes, label: 'Almacenes', icon: <></>, element: <AlmacenesPage /> },
            { key: Urls.Inventario.Empaques, label: 'Empaques', icon: <></>, element: <EmpaquesPage /> },
            { key: Urls.Inventario.Medidas, label: 'Medidas', icon: <></>, element: <MedidasPage /> },
            { key: Urls.Inventario.Unidades, label: 'Unidades de Medida', icon: <></>, element: <UnidadesMedidaPage /> },
            { key: Urls.Inventario.Productos, label: 'Productos', icon: <></>, element: <ProductosPage /> },
        ]
    },
    {
        key: '3', label: 'Compras', icon: <></>, children: [
            { key: Urls.Compras.Compras, label: 'Compras', icon: <></> },
            { key: Urls.Compras.Gastos, label: 'Gastos', icon: <></>, element: <GastosPage /> },
            { key: Urls.Compras.GastosTipos, label: 'Tipos de Gastos', icon: <></>, element: <GastosTiposPage /> },
            { key: Urls.Compras.Suplidores, label: 'Suplidores', icon: <></>, element: <SuplidoresPage /> },
        ]
    },
    {
        key: '4', label: 'Ventas', icon: <></>, children: [
            { key: Urls.Ventas.PuntoDeVenta, label: 'Punto de Venta', icon: <></>, element: <PosPage /> },
            { key: Urls.Ventas.Clientes, label: 'Clientes', icon: <></>, element: <ClientesPage /> },
            { key: Urls.Ventas.Facturas, label: 'Facturas', icon: <></>, element: <FacturasPage /> },
            { key: Urls.Ventas.PagosFacturas, label: 'Pagos Facturas', icon: <></>, element: <FacturasPagosPage /> },
        ]
    },
    {
        key: '5', label: 'Contabilidad', icon: <></>, children: [
            { key: Urls.Contabilidad.Bancos, label: 'Bancos', icon: <></>, element: <BancosPage /> },
            { key: Urls.Contabilidad.CuentasBancos, label: 'Cuentas de Banco', icon: <></>, element: <CuentasBancosPage /> },
            { key: Urls.Contabilidad.CatalogoCc, label: 'Catalogo Cuentas Contables', icon: <></>, element: <CuentasContablesPage /> },
            { key: Urls.Contabilidad.Comprobantes, label: 'Comprobantes Fiscales', icon: <></>, element: <ComprobantesPage /> },
        ]
    },
    {
        key: '6', label: 'Seguridad', icon: <></>, children: [
            { key: Urls.Seguridad.Roles, label: 'Perfiles', icon: <></>, element: <RolesPage /> },
            { key: Urls.Seguridad.Permisos, label: 'Permisos', icon: <></> },
            { key: Urls.Seguridad.Usuarios.Base, label: 'Usuarios', icon: <></>, element: <UsuariosPage /> },
        ]
    },
    {
        key: '7', label: 'Configuraciones', icon: <></>, children: [
            { key: Urls.Configuraciones.Grupos, label: 'Grupos', icon: <></>, element: <GruposPage /> },
            { key: Urls.Configuraciones.FormasPago, label: 'Formas de Pago', icon: <></>, element: <FormasPagoPage /> },
            { key: Urls.Configuraciones.CondicionesPago, label: 'Condiciones de Pago', icon: <></>, element: <CondicionesPagoPage /> },
            { key: Urls.Configuraciones.FacturasTipos, label: 'Tipos de Factura', icon: <></>, element: <FacturasTiposPage /> },
            { key: Urls.Configuraciones.Impuestos, label: 'Impuestos', icon: <></>, element: <ImpuestosPage /> },
        ]
    },
]

const RutasApp = () => {
    
    return (
        <Routes>
            <Route path={Urls.Home} element={<HomePage />} />
            <Route path={Urls.Login} element={<LoginPage />} />
            <Route path="*" element={<PageNotFound />} />
            {
                menuItems
                    .filter(item => item.children !== null)
                    .reduce((acc: MenuItems[], item: MenuItems) => {
                        if (item.children) {
                            item.children.map(chil => {
                                if (chil.element) {
                                    acc.push(chil)
                                }
                            })
                        }
                        return acc;
                    }, [])
                    .map(item => <Route key={item.key} path={item.key} element={item.element} />)
            }

        </Routes>
    )

}
export default RutasApp;
