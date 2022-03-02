import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { EventContext } from '../context/eventContext';
import { useContext } from 'react';

const DropdownMenu = () => {
    const { localesData } = useContext(EventContext)
    const { getConsultasInfo } = useContext(EventContext)


    const menu = (localesData) => {
        return (
            <Menu >{localesData.map((local, index) => <Menu.Item index={index} key={local.id} onClick={() => {getConsultasInfo(local.id)}}><a>{local.title}</a></Menu.Item>)}
            </Menu>)
    }
    return (
        <Dropdown overlay={menu(localesData)}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Local <DownOutlined />
            </a>
        </Dropdown>
    )

}

export default DropdownMenu;