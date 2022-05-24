import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import replaceUnderScore from '../utils/textMod'

import AnimeName from '../components/AnimeName'
export default function Home({animes}) {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>Anime Facts</h1>
        <p className='subtitle'>Select an anime:</p>
        {animes.data.map((value,key)=>(
          <Link key={key} href={`/${value.anime_name}`}>
              <AnimeName name={replaceUnderScore(value.anime_name)}/>
          </Link>
        ))}
      </div>
    </>
  )
}

export async function getStaticProps (){
  const endpoint = 'https://anime-facts-rest-api.herokuapp.com/api/v1/';
  const response = await fetch(endpoint);
  const data = await response.json();

  return{
    props:{
      animes:data
    }
  }
}