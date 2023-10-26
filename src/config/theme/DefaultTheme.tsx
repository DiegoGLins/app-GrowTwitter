import { ThemeProvider } from "styled-components"

const defaultTheme = {
    colors: {
        primary: '#ff7d22',
        secondary: '#2b385b',
        button: '#1d9bf0',
        textPrimary: '#000',
        textSecondary: '#fff'
    },
    borderRadius: '8px',
    padding: '8px 32px',
    borderColor: '#000',
    border: '2px solid',
    fontFamily: "Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
    fontSize: '14px',
}

interface DefaultThemeProps {
    children: React.ReactNode
}

const DefaultTheme: React.FC<DefaultThemeProps> = ({ children }) => {
    return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
}

export default DefaultTheme