import { Flex } from "antd"
import { ControlProps } from "../interfaces/globales"

export const TitlePage = (props: Pick<ControlProps, Required<"title"> | "icon">) => {

    const { title, icon } = props

    return (
        <Flex align="center" gap={12}>
            {!icon ? <></> : <>{icon}</>}
            <div className="fs-5">{title}</div>
        </Flex>
    )
}