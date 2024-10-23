import { Button } from "antd"
import { GoPlus } from "react-icons/go"
import { ControlProps } from "../../interfaces/globales"

const ButtonAdd = (props: Pick<ControlProps, "size" | "buttonType" | "buttonCircle" | "onClick">) => {
    const { size, buttonType, buttonCircle, onClick } = props

    return (
        <Button
            size={size}
            type={buttonType ?? "text"}
            shape={buttonCircle ? "circle" : "default"}
            icon={<GoPlus className="fs-6" style={{ color: 'green' }} />}
            onClick={onClick}>
        </Button>
    )
}
export default ButtonAdd;