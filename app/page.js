import Image from 'next/image'
import Header from './components/home/Header'
import HeroSection from './components/home/HeroSection'
import UserReviews from './components/home/UserReviews'
import Footer from './components/home/Footer'
import Features from './components/home/features'

export default function Home() {
  return (
    <main className="">
      <Header/>
      <HeroSection/>
      <Features />
      <UserReviews />
      <Footer />

      
    </main>
  )
}
