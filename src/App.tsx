import Layout from "./components/layout/main";
import { ThemeProvider } from "./components/ui/theme-provider";

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Layout />
        </ThemeProvider>
    );
}

export default App;
