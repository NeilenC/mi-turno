import "../styles/globals.css";
import { Provider } from "react-redux";
import LayOut from "../components/LayOut";
import store from "../redux/store";
import { createTheme , ThemeProvider} from "@mui/material";


const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: 1,
            borderColor: "#d4d4d4",
          },
       
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: 1,
            borderColor: "#221f1f",
          },
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <LayOut />
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
    </>
  );
}

export default MyApp;
