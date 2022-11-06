import React from 'react';
import { createTheme } from '@mui/material/styles';

//Create two themes, one for light mode and one for dark mode

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#F28C28',
        },
        secondary: {
            main: '#00308F',
        },
        //font color
        text: {
            primary: '#164C27',
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

export {getTheme};
