import "../styles/globals.css";
import { Provider } from "react-redux";
import LayOut from "../components/LayOut";
import store from "../redux/store";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        {/* <LayOut/> */}
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
