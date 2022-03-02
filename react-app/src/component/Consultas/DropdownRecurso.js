import { Menu } from 'antd'
import { CalendarOutlined } from '@ant-design/icons';
import { EventContext } from '../context/eventContext';
import { useContext } from 'react';
const { SubMenu } = Menu;

const Sider = () => {
    const { recursosData } = useContext(EventContext)
    const { getConsultasRecursoInfo } = useContext(EventContext)

    const handleClick = (e) => {
        console.log('click ', e);
    };

    return (
        <Menu
            onClick={handleClick()}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
        >
            <SubMenu key="sub4" icon={<CalendarOutlined />} title="Horarios por Empleado">
                {recursosData.map((recurso, index) =>
                    <Menu.Item index={index} key={recurso.id} onClick={() => { getConsultasRecursoInfo(recurso.id) }}><a>{recurso.title}</a></Menu.Item>
                )}
            </SubMenu>
        </Menu>
    );
}

export default Sider;