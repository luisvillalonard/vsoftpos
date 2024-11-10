import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"
import { useConstants } from "../hooks/useConstants"

const PageNotFound = () => {
    
    const { Urls } = useConstants()
    const nav = useNavigate()

    return (
        <Result
            status="404"
            title="404"
            subTitle={<p className="fs-5">Lo sentimos, la opci&oacute; que solicita es inv&aacute;lida o no tiene acceso!.</p>}
            extra={<Button type="primary" onClick={() => nav(Urls.Home, { replace: true })}>Ir al inicio</Button>}
        />
    )
}
export default PageNotFound;
