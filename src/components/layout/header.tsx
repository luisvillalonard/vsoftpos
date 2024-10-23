import { Button, Flex, Layout, Space, theme, Tooltip } from "antd"
import { useData } from "../../hooks/useData"
import { Confirmacion } from "../../hooks/useMensaje"
import { navUrl } from "../../hooks/useUtils"
import { useIconos } from "../../hooks/useIconos"
import { Urls } from "./../rutas"

const HeaderApp = () => {

  const { contextAuth: { getUser, showMenu, showUserInfo, LoggedOut } } = useData()
  const { Header } = Layout
  const { token: { colorBgContainer, colorPrimary, colorTextSecondary } } = theme.useToken()
  const { IconMenu, IconAlert, IconUser, IconLogout } = useIconos()

  return (
    <Header style={{ background: colorBgContainer, paddingLeft: 16, paddingRight: 16, display: 'flex', alignItems: 'center' }}>
      <Flex style={{ width: '100%' }} justify="space-between">
        <Space size="small" style={{ height: '100%' }}>
          <Space align="center" size={0}>
            <span className="fs-3" style={{ fontWeight: 600, color: colorPrimary }}>FACTU</span>
            <span className="fs-3" style={{ fontWeight: 600, color: colorTextSecondary }}>V</span>
          </Space>
          <Button
            type="text"
            shape="circle"
            icon={<IconMenu className="fs-5" />}
            onClick={showMenu}
          />
        </Space>
        <Flex gap={16} align="center">
          <Tooltip title="Alertas">
            <Button
              type="text"
              shape="circle"
              icon={<IconAlert className="fs-5" />}
              onClick={showUserInfo}
            />
          </Tooltip>
          <Tooltip title="Información del usuario">
            <Button
              type="text"
              shape="circle"
              icon={<IconUser className="fs-5" />}
              onClick={showUserInfo}
            />
          </Tooltip>
          <Tooltip title="Salir de la aplicación">
            <Button
              type="text"
              shape="circle"
              icon={<IconLogout className="fs-5" />}
              onClick={async () => {
                await Confirmacion('Esta seguro(a) que desea cerrar la sesión?')
                  .then((resp) => {
                    if (resp) {
                      LoggedOut();
                      getUser();
                      navUrl(`${Urls.Login}`);
                    }
                  })
              }}>
            </Button>
          </Tooltip>
        </Flex>
      </Flex>
    </Header>
  )
}
export default HeaderApp;
