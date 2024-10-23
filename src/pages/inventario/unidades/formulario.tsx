import { useEffect } from "react";
import { useData } from "../../../hooks/useData";
import { Alerta, Exito } from "../../../hooks/useMensaje";
import { Form, Input, Select, Switch } from "antd";
import { useForm } from "../../../hooks/useForm";
import FormDrawer from "../../../components/containters/form";
import { Unidad } from "../../../interfaces/inventario";

const UnidadMedidaFormulario = () => {
    const {
        contextUnidades: { state: { modelo, procesando }, agregar, actualizar, cancelar },
        contextMedidas: { state: { datos: medidas, procesando: cargandoMedidas }, todos: cargarMedidas }
    } = useData();
    const { entidad, editar, handleChangeInput } = useForm<Unidad | null | undefined>(modelo);

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
            Exito(`Producto ${esNuevo ? 'agregado' : 'actualizadop'} exitosamente!`);
        } else {
            Alerta(res.mensaje || 'No fue posible guardar los datos del producto.');
        }

    };

    useEffect(() => {
        editar(modelo);
        if (modelo) {
            (async () => {
                await cargarMedidas()
            })()
        }
    }, [modelo])

    if (!entidad) {
        return <></>
    }

    return (
        <FormDrawer
            name="formUnidad"
            title="Unidad de Medida"
            placement="right"
            vertical
            open={true}
            loading={procesando}
            onClose={cancelar}
            onFinish={guardar}
            initialValues={{
                ...entidad,
                medidaId: entidad.medida?.id
            }}>
            <Form.Item label="Nombre" name="descripcion" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input name="descripcion" value={entidad.descripcion || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Medida" name="medidaId" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Select
                    loading={cargandoMedidas}
                    value={entidad.medida?.id}
                    labelRender={(item) => !item ? <></> : <label>{item.label}</label>}
                    options={medidas.map((item) => ({ key: item.id.toString(), value: item.id, label: item.nombre }))}
                    onChange={(value) => editar({ ...entidad, medida: medidas.filter(item => item.id === value)[0] })}>
                </Select>
            </Form.Item>
            <Form.Item label={modelo?.activa ? 'Activa' : 'Inactiva'} valuePropName="checked">
                <Switch checked={entidad.activa} onChange={(checked) => editar({ ...entidad, activa: checked })} />
            </Form.Item>
        </FormDrawer>
    )
}
export default UnidadMedidaFormulario;
