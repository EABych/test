import Calculator from './Components/Calculator.jsx';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from "./Components/Table";

const CONTENT_BY_TABS = [
    <Table/>,
    <Calculator/>,
    <div/>,
]

function App() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="App">
            <Box sx={{width: '100%', bgcolor: 'background.paper'}}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Item One"/>
                    <Tab label="Item Two"/>
                    <Tab label="Item Three"/>
                </Tabs>
            </Box>
            {CONTENT_BY_TABS[value]}
        </div>
    );
}

export default App;
