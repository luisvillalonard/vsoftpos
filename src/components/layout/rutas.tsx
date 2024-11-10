import { Route, Routes } from 'react-router-dom'
import HomePage from '../../pages/home'
import LoginPage from '../../pages/seguridad/login'
import PageNotFound from '../../pages/notFound'
import HorariosPage from '../../pages/empresas/horarios/page'
import PosicionesPage from '../../pages/empresas/posiciones/page'
import EmpleadosPage from '../../pages/empresas/empleados/page'
import EmpresasPage from '../../pages/empresas/empresas/page'
import AlmacenesPage from '../../pages/inventario/almacenes/page'
import EmpaquesPage from '../../pages/inventario/empaques/page'
import MedidasPage from '../../pages/inventario/medidas/page'
import UnidadesMedidaPage from '../../pages/inventario/unidades/page'
import ProductosPage from '../../pages/inventario/productos/page'
import GruposPage from '../../pages/configuraciones/grupos/page'
import ImpuestosPage from '../../pages/configuraciones/impuestos/page'
import FacturasTiposPage from '../../pages/configuraciones/facturasTipos/page'
import FormasPagoPage from '../../pages/configuraciones/formasPago/page'
import CondicionesPagoPage from '../../pages/configuraciones/condicionesPago/page'
import GastosTiposPage from '../../pages/compras/gastosTipos/page'
import GastosPage from '../../pages/compras/gastos/page'
import SuplidoresPage from '../../pages/compras/suplidores/page'
import ClientesPage from '../../pages/ventas/clientes/page'
import ComprobantesPage from '../../pages/contabilidad/comprobantes/page'
import BancosPage from '../../pages/contabilidad/bancos/page'
import CuentasBancosPage from '../../pages/contabilidad/cuentasBancos/page'
import CuentasContablesPage from '../../pages/contabilidad/catalogoCc/page'
import PosPage from '../../pages/ventas/pos/page'
import FacturasPage from '../../pages/ventas/facturas/page'
import FacturasPagosPage from '../../pages/ventas/facturaPagos/page'
import UsuariosPage from '../../pages/seguridad/usuarios/page'
import RolesPage from '../../pages/seguridad/roles/page'
import { useConstants } from '../../hooks/useConstants'

const RutasApp = () => {

    const { Urls } = useConstants()

    return (
        <Routes>
            <Route path={Urls.Home} element={<HomePage />} />
            <Route path={Urls.Login} element={<LoginPage />} />
            <Route path='*' element={<PageNotFound />} />
            <Route path={Urls.Empresas.Base}>
                <Route path={Urls.Empresas.Horarios} element={<HorariosPage />} />
                <Route path={Urls.Empresas.Posiciones} element={<PosicionesPage />} />
                <Route path={Urls.Empresas.Empleados} element={<EmpleadosPage />} />
                <Route path={Urls.Empresas.Base} element={<EmpresasPage />} />
            </Route>
            <Route path={Urls.Inventario.Base}>
                <Route path={Urls.Inventario.Almacenes} element={<AlmacenesPage />} />
                <Route path={Urls.Inventario.Empaques} element={<EmpaquesPage />} />
                <Route path={Urls.Inventario.Medidas} element={<MedidasPage />} />
                <Route path={Urls.Inventario.Unidades} element={<UnidadesMedidaPage />} />
                <Route path={Urls.Inventario.Productos} element={<ProductosPage />} />
            </Route>
            <Route path={Urls.Compras.Base}>
                <Route path={Urls.Compras.Gastos} element={<GastosPage />} />
                <Route path={Urls.Compras.GastosTipos} element={<GastosTiposPage />} />
                <Route path={Urls.Compras.Suplidores} element={<SuplidoresPage />} />
            </Route>
            <Route path={Urls.Ventas.Base}>
                <Route path={Urls.Ventas.PuntoDeVenta} element={<PosPage />} />
                <Route path={Urls.Ventas.Clientes} element={<ClientesPage />} />
                <Route path={Urls.Ventas.Facturas} element={<FacturasPage />} />
                <Route path={Urls.Ventas.PagosFacturas} element={<FacturasPagosPage />} />
            </Route>
            <Route path={Urls.Contabilidad.Base}>
                <Route path={Urls.Contabilidad.Bancos} element={<BancosPage />} />
                <Route path={Urls.Contabilidad.CuentasBancos} element={<CuentasBancosPage />} />
                <Route path={Urls.Contabilidad.CatalogoCc} element={<CuentasContablesPage />} />
                <Route path={Urls.Contabilidad.Comprobantes} element={<ComprobantesPage />} />
            </Route>
            <Route path={Urls.Seguridad.Base}>
                <Route path={Urls.Seguridad.Roles} element={<RolesPage />} />
                <Route path={Urls.Seguridad.Permisos} element={<></>} />
                <Route path={Urls.Seguridad.Usuarios} element={<UsuariosPage />} />
            </Route>
            <Route path={Urls.Configuraciones.Base}>
                <Route path={Urls.Configuraciones.Grupos} element={<GruposPage />} />
                <Route path={Urls.Configuraciones.FormasPago} element={<FormasPagoPage />} />
                <Route path={Urls.Configuraciones.CondicionesPago} element={<CondicionesPagoPage />} />
                <Route path={Urls.Configuraciones.FacturasTipos} element={<FacturasTiposPage />} />
                <Route path={Urls.Configuraciones.Impuestos} element={<ImpuestosPage />} />
            </Route>

        </Routes>
    )

}
export default RutasApp