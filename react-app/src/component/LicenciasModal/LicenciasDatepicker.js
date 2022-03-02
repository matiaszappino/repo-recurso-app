import React, { useContext } from 'react';
import { DatePicker, Space } from 'antd';
import { EventContext } from '../context/eventContext';

const ModalDatePicker = () => {
    const { RangePicker } = DatePicker;
    const { setLicenciasValue } = useContext(EventContext)

    function onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
        if (value[1] !== null) {
            setLicenciasValue(dateString)
            
        }
    }

    /*function onOk(value) {
        console.log("value", value)
        if (value[1] !== null) {
            console.log('onOk: ', value);
            setLicenciasValue(value)
            //handleChangeEventTime(eventInfo, value)
        }
    }*/

    return(
    <Space direction="vertical" size={12}>
        <RangePicker
        //showTime={{ format: 'HH:mm' }}
        //HH:mm
        format="YYYY-MM-DD" 
        onChange={onChange}
        //onOk={onOk}
        />
    </Space>
    );
}

export default ModalDatePicker;