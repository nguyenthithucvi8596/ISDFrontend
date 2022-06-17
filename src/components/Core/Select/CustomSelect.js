import React from 'react';
import PropTypes from 'prop-types';
import { toJS } from "mobx";
// material-ui components
import { makeStyles } from '@material-ui/core/styles';
import {Select,MenuItem,OutlinedInput } from '@material-ui/core';

const useStyles= makeStyles(()=>({
    input: {
        borderRadius: '48px',
        width: '495px',
        background: '#F7FAFB',
    },
}))

const CustomSelect = (props) => {
    console.log(toJS(props.company))

    const classes=useStyles();
    const [value, setValue] = React.useState('');
    const handleSelect = (event) => {
        setValue(event.target.value);
      };
    return (
        <Select
    
        displayEmpty
        value={value}
        onChange={handleSelect}
        input={<OutlinedInput />}

        className={classes.input}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem disabled value="">
          <em>Placeholder</em>
        </MenuItem>
        {
       toJS(props.company) !== false ? 
        toJS(props.company).map((name) => 
        (
          <MenuItem
            key={name.companyCode}
            value={name.companyCode}
            // style={getStyles(name, personName, theme)}
          >
            {name.companyName}
          </MenuItem>
        )):''
      }
      </Select>
    );
};


CustomSelect.propTypes = {

};


export default CustomSelect;
