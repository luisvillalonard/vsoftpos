import { useEffect } from "react"
import { useData } from "../../../hooks/useData"
import { Alerta, Exito } from "../../../hooks/useMensaje"
import { Form, Input, Space, Switch } from "antd"
import { useForm } from "../../../hooks/useForm"
import FormDrawer from "../../../components/containers/form"
import { Rol } from "../../../interfaces/seguridad"

const RolFormulario = () => {

    const {
        contextRoles: { state: { modelo }, agregar, actualizar, cancelar },
    } = useData()
    const { entidad, editar, handleChangeInput } = useForm<Rol | null | undefined>(modelo)

    const guardar = async () => {

        if (!entidad) {
            return;
        }

        let res;
        let esNuevo: boolean = entidad.id && entidad.id > 0 ? false : true;

        if (esNuevo)
            res = await agregar(entidad);
        else {
            res = await actualizar(entidad);
        }

        if (res.ok) {
            Exito(`Perf&iacute;l de usuario ${esNuevo ? 'agregado' : 'actualizado'} exitosamente!`);
        } else {
            Alerta(res.mensaje || 'No fue posible guardar los datos del perfíl de usuario.');
        }

    };

    useEffect(() => { editar(modelo) }, [modelo])

    if (!entidad) {
        return <></>
    }

    return (
        <FormDrawer
            name="formRol"
            title="Perfíl de Usuario"
            placement="right"
            vertical
            open={true}
            onClose={cancelar}
            onFinish={guardar}
            initialValues={entidad}>
            <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input name="nombre" value={entidad.nombre || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item valuePropName="checked">
                <Space>
                    <Switch checked={entidad.esAdministrador} onChange={(checked) => editar({ ...entidad, esAdministrador: checked })} />
                    <span>Este perf&iacute;l de usuario es definido como administrador</span>
                </Space>
            </Form.Item>
        </FormDrawer>
    )
}
export default RolFormulario;
