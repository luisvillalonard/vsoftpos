import { useEffect } from "react";
import { useData } from "../../../hooks/useData";
import { Alerta, Exito } from "../../../hooks/useMensaje";
import { Banco } from "../../../interfaces/contabilidad";
import { Form, Input, Space, Switch } from "antd";
import { useForm } from "../../../hooks/useForm";
import FormDrawer from "../../../components/containers/form";

const BancoFormulario = () => {
    const { contextBancos: { state: { modelo }, agregar, actualizar, cancelar } } = useData();
    const { entidad, editar, handleChangeInput } = useForm<Banco | null | undefined>(modelo);

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
            Exito(`Banco ${esNuevo ? 'agregado' : 'actualizado'} exitosamente!`);
        } else {
            Alerta(res.mensaje || 'No fue posible guardar los datos del banco.');
        }

    };

    useEffect(() => {
        editar(modelo)
    }, [modelo])

    if (!entidad) {
        return <></>
    }

    return (
        <FormDrawer
            name="formBanco"
            title="Banco"
            placement="right"
            vertical
            open={true}
            onClose={cancelar}
            onFinish={guardar}
            initialValues={entidad}>
            <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input name="nombre" value={entidad.nombre || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Descripci&oacute;n" name="descripcion">
                <Input name="descripcion" value={entidad.descripcion || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item valuePropName="checked">
                <Space>
                    <Switch checked={entidad.activo} onChange={(checked) => editar({ ...entidad, activo: checked })} />
                    <span>{entidad?.activo ? 'Activo' : 'Inactivo'}</span>
                </Space>
            </Form.Item>
        </FormDrawer>
    )
}
export default BancoFormulario;
