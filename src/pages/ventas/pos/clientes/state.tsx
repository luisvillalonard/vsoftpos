import { useIconos } from "../../../../hooks/useIconos"
import { ControlProps } from "../../../../interfaces/globales"
import { Colors } from "../../../../hooks/useConstants"

const ClienteState = (prop: Pick<ControlProps, "active">) => {
    
    const { active } = prop
    const { IconUserGood, IconUserBad } = useIconos()

    return (
        <>
            {
                active === true
                    ? <IconUserGood style={{ fontSize: 20, color: Colors.Font.Success }} />
                    : <IconUserBad style={{ fontSize: 20, color: Colors.Font.Danger }} />
            }
        </>
    )

}
export default ClienteState;
