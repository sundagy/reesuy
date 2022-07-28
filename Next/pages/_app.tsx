import AppElectroNext from './_electronext'
import type { AppProps } from 'next/app'
//add your new imports below ¬

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <AppElectroNext>
      <Component {...pageProps} /> 
    </AppElectroNext>
  )
}

export default MyApp