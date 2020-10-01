import { ApolloProvider } from '@apollo/client'
import '../styles/globals.css'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import apolloClient from '../lib/apolloClient'
import TopNavbar from '../components/TopNavbar'

/**
 * This file can save states while navigating between pages.
 * This is top-level component
 */

function MyApp({ Component, pageProps }) {

  return (
    <ApolloProvider client={apolloClient}>
      <TopNavbar></TopNavbar>
      <Component {...pageProps} />
      <footer className={styles.footer}>
          Reddit App was created by Sebastien
      </footer>
    </ApolloProvider>
  )
}

export default MyApp
