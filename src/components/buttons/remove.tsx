import { Button } from "antd"
import { ControlProps } from "../../interfaces/globales"
import { BsTrash } from "react-icons/bs"

const ButtonRemove = (props: Pick<ControlProps, "size" | "buttonType" | "buttonCircle" | "onClick">) => {
    const { size, buttonType, buttonCircle, onClick } = props

    return (
        <Button
            size={size}
            type={buttonType ?? "text"}
            shape={buttonCircle ? "circle" : "default"}
            icon={<BsTrash className="fs-6" style={{ color: 'red' }} />}
            onClick={onClick}>
        </Button>
    )
}
export default ButtonRemove;