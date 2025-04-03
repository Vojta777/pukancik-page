import { createTheme } from "@mui/material/styles";

// New Light theme with cyan aesthetic
const lightPalette = {
  primary: {
    main: "#00bcd4", // Cyan primary color
    contrastText: "#ffffff", // White text on cyan background
  },
  secondary: {
    main: "#00e5ff", // Lighter cyan secondary color
    contrastText: "#ffffff",
  },
  background: {
    default: "#ffffff", // White background for light mode
    paper: "#ffffff", // White paper color
  },
  text: {
    primary: "#212121", // Dark gray text for readability
    secondary: "#757575", // Lighter gray text
  },
  error: {
    main: "#f44336", // Red for error
  },
  warning: {
    main: "#ff9800", // Amber for warnings
  },
  info: {
    main: "#00bcd4", // Cyan for info
  },
  success: {
    main: "#4caf50", // Green for success
  },
};

// New Dark theme with green aesthetic
const darkPalette = {
  primary: {
    main: "#4caf50", // Green primary color
    contrastText: "#000000", // Black text for green background
  },
  secondary: {
    main: "#388e3c", // Darker green secondary color
    contrastText: "#000000", // Black text on dark green
  },
  background: {
    default: "#212121", // Black background for dark mode
    paper: "#1c1c1c", // Dark paper color
  },
  text: {
    primary: "#ffffff", // White text for dark mode
    secondary: "#e0e0e0", // Light gray for secondary text
  },
  error: {
    main: "#d32f2f", // Darker red for errors in dark mode
  },
  warning: {
    main: "#ffb300", // Dark amber for warning
  },
  info: {
    main: "#4caf50", // Green info color
  },
  success: {
    main: "#81c784", // Lighter green for success
  },
};

// Create the light theme with cyan aesthetic
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    ...lightPalette,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize", // Capitalize text for buttons
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow effect
          padding: "8px 16px", // Spacious padding
          "&:hover": {
            backgroundColor: lightPalette.primary.main,
            color: lightPalette.primary.contrastText,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          color: lightPalette.primary.main,
          fontWeight: 600, // Slightly bolder link text
          "&:hover": {
            textDecoration: "underline",
            color: lightPalette.secondary.main,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Soft shadow
        },
      },
    },
  },
});

// Create the dark theme with green aesthetic
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    ...darkPalette,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize", // Capitalize text for buttons
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)", // Deeper shadow effect for dark mode
          padding: "8px 16px", // Spacious padding
          "&:hover": {
            backgroundColor: darkPalette.primary.main,
            color: darkPalette.primary.contrastText,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          color: darkPalette.primary.main,
          fontWeight: 600, // Slightly bolder link text
          "&:hover": {
            textDecoration: "underline",
            color: darkPalette.secondary.main,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)", // Soft shadow
        },
      },
    },
  },
});
