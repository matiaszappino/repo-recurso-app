import React, { useContext } from 'react';
import { DatePicker, Space } from 'antd';
import { EventContext } from '../context/eventContext';

const ModalDatePicker = () => {
    const { RangePicker } = DatePicker;
    //const { eventInfo } = useContext(EventContext)
    //const { handleChangeEventTime } = useContext(EventContext)
    const { setValue } = useContext(EventContext)

    function onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    }

    function onOk(value) {
        console.log(value)
        if (value[1] !== null) {
            console.log('onOk: ', value);
            setValue(value)
            //handleChangeEventTime(eventInfo, value)
        }
    }

    return(
    <Space direction="vertical" size={12}>
        <RangePicker
        showTime={{ format: 'HH:mm' }}
        format="YYYY-MM-DD HH:mm"
        onChange={onChange}
        onOk={onOk}
        />
    </Space>
    );
}

export default ModalDatePicker;