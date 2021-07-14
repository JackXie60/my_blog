import '../styles/page/comm.css'
import 'antd/dist/antd.css'
import React, { useEffect } from "react"
React.useLayoutEffect = useEffect;
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
