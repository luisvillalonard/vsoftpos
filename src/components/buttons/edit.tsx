import { Button, Tooltip } from "antd"
import { ControlProps } from "../../interfaces/globales"
import { useIconos } from "../../hooks/useIconos"

const ButtonEdit = (props: Pick<ControlProps, "title" | "onClick">) => {

    const { IconEdit } = useIconos()
    const { title, onClick } = props

    return (
        <Tooltip title={title ?? ''}>
            <Button type="text" icon={<IconEdit className="fs-5" />} onClick={onClick} />
        </Tooltip>
    )

}
export default ButtonEdit
