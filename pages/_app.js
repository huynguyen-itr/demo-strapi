import "../styles/globals.css";
import { createClient, Provider } from "urql";
import Nav from "../components/Nav";
import { StateContext } from "../lib/context";
import { Toaster } from "react-hot-toast";
console.log('process.env.NEXT_PUBLIC_BACKEND_API', process.env.NEXT_PUBLIC_BACKEND_API);
const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

function MyApp({ Component, pageProps }) {
  return (
      <StateContext>
        <Provider value={client}>
          <Toaster />
          <Nav />
          <Component {...pageProps} />
        </Provider>
      </StateContext>
  );
}

export default MyApp;
