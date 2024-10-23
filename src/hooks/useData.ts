import { useContext } from "react";
import { ContextsProviders } from "../components/providers/contexts";
import EmpresasProvider, { EmpresaContextState, EmpresasContext } from "../contexts/empresas/empresas";
import { GlobalContextState } from "../reducers/global";
import { Horario, Posicion, Empresa, Empleado } from "../interfaces/empresas";
import RolesProvider, { RolesContext, RolesContextState } from "../contexts/seguridad/roles";
import UsuariosProvider, { UsuariosContext, UsuariosContextState } from "../contexts/seguridad/usuarios";
import PermisosProvider, { PermisosContext } from "../contexts/seguridad/permisos";
import { Permiso, Rol, Usuario } from "../interfaces/seguridad";
import { AuthContext, AuthProvider, AuthReducerState } from "../contexts/seguridad/auth";
import HorariosProvider, { HorarioContextState, HorariosContext } from "../contexts/empresas/horarios";
import PosicionesProvider, { PosicionContextState, PosicionesContext } from "../contexts/empresas/posiciones";
import EmpleadosProvider, { EmpleadoContextState, EmpleadosContext } from "../contexts/empresas/empleados";
import BilletesProvider, { BilletesContext } from "../contexts/auxiliares/billetes";
import GenerosProvider, { GenerosContext } from "../contexts/auxiliares/generos";
import { Billete, Genero } from "../interfaces/auxiliares";
import AlmacenesProvider, { AlmacenContextState, AlmacenesContext } from "../contexts/inventario/almacenes";
import { Almacen, Empaque, Medida, Producto, Unidad } from "../interfaces/inventario";
import EmpaquesProvider, { EmpaqueContextState, EmpaquesContext } from "../contexts/inventario/empaques";
import MedidasProvider, { MedidaContextState, MedidasContext } from "../contexts/inventario/medidas";
import UnidadesProvider, { UnidadContextState, UnidadesContext } from "../contexts/inventario/unidades";
import ProductosProvider, { ProductoContextState, ProductosContext } from "../contexts/inventario/productos";
import GruposProvider, { GrupoContextState, GruposContext } from "../contexts/configuraciones/grupos";
import ImpuestosProvider, { ImpuestoContextState, ImpuestosContext } from "../contexts/configuraciones/impuestos";
import { Banco, CatalogoCc, Comprobante, ComprobanteSecuencia, ComprobanteTipo, CuentaBanco, Impuesto } from "../interfaces/contabilidad";
import { CondicionPago, FacturaTipo, FormaPago, Grupo } from "../interfaces/configuraciones";
import FacturaTiposProvider, { FacturaTipoContextState, FacturaTiposContext } from "../contexts/configuraciones/facturasTipos";
import FormaPagosProvider, { FormaPagoContextState, FormaPagosContext } from "../contexts/configuraciones/formasPago";
import CondicionPagosProvider, { CondicionPagoContextState, CondicionPagosContext } from "../contexts/configuraciones/condicionesPago";
import ComprasProvider, { ComprasContext, CompraContextState } from "../contexts/compras/compras";
import { Compra, Gasto, GastoTipo, Suplidor } from "../interfaces/compras";
import GastosProvider, { GastoContextState, GastosContext } from "../contexts/compras/gastos";
import GastosTiposProvider, { GastosTiposContext, GastoTipoContextState } from "../contexts/compras/gastosTipos";
import SuplidoresProvider, { SuplidorContextState, SuplidoresContext } from "../contexts/compras/suplidores";
import ClientesProvider, { ClienteContextState, ClientesContext } from "../contexts/ventas/clientes";
import { Cliente, Factura } from "../interfaces/ventas";
import ComprobantesProvider, { ComprobanteContextState, ComprobantesContext } from "../contexts/contabilidad/comprobantes";
import ComprobantesTiposProvider, { ComprobantesTiposContext, ComprobanteTipoContextState } from "../contexts/contabilidad/comprobantesTipos";
import ComprobantesSecuenciasProvider, { ComprobanteSecuenciaContextState, ComprobantesSecuenciasContext } from "../contexts/contabilidad/comprobantesSecuencias";
import CuentasBancosProvider, { CuentaBancoContextState, CuentasBancosContext } from "../contexts/contabilidad/cuentasBancos";
import BancosProvider, { BancoContextState, BancosContext } from "../contexts/contabilidad/bancos";
import CatalogoCcProvider, { CatalogoCcContextState, CatalogoCcContext } from "../contexts/contabilidad/catalogoCc";
import FacturasProvider, { FacturaContextState, FacturasContext } from "../contexts/ventas/facturas";

