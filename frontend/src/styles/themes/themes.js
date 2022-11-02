import React from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider, createTheme } from '@mui/material/styles';

//Create two themes, one for light mode and one for dark mode

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#FA4616',
        },
        secondary: {
            main: '#0021A5',
        },
        background: {
            default: '#fff',
        }
    }
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#22884C',
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            default: '#000',
        }
    }
});

const getTheme = () => {
    if(localStorage.getItem('theme') === 'light') {
        return lightTheme;
    } else if (localStorage.getItem('theme') === 'dark') {
        return darkTheme;
    } else {
        return lightTheme;
    }
}

export {lightTheme, darkTheme, getTheme};
