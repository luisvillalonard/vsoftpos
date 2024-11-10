import { Card, CardProps } from "antd"

const PanelPos = (props: CardProps) => {

    const { title, children, style } = props

    return (
        <Card
            size="small"
            title={title ? <div className="fs-6 h-auto">{title}</div> : null}
            style={{ borderStyle: 'solid', borderWidth: 1, borderColor: '#DDD', ...style }}
            styles={{
                title: {
                    height: 'auto',
                    padding: 0
                },
                body: {
                    padding: 6,
                    height: '100%',
                    overflowY: 'auto'
                }
            }}>
            {children}
        </Card>
    )
}
export default PanelPos
