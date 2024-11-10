import { useNavigate } from "react-router-dom"
import { Menu, Layout, theme } from "antd"
import type { MenuProps } from "antd"
import { useData } from "../../hooks/useData"
import { useConstants } from "../../hooks/useConstants"
import { useIconos } from "../../hooks/useIconos"

type MenuItem = Required<MenuProps>['items'][number]

const MenuApp = () => {

    const { contextAuth: { state: { user, viewMenu } } } = useData()
    const { token: { colorBgContainer, colorPrimary } } = theme.useToken()
    const navUrl = useNavigate()
    const { Urls } = useConstants()
    const {
        IconCompany, IconTime, IconPosition, IconUserGroup,
        IconChecklist, IconStore, IconPackage, IconMeasure, IconMeasureUnit, IconProducts,
        IconBuy, IconSpent, IconBuyType, IconSuppliers,
        IconInvoice, IconShoppingCart, IconClient, IconInvoicePay,
        IconBookOpen, IconBank, IconBankAccount, IconAccountFinance, IconVoucher,
        IconUserShield, IconUsers, IconUserProfile, IconUserPermission,
        IconConfig
    } = useIconos()
    const { Sider } = Layout
    const headerStyle: React.CSSProperties = {
        fontSize: 16,
        fontWeight: "bolder",
    }
    const iconHeaderStyle: React.CSSProperties = {
        color: colorPrimary,
        margin: 0
    }


    const items: MenuItem[] = [
        {
            key: Urls.Empresas.Base,
            label: <span style={headerStyle}>Empresas</span>,
            icon: <IconCompany style={iconHeaderStyle} />,
            children: [
                { key: `${Urls.Empresas.Base}/${Urls.Empresas.Horarios}`, label: 'Horarios', icon: <IconTime style={{ fontSize: 18 }} /> },
                { key: `${Urls.Empresas.Base}/${Urls.Empresas.Posiciones}`, label: 'Posiciones', icon: <IconPosition style={{ fontSize: 18 }} /> },
                { key: `${Urls.Empresas.Base}/${Urls.Empresas.Empleados}`, label: 'Empleados', icon: <IconUserGroup style={{ fontSize: 18 }} /> },
                { key: `${Urls.Empresas.Base}/${Urls.Empresas.Base}`, label: 'Empresas', icon: <IconCompany style={{ fontSize: 18 }} /> },
            ],
        },
        {
            key: Urls.Inventario.Base,
            label: <span style={headerStyle}>Inventario</span>,
            icon: <IconChecklist style={iconHeaderStyle} />,
            children: [
                { key: `${Urls.Inventario.Base}/${Urls.Inventario.Almacenes}`, label: 'Almacenes', icon: <IconStore style={{ fontSize: 18 }} /> },
                { key: `${Urls.Inventario.Base}/${Urls.Inventario.Empaques}`, label: 'Empaques', icon: <IconPackage style={{ fontSize: 18 }} /> },
                { key: `${Urls.Inventario.Base}/${Urls.Inventario.Medidas}`, label: 'Medidas', icon: <IconMeasureUnit style={{ fontSize: 18 }} /> },
                { key: `${Urls.Inventario.Base}/${Urls.Inventario.Unidades}`, label: 'Unidades de Medida', icon: <IconMeasure style={{ fontSize: 18 }} /> },
                { key: `${Urls.Inventario.Base}/${Urls.Inventario.Productos}`, label: 'Productos', icon: <IconProducts style={{ fontSize: 18 }} /> },
            ],
        },
        {
            key: Urls.Compras.Base,
            label: <span style={headerStyle}>Compras</span>,
            icon: <IconBuy style={iconHeaderStyle} />,
            children: [
                { key: `${Urls.Compras.Base}/${Urls.Compras.Gastos}`, label: 'Gastos', icon: <IconSpent style={{ fontSize: 18 }} /> },
                { key: `${Urls.Compras.Base}/${Urls.Compras.GastosTipos}`, label: 'Tipos de Gastos', icon: <IconBuyType style={{ fontSize: 18 }} /> },
                { key: `${Urls.Compras.Base}/${Urls.Compras.Suplidores}`, label: 'Suplidores', icon: <IconSuppliers style={{ fontSize: 18 }} /> },
            ],
        },
        {
            key: Urls.Ventas.Base,
            label: <span style={headerStyle}>Ventas</span>,
            icon: <IconInvoice style={iconHeaderStyle} />,
            children: [
                { key: `${Urls.Ventas.Base}/${Urls.Ventas.PuntoDeVenta}`, label: 'Punto de Venta', icon: <IconShoppingCart style={{ fontSize: 18 }} /> },
                { key: `${Urls.Ventas.Base}/${Urls.Ventas.Clientes}`, label: 'Clientes', icon: <IconClient style={{ fontSize: 20 }} /> },
                { key: `${Urls.Ventas.Base}/${Urls.Ventas.Facturas}`, label: 'Facturas', icon: <IconInvoice style={{ fontSize: 18 }} /> },
                { key: `${Urls.Ventas.Base}/${Urls.Ventas.PagosFacturas}`, label: 'Cuentas por Cobrar', icon: <IconInvoicePay style={{ fontSize: 18 }} /> },
            ],
        },
        {
            key: Urls.Contabilidad.Base,
            label: <span style={headerStyle}>Contabilidad</span>,
            icon: <IconBookOpen style={{ ...iconHeaderStyle, fontSize: 20 }} />,
            children: [
                { key: `${Urls.Contabilidad.Base}/${Urls.Contabilidad.Bancos}`, label: 'Bancos', icon: <IconBank style={{ fontSize: 18 }} /> },
                { key: `${Urls.Contabilidad.Base}/${Urls.Contabilidad.CuentasBancos}`, label: 'Cuentas de Bancos', icon: <IconBankAccount style={{ fontSize: 18 }} /> },
                { key: `${Urls.Contabilidad.Base}/${Urls.Contabilidad.CatalogoCc}`, label: 'Cuentas Contables', icon: <IconAccountFinance style={{ fontSize: 18 }} /> },
                { key: `${Urls.Contabilidad.Base}/${Urls.Contabilidad.Comprobantes}`, label: 'Comprobantes Fiscales', icon: <IconVoucher style={{ fontSize: 18 }} /> },
            ],
        },
        {
            key: Urls.Seguridad.Base,
            label: <span style={headerStyle}>Seguridad</span>,
            icon: <IconUserShield style={iconHeaderStyle} />,
            children: [
                { key: `${Urls.Seguridad.Base}/${Urls.Seguridad.Roles}`, label: 'Perfiles de Usuarios', icon: <IconUserProfile style={{ fontSize: 18 }} /> },
                { key: `${Urls.Seguridad.Base}/${Urls.Seguridad.Permisos}`, label: 'Permisos', icon: <IconUserPermission style={{ fontSize: 18 }} /> },
                { key: `${Urls.Seguridad.Base}/${Urls.Seguridad.Usuarios}`, label: 'Usuarios', icon: <IconUsers style={{ fontSize: 18 }} /> },
            ],
        },
        {
            key: Urls.Configuraciones.Base,
            label: <span style={headerStyle}>Configuraciones</span>,
            icon: <IconConfig style={iconHeaderStyle} />,
            children: [
                { key: `${Urls.Configuraciones.Base}/${Urls.Configuraciones.Grupos}`, label: 'Grupos', icon: <IconConfig style={{ fontSize: 18 }} /> },
                { key: `${Urls.Configuraciones.Base}/${Urls.Configuraciones.FormasPago}`, label: 'Formas de Pago', icon: <IconConfig style={{ fontSize: 18 }} /> },
                { key: `${Urls.Configuraciones.Base}/${Urls.Configuraciones.CondicionesPago}`, label: 'Condiciones de Pago', icon: <IconConfig style={{ fontSize: 18 }} /> },
                { key: `${Urls.Configuraciones.Base}/${Urls.Configuraciones.FacturasTipos}`, label: 'Tipos de Factura', icon: <IconConfig style={{ fontSize: 18 }} /> },
                { key: `${Urls.Configuraciones.Base}/${Urls.Configuraciones.Impuestos}`, label: 'Impuestos', icon: <IconConfig style={{ fontSize: 18 }} /> },
            ],
        },
    ]

    if (!user) {
        return <></>
    }

    return (
        <Sider
            width={250}
            trigger={null}
            collapsible
            collapsed={!viewMenu}
            style={{ background: colorBgContainer, overflowY: 'auto' }}>
            <Menu
                mode="inline"
                items={items}
                inlineCollapsed={!viewMenu}
                style={{ height: '100%', borderRight: 0 }}
                onClick={(e) => navUrl(e.key, { replace: true })}
            />
        </Sider>
    )
}
export default MenuApp;
