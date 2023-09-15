import Image from 'next/image'
import Login from './login/page.js';
import Footer from './footer.js';
export default function Home() {
  return (
   <div>
    <Login/>
    <Footer/>
   </div>
  )
}
