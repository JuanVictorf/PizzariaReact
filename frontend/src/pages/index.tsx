import { Inter } from '@next/font/google'
import Head from 'next/head';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Head>
      <title>SujeitoPizza - Faça seu login</title>
    </Head>
    <div>
      <h1>Sujeito Pizzaria</h1>
    </div>
    </>
  )
}
