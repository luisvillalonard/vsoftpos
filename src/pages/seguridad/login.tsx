import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Checkbox, Form, Input, Alert, Card, Col, Divider, Flex, Layout, Space, theme } from "antd"
import { useData } from "../../hooks/useData";
import { Login, UserApp } from "../../interfaces/seguridad"
import { Urls } from "../../components/rutas"
import { ResponseResult } from "../../interfaces/globales"
import { useIconos } from "../../hooks/useIconos"
import { useForm } from "../../hooks/useForm"
import Loading from "../../components/loading"

const LoginPage = () => {

    const { contextAuth: { state: { procesando }, validar } } = useData()
    const { token: { colorPrimary, colorTextSecondary } } = theme.useToken()
    const { IconUser, IconLock } = useIconos()
    const { entidad: user } = useForm<Login>({ acceso: '', clave: '', recuerdame: true })
    const [result, setResult] = useState<ResponseResult<UserApp> | null>(null)
    const nav = useNavigate()

    const onFinish = async (values: Login) => {

        const resp = await validar(values)
        if (!resp.ok) {
            setResult(resp)
            return
        }
        nav(Urls.Home, { replace: true })

    };

    return (
        <Layout
            className="vh-100 body-login">
            <Flex
                align="center"
                justify="center"
                className="h-100">
                <Col md={18} sm={20} xs={22} style={{ alignItems: 'center' }}>
                    <Col xl={{ span: 8, offset: 14 }} lg={{ span: 10, offset: 14 }} md={{ span: 12, offset: 12 }} sm={24} xs={24}>
                        <Card
                            styles={{
                                body: {
                                    padding: 20
                                }
                            }}>
                            <Flex
                                vertical
                                className="h-100 position-relative"
                                align="center">
                                <Space align="center" size={0}>
                                    <span className="display-5" style={{ fontWeight: 'bold', color: colorPrimary }}>FACTU</span>
                                    <span className="display-5" style={{ fontWeight: 'bold', color: colorTextSecondary }}>V</span>
                                </Space>
                                <p className="fs-4 m-0" style={{ textAlign: 'center' }}>Sistema de Facturaci&oacute;n</p>
                                <Divider className="my-3" />
                                {
                                    result && !result.ok
                                    ? <Alert type="error" closable={false} showIcon message={result.mensaje} className="w-100 mb-3" />
                                    : <></>
                                }
                                <Form
                                    name="formLogin"
                                    size="large"
                                    layout="vertical"
                                    className="w-100"
                                    initialValues={user}
                                    onFinish={onFinish}
                                >
                                    <Form.Item
                                        label="Usuario"
                                        name="acceso"
                                        required={false}
                                        rules={[{ required: true, message: 'Obligatorio', }]}
                                    >
                                        <Input
                                            name="acceso"
                                            value={user.acceso}
                                            prefix={<IconUser className="fs-5" />}
                                            placeholder="coloque aqui el usuario" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Clave"
                                        name="clave"
                                        required={false}
                                        rules={[{ required: true, message: 'Obligatorio' }]}
                                    >
                                        <Input
                                            name="clave"
                                            type="password"
                                            value={user.clave}
                                            prefix={<IconLock className="fs-5" />}
                                            placeholder="coloque aqui la clave" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Flex justify="space-between" align="center">
                                            <Form.Item name="recuerdame" valuePropName="checked" noStyle>
                                                <Checkbox value={user.recuerdame}>Recuerdame</Checkbox>
                                            </Form.Item>
                                            <a href="">Recuperar Clave</a>
                                        </Flex>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button block type="primary" shape="round" htmlType="submit">
                                            Aceptar
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <Loading active={procesando} message="Procesando, espere..." />
                            </Flex>
                        </Card>
                    </Col>
                </Col>
            </Flex>
        </Layout>
    )
}
export default LoginPage;
