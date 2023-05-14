import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';

const SelectComponent = ({ handleChangeCategory, uniqtags }) => {

   
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tags</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={uniqtags}
                    label="Category"
                    onChange={handleChangeCategory}
                >
                    <MenuItem value="">All</MenuItem>
                    {
                         uniqtags && uniqtags.map((tagFilter, i) => (
                              <MenuItem key={i}>
                                 <Link to={`/search/tag/${tagFilter}`}>{tagFilter}</Link>
                                </MenuItem>

                         ))
                     }


                </Select>
            </FormControl>
        </Box>
    )
}

export default SelectComponent