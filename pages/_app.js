import "../styles/site.css";
import "../styles/positioning.css";

import ConversionTracking from "../components/ConversionTracking";

export default function App({ Component, pageProps }) {
  return <><ConversionTracking/><Component {...pageProps} /></>;
}
