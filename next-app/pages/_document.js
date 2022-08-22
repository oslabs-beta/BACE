import Document, { Html, Head, Main, NextScript } from 'next/document'
import SearchObj from './searchobj/index'

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <body>
          <SearchObj />
        </body>
      </Html>
    )
  }
}

export default CustomDocument