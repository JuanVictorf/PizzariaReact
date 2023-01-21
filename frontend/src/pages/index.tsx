import { useContext, FormEvent} from 'react';
import { Inter } from '@next/font/google'
import Head from 'next/head';
import Image from 'next/image';

import styles from '../../styles/home.module.scss';
import logoImg from '../../public/logo.svg';

import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

import { AuthContext } from '../contexts/AuthContext';

import Link from 'next/link';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { signIn } = useContext(AuthContext)

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    let data = {
      email: "algum@teste.com",
      password: "123123"
    }

    await signIn(data)
  }


  return (
    <>
    <Head>
      <title>SujeitoPizza - Faça seu login</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Sujeito Pizzaria"/>
      
      <div className={styles.login}>
        <form onSubmit={handleLogin}>
          <Input
            placeholder="Digite seu email"
            type="text"
          />

          <Input
            placeholder="Sua senha"
            type="password"
          />

          <Button
            type="submit"
            loading={false}
          >
            Acessar
          </Button>
      
        </form>

        <Link href="/signup">
            <p className={styles.text}>Não possui uma conta? Cadastre-se</p>
        </Link>
      </div>

    </div>
    </>
  )
}
