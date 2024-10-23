import { useEffect } from "react";
import { useData } from "../../../hooks/useData";
import { Alerta, Exito } from "../../../hooks/useMensaje";
import { Form, Input } from "antd";
import { useForm } from "../../../hooks/useForm";
import FormDrawer from "../../../components/containters/form";
import { Medida } from "../../../interfaces/inventario";

const MedidaFormulario = () => {
    const {
        contextMedidas: { state: { modelo }, agregar, actualizar, cancelar }
    } = useData();
    const { entidad, editar, handleChangeInput } = useForm<Medida | null | undefined>(modelo);

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
            Exito(`Medida ${esNuevo ? 'agregada' : 'actualizada'} exitosamente!`);
        } else {
            Alerta(res.mensaje || 'No fue posible guardar los datos de la medida.');
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
            name="formMedida"
            title="Medida"
            placement="right"
            vertical
            open={true}
            onClose={cancelar}
            onFinish={guardar}
            initialValues={entidad}>
            <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input name="nombre" value={entidad.nombre || ''} onChange={handleChangeInput} />
            </Form.Item>
        </FormDrawer>
    )
}
export default MedidaFormulario;