export const ContextsProvidersTree = ContextsProviders([
    /* Login */
    [AuthProvider, {}],

    /* Auxiliares */
    [GenerosProvider, {}],
    [BilletesProvider, {}],

    /* Empresas */
    [HorariosProvider, {}],
    [PosicionesProvider, {}],
    [EmpleadosProvider, {}],
    [EmpresasProvider, {}],

    /* Inventario */
    [AlmacenesProvider, {}],
    [EmpaquesProvider, {}],
    [MedidasProvider, {}],
    [UnidadesProvider, {}],
    [ProductosProvider, {}],

    /* Compras */
    [ComprasProvider, {}],
    [GastosProvider, {}],
    [GastosTiposProvider, {}],
    [SuplidoresProvider, {}],

    /* Ventas */
    [ClientesProvider, {}],
    [FacturasProvider, {}],

    /* Contabilidad */
    [BancosProvider, {}],
    [CuentasBancosProvider, {}],
    [CatalogoCcProvider, {}],
    [ComprobantesTiposProvider, {}],
    [ComprobantesProvider, {}],
    [ComprobantesSecuenciasProvider, {}],

    /* Seguridad */
    [RolesProvider, {}],
    [PermisosProvider, {}],
    [UsuariosProvider, {}],

    /* Configuraciones */
    [GruposProvider, {}],
    [FormaPagosProvider, {}],
    [CondicionPagosProvider, {}],
    [ImpuestosProvider, {}],
    [FacturaTiposProvider, {}],
]);

export const useData = () => {
    /* Login */
    const contextAuth = useContext(AuthContext) as AuthReducerState;

    /* Auxiliares */
    const contextGeneros = useContext(GenerosContext) as GlobalContextState<Genero>;
    const contextBilletes = useContext(BilletesContext) as GlobalContextState<Billete>;

    /* Empresas */
    const contextHorarios = useContext(HorariosContext) as HorarioContextState<Horario>;
    const contextPosiciones = useContext(PosicionesContext) as PosicionContextState<Posicion>;
    const contextEmpleados = useContext(EmpleadosContext) as EmpleadoContextState<Empleado>;
    const contextEmpresas = useContext(EmpresasContext) as EmpresaContextState<Empresa>;

    /* Inventario */
    const contextAlmacenes = useContext(AlmacenesContext) as AlmacenContextState<Almacen>;
    const contextEmpaques = useContext(EmpaquesContext) as EmpaqueContextState<Empaque>;
    const contextMedidas = useContext(MedidasContext) as MedidaContextState<Medida>;
    const contextUnidades = useContext(UnidadesContext) as UnidadContextState<Unidad>;
    const contextProductos = useContext(ProductosContext) as ProductoContextState<Producto>;

    /* Compras */
    const contextCompras = useContext(ComprasContext) as CompraContextState<Compra>;
    const contextGastos = useContext(GastosContext) as GastoContextState<Gasto>;
    const contextGastosTipos = useContext(GastosTiposContext) as GastoTipoContextState<GastoTipo>;
    const contextSuplidores = useContext(SuplidoresContext) as SuplidorContextState<Suplidor>;

    /* Ventas */
    const contextClientes = useContext(ClientesContext) as ClienteContextState<Cliente>;
    const contextFacturas = useContext(FacturasContext) as FacturaContextState<Factura>;

    /* Contabilidad */
    const contextBancos = useContext(BancosContext) as BancoContextState<Banco>;
    const contextCuentasBancos = useContext(CuentasBancosContext) as CuentaBancoContextState<CuentaBanco>;
    const contextCatalogoCc = useContext(CatalogoCcContext) as CatalogoCcContextState<CatalogoCc>;
    const contextComprobantesTipos = useContext(ComprobantesTiposContext) as ComprobanteTipoContextState<ComprobanteTipo>;
    const contextComprobantes = useContext(ComprobantesContext) as ComprobanteContextState<Comprobante>;
    const contextComprobantesSecuencias = useContext(ComprobantesSecuenciasContext) as ComprobanteSecuenciaContextState<ComprobanteSecuencia>;

    /* Seguridad */
    const contextRoles = useContext(RolesContext) as RolesContextState<Rol>;
    const contextPermisos = useContext(PermisosContext) as GlobalContextState<Permiso>;
    const contextUsuarios = useContext(UsuariosContext) as UsuariosContextState<Usuario>;

    /* Configuraciones */
    const contextGrupos = useContext(GruposContext) as GrupoContextState<Grupo>;
    const contextFormasPago = useContext(FormaPagosContext) as FormaPagoContextState<FormaPago>;
    const contextCondicionesPago = useContext(CondicionPagosContext) as CondicionPagoContextState<CondicionPago>;
    const contextImpuestos = useContext(ImpuestosContext) as ImpuestoContextState<Impuesto>;
    const contextFacturasTipos = useContext(FacturaTiposContext) as FacturaTipoContextState<FacturaTipo>;

    return {
        /* Login */
        contextAuth,

        /* Auxiliares */
        contextGeneros,
        contextBilletes,

        /* Empresas */
        contextHorarios,
        contextPosiciones,
        contextEmpleados,
        contextEmpresas,

        /* Inventario */
        contextAlmacenes,
        contextEmpaques,
        contextMedidas,
        contextUnidades,
        contextProductos,

        /* Compras */
        contextCompras,
        contextGastos,
        contextGastosTipos,
        contextSuplidores,

        /* Ventas */
        contextClientes,
        contextFacturas,

        /* Contabilidad */
        contextBancos,
        contextCuentasBancos,
        contextCatalogoCc,
        contextComprobantesTipos,
        contextComprobantes,
        contextComprobantesSecuencias,

        /* Seguridad */
        contextRoles,
        contextPermisos,
        contextUsuarios,

        /* Configuraciones */
        contextGrupos,
        contextFormasPago,
        contextCondicionesPago,
        contextImpuestos,
        contextFacturasTipos,
    }

}