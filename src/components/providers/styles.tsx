import { ConfigProvider } from "antd"
import { ControlProps } from "../../interfaces/globales"
import { Colors } from "../../hooks/useConstants"

const StyleProvider = (props: Pick<ControlProps, "children">) => {

    const { children } = props

    return (
        <ConfigProvider
            theme={{
                token: {
                    // Seed Token
                    colorPrimary: '#85a5ff',
                    colorSuccess: '#87d068',
                    colorTextBase: '#323232',

                    // Alias Token
                    //colorBgContainer: '#ffffff',
                },
                components: {
                    Menu: {
                        itemSelectedBg: Colors.Bg.Primary,
                        itemSelectedColor: Colors.White,
                    }
                }
            }}
        >
            {children}
        </ConfigProvider>
    )
}
export default StyleProvider
