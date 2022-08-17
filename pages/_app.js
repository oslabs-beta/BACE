import "../styles/globals.css"

// _app.js is a good way to have custom shared layouts across different routes/pages
// creating an _app.js file overrides Next.js' default 'App' component, allowing for greater control
export default function App({ Component, pageProps }) {
  // 'Component' prop represents the currently active page and dynamically changes whenever navigating to new pages
  // Any props sent to 'Component' will be received by the page
  // 'pageProps' is an object with initial props preloaded for the page using Next.js' data-fetching methods (else empty object)
  return <Component {...pageProps} />
}