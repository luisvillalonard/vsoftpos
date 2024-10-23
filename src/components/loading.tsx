import { Flex, Layout, Spin } from 'antd';
import { ControlProps } from '../interfaces/globales';

const Loading = (props: Pick<ControlProps, "active" | "message">) => {
    const { active, message } = props;

    if (!active) {
        return <></>
    }

    return (
        <Layout className='position-absolute h-100 w-100 d-flex overflow-hidden' style={{ background: '#FFFFFF', opacity: 0.85 }}>
            <Flex gap="middle" vertical className='m-auto'>
                <Spin size="large" />
                <p className='fs-6'>{message || 'procesando, espere...'}</p>
            </Flex>
        </Layout>
    )
}
export default Loading;
