import { Layout, theme } from "antd"
import { ControlProps } from "../../interfaces/globales"

const Container = (props: Pick<ControlProps, "children" | "style" | "color">) => {

    const { children, style, color } = props

    const { token: { colorBgContainer, colorPrimaryHover, boxShadowTertiary } } = theme.useToken()
    const { Content } = Layout

    return (
        <Content
            style={{
                ...style,
                background: colorBgContainer,
                padding: 10,
                borderRadius: 14,
                borderLeftStyle: 'solid',
                borderLeftWidth: 6,
                borderLeftColor: color ?? colorPrimaryHover,
                boxShadow: boxShadowTertiary,
            }}>
            {children}
        </Content>
    )
}
export default Container
