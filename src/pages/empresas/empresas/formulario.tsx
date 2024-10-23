import { useEffect } from "react";
import { useData } from "../../../hooks/useData";
import { Alerta, Exito } from "../../../hooks/useMensaje";
import { Empresa } from "../../../interfaces/empresas";
import { Col, Form, Input, Row, Select, Switch, Tag } from "antd";
import { useForm } from "../../../hooks/useForm";
import FormDrawer from "../../../components/containters/form";

const EmpresaFormulario = () => {
    const {
        contextEmpresas: { state: { datos: empresas, modelo }, agregar, actualizar, cancelar },
    } = useData();
    const { entidad, editar, handleChangeInput } = useForm<Empresa | null | undefined>(modelo);

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
            Exito(`Empresa ${esNuevo ? 'agregada' : 'actualizada'} exitosamente!`);
        } else {
            Alerta(res.mensaje || 'No fue posible guardar los datos de la empresa.');
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
            name="formEmpresa"
            title="Empresa"
            placement="right"
            vertical
            open={true}
            onClose={cancelar}
            onFinish={guardar}
            initialValues={entidad}>
            <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input name="nombre" value={entidad.nombre || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="RNC" name="rnc" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input name="rnc" value={entidad.rnc || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Direcci&oacute;n" name="direccion" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input name="direccion" value={entidad.direccion || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Row gutter={10}>
                <Col lg={12} md={12} sm={12} xs={24}>
                    <Form.Item label="Tel&eacute;fono" name="telefono" rules={[{ required: true, message: 'Obligatorio' }]}>
                        <Input name="telefono" value={entidad.telefono || ''} onChange={handleChangeInput} />
                    </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={12} xs={24}>
                    <Form.Item label="Fax" name="fax">
                        <Input name="fax" value={entidad.fax || ''} onChange={handleChangeInput} />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item label="Correo Electr&oacute;nico" name="correo">
                <Input name="correo" value={entidad.correo || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Sitio Web" name="webSite">
                <Input name="webSite" value={entidad.webSite || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Sucursal" name="empresaId">
                <Select
                    value={entidad.empresaId}
                    options={empresas.filter(emp => !emp.empresaId).map((emp) => ({ key: emp.id.toString(), value: emp.id, label: emp.nombre }))}
                    onChange={(value) => editar({ ...entidad, empresaId: value })}>
                </Select>
            </Form.Item>
            <Form.Item label={modelo?.activa ? 'Activa' : 'Inactiva'} valuePropName="checked">
                <Switch checked={entidad.activa} onChange={(checked) => editar({ ...entidad, activa: checked })} />
            </Form.Item>
        </FormDrawer>
    )
}
export default EmpresaFormulario;
