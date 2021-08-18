import 'antd/dist/antd.css'
import '../styles/page/comm.css'
import React, {useEffect, useLayoutEffect} from 'react';

const canUseDOM = typeof window !== 'undefined';
React.useLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
