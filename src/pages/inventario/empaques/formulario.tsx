import { useEffect } from "react";
import { useData } from "../../../hooks/useData";
import { Alerta, Exito } from "../../../hooks/useMensaje";
import { Form, Input, InputNumber, Switch } from "antd";
import { useForm } from "../../../hooks/useForm";
import FormDrawer from "../../../components/containers/form";
import { Empaque } from "../../../interfaces/inventario";

const EmpaqueFormulario = () => {
    const {
        contextEmpaques: { state: { modelo }, agregar, actualizar, cancelar }
    } = useData();
    const { entidad, editar, handleChangeInput } = useForm<Empaque | null | undefined>(modelo);

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
            Exito(`Empaque ${esNuevo ? 'agregado' : 'actualizado'} exitosamente!`);
        } else {
            Alerta(res.mensaje || 'No fue posible guardar los datos del empaque.');
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
            name="formEmpaque"
            title="Empaque"
            placement="right"
            vertical
            open={true}
            onClose={cancelar}
            onFinish={guardar}
            initialValues={entidad}>
            <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input name="nombre" value={entidad.nombre || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Unidades" name="unidades" style={{ width: '100% ' }}>
                <InputNumber min={0} value={entidad.unidades} width="100%"
                    onChange={(value) => editar({ ...entidad, unidades: value ?? 0 })} 
                    onFocus={(evt) => evt.currentTarget.select()} />
            </Form.Item>
            <Form.Item label={modelo?.activo ? 'Activo' : 'Inactivo'} valuePropName="checked">
                <Switch checked={entidad.activo} onChange={(checked) => editar({ ...entidad, activo: checked })} />
            </Form.Item>
        </FormDrawer>
    )
}
export default EmpaqueFormulario;
