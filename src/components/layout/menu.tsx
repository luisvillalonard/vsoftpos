import { useNavigate } from "react-router-dom"
import { Menu, Layout, theme } from "antd"
import { useData } from "../../hooks/useData"
import { menuItems } from "../rutas"

const MenuApp = () => {
    
    const { contextAuth: { state: { viewMenu } } } = useData()
    const { token: { colorBgContainer } } = theme.useToken()
    const navUrl = useNavigate()
    const { Sider } = Layout

    return (
        <Sider trigger={null} collapsible collapsed={!viewMenu} style={{ background: colorBgContainer }}>
            <Menu
                mode="inline"
                items={menuItems}
                onClick={(e) => navUrl(e.key, { replace: true })}
            />
        </Sider>
    )
}
export default MenuApp;
