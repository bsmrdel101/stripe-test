import { Provider } from 'jotai';
import '../styles/globals.scss';


export default function App({ Component, pageProps }: any) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}
