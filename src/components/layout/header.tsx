import { Button, Flex, Layout, Space, theme, Tooltip } from "antd"
import { useData } from "../../hooks/useData"
import { Confirmacion } from "../../hooks/useMensaje"
import { navUrl } from "../../hooks/useUtils"
import { useIconos } from "../../hooks/useIconos"
import { useConstants } from "../../hooks/useConstants"

const HeaderApp = () => {

  const { contextAuth: { getUser, showMenu, showUserInfo, LoggedOut } } = useData()
  const { Header } = Layout
  const { token: { colorBgContainer, colorPrimary, colorTextSecondary } } = theme.useToken()
  const { IconMenu, IconAlert, IconUser, IconLogout } = useIconos()
  const { Urls } = useConstants()
  const headerStyle: React.CSSProperties = {
    display: 'flex', 
    alignItems: 'center', 
    paddingLeft: 16, 
    paddingRight: 16, 
    background: colorBgContainer, 
    borderBottom: '1px solid gray'
  }

  return (
    <Header style={headerStyle}>
      <Flex style={{ width: '100%' }} justify="space-between">
        <Flex gap={10} align="center" style={{ height: '100%' }}>
          <Flex align="center">
            <span style={{ fontSize: 30, fontWeight: 600, color: colorPrimary }}>FACTU</span>
            <span style={{ fontSize: 30, fontWeight: 600, color: colorTextSecondary }}>V</span>
          </Flex>
          <Button
            type="text"
            shape="circle"
            icon={<IconMenu style={{ fontSize: 22 }} />}
            onClick={showMenu}
          />
        </Flex>
        <Flex gap={16} align="center">
          <Tooltip title="Alertas">
            <Button
              type="text"
              shape="circle"
              icon={<IconAlert style={{ fontSize: 19 }} />}
              onClick={showUserInfo}
            />
          </Tooltip>
          <Tooltip title="Información del usuario">
            <Button
              type="text"
              shape="circle"
              icon={<IconUser style={{ fontSize: 19 }} />}
              onClick={showUserInfo}
            />
          </Tooltip>
          <Tooltip title="Salir de la aplicación">
            <Button
              type="text"
              shape="circle"
              icon={<IconLogout style={{ fontSize: 18 }} />}
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
