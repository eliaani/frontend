import React, { useState } from 'react';
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';
import Clothlist from './ClothList';
import Home from './Home';
import Producerlist from './ProducerList';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import HomeIcon from '@mui/icons-material/Home';
import FactoryIcon from '@mui/icons-material/Factory';

function TabApp(){
    const [value, setValue] = useState('one');
    const handleChange = (event, value) => {
        setValue(value);
    };
    return(
    <div>
        <Tabs value={value} onChange={handleChange}>
            <Tab icon={<HomeIcon />} value='one' label='Home'/>
            <Tab icon={<CheckroomIcon />} value='two' label='Clothes'/>
            <Tab icon={<FactoryIcon />} value='three' label='Producers'/>

        </Tabs>
        {value === 'one' && <Home/>}
        {value === 'two' && <Clothlist/>}
        {value === 'three' && <Producerlist/>}
    </div>
);
}

export default TabApp;