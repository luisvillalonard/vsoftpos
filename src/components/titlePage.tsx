import { Space } from "antd"
import { ControlProps } from "../interfaces/globales"

const TitlePage = (props: Pick<ControlProps, Required<"title"> | "icon">) => {

    const { title, icon } = props

    return (
        <Space align="center" size={12} style={{ marginBottom: 14 }}>
            {!icon ? <></> : <>{icon}</>}
            <h1 className="fs-4 fw-bolder m-0">{title}</h1>
        </Space>
    )
}
export default TitlePage
