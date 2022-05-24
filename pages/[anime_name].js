import Image from "next/image";
import Router, { useRouter } from "next/router";
import { useState } from "react";

export const getStaticPaths = async ()=>{
    const endpoint = 'https://anime-facts-rest-api.herokuapp.com/api/v1/';
    const response = await fetch(endpoint);
    const data = await response.json();

    const paths = data.data.map(name=>{
        return{
            params:{anime_name:name.anime_name}
        }
    })
    return {
        paths,
        fallback:false,
    }
}
export const getStaticProps = async (context) =>{
    const anime_name = context.params.anime_name
    const response = await fetch(`https://anime-facts-rest-api.herokuapp.com/api/v1/${anime_name}`)
    const data = await response.json()
    return {
        props: {anime:data}
    }
}
const DetailsPage = ({anime}) => {
    const [imgSrc, setImgSrc] = useState(anime.img)
    const router = useRouter()
    const {anime_name} = router.query
    return (
        <div className="details-container">
            <h1 className="titles">{anime_name}</h1>
            <Image src={imgSrc} 
            height={400} 
            width={400} 
            alt={`cover photo of anime}`}
            placeholder="blur"
            blurDataURL={imgSrc }
            onError={()=>setImgSrc("/filler-image.png")}
            className="anime-image"
            />
            <ul>
            {anime.data.map((value,key)=>(
                <li key={key} className="anime-facts">{value.fact}</li>
            ))}
            </ul>
        </div>
    );
}

export default DetailsPage;