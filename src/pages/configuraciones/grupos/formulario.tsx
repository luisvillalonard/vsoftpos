import { useEffect } from "react";
import { useData } from "../../../hooks/useData";
import { Alerta, Exito } from "../../../hooks/useMensaje";
import { Form, Input, Switch } from "antd";
import { useForm } from "../../../hooks/useForm";
import FormDrawer from "../../../components/containers/form";
import { Grupo } from "../../../interfaces/configuraciones";

const GrupoFormulario = () => {

    const { contextGrupos: { state: { modelo }, agregar, actualizar, cancelar } } = useData();
    const { entidad, editar, handleChangeInput } = useForm<Grupo | null | undefined>(modelo);

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
            Exito(`Grupo ${esNuevo ? 'agregado' : 'actualizado'} exitosamente!`);
        } else {
            Alerta(res.mensaje || 'No fue posible guardar los datos del grupo.');
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
            name="formGrupo"
            title="Grupo"
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
            <Form.Item label="Cliente" valuePropName="checked">
                <Switch checked={entidad.cliente} onChange={(checked) => editar({ ...entidad, cliente: checked })} />
            </Form.Item>
            <Form.Item label="Suplidor" valuePropName="checked">
                <Switch checked={entidad.suplidor} onChange={(checked) => editar({ ...entidad, suplidor: checked })} />
            </Form.Item>
            <Form.Item label="Producto" valuePropName="checked">
                <Switch checked={entidad.producto} onChange={(checked) => editar({ ...entidad, producto: checked })} />
            </Form.Item>
            <Form.Item label="Servicio" valuePropName="checked">
                <Switch checked={entidad.servicio} onChange={(checked) => editar({ ...entidad, servicio: checked })} />
            </Form.Item>
            <Form.Item label={modelo?.activo ? 'Activo' : 'Inactivo'} valuePropName="checked">
                <Switch checked={entidad.activo} onChange={(checked) => editar({ ...entidad, activo: checked })} />
            </Form.Item>
        </FormDrawer>
    )
}
export default GrupoFormulario;
