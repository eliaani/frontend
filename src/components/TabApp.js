import React, { useState } from 'react';
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';
import Clothlist from './ClothList';
import Producerlist from './ProducerList';

function TabApp(){
    const [value, setValue] = useState('one');
    const handleChange = (event, value) => {
        setValue(value);
    };
    return(
    <div>
        <Tabs value={value} onChange={handleChange}>
            <Tab value='one' label='Clothes'/>
            <Tab value='two' label='Producers'/>

        </Tabs>
        {value === 'one' && <Clothlist/>}
        {value === 'two' && <Producerlist/>}
    </div>
);
}

export default TabApp;