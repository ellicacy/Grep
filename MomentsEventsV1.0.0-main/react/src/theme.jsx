import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      //Grey 900
      main: '#111827',
    },
    secondary: {
      //Grey 600
      main: '#757575',
    },
    grey200: {
      main: '#E5E7EB',
    },
    grey400: {
      main: '#9CA3AF',
    },
    grey100: {
      main: '#F3F4F6',
    },
  },
  background: {
    default: '#FFFFFF',
  },
  typography: {
    fontFamily: [
      'Inter',
    ].join(','),
    h1: {
      fontWeight: 500,
      fontSize: '28px',
      lineHeight: '34px',
    },
    h2: {
      fontWeight: 700,
      fontSize: '18px',
      lineHeight: '22px',
    },
    body1: {
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '24px',
    },
    body2: {
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '12px',
      lineHeight: '15px',
    },
    subtitle1: {
      color: '#9CA3AF',
      fontSize: '14px',
      fontWeight: 500,
      '&:hover': {
        transition: '300ms',
        color: '#9CA3AF',
      },
    },

  },
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 2560,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        border: '1px solid',
      },
      styleOverrides: {
        root: {
          fontSize: '15px',
          borderRadius: 0,
          textTransform: 'none',
          backgroundColor: '#111827',
          color: '#FFFFFF',
          '&:hover': {
            transition: '100ms',
            backgroundColor: '#E5E7EB',
            color: '#111827',
          },
          '&:disabled': {
            backgroundColor: '#111827',
            color: '#FFFFFF',
            opacity: 0.4, // Ajouter une opacité pour indiquer que le bouton est désactivé
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          color: '#111827',
          '&:hover': {
            transition: '100ms',
            backgroundColor: '#FFFFFF',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'inherit',
          '&:hover': {
            transition: '100ms',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
          border: '1px solid #D1D5DB',
          '&:hover': {
            border: '1px solid #111827',
            zIndex: 1,
          },
          '&:selected': {
            border: '1px solid #111827',
            zIndex: 1,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          width: '100%',
          backgroundColor: '#FFFFFF',
          '& fieldset': {
            border: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiCardActionArea: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '18px',
          lineHeight: '22px',
          color: '#9CA3AF',
          textTransform: 'none',
          '&: Mui-selected': {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          },
        }
      }
    },
  },
  inputProps: {
    sx: {
      fontSize: '12px',
      lineHeight: '15px',
      height: '14.5px',
      // paddingLeft: '10px',
    },
  },
});

export default theme;