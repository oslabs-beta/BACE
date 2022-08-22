import Link from "next/link"
import SearchObj from "./searchobj/index"
import NavBar from "../components/NavBar/navbar"
// import styles from "../styles/home.module.css"

// href="searchobj" maps /searchobj to pages/searchobj/index.js
function HomePage() {
  return (
    <main>
      {/* <NavBar /> */}
      <section>
        <h1>Home</h1>
      </section>
      <section>
        <Link href="/searchobj">Search object
        </Link>
      </section>
    </main>
  )
}

export default HomePage