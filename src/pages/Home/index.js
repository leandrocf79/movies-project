import { useEffect, useState} from 'react';
import api from '../../services/api';

import './home.css';
import { Link } from 'react-router-dom';

// URL DA API: /movie/now_playing?api_key=28fc232cc001c31e8a031f419d0a14ca&language=pt-BR

function Home(){
  const [filmes, setFilmes] = useState([]);


  useEffect(()=>{

    async function loadFilmes(){
      const response = await api.get("movie/now_playing", {
        params:{
         api_key: "28fc232cc001c31e8a031f419d0a14ca",
         language: "pt-BR",
         page: 1,
        }
      })

      //console.log(response.data.results); // Exibiu 20 itens, para pegar apenas 10:
      //console.log(response.data.results.slice(0,10)); //Agora é só passar para o setFilmes
      
      setFilmes(response.data.results.slice(0,10))

    }

    loadFilmes();

  }, [])

//    {filmes.map((filme)=> {     Vai percorrer toda a lista.

// imagem terá parte do link, pode concatenar com a base do  link. Veja a base do link no site de origem, em imagens. https:image.tmdb.org/t/p/original/
// Para concatenar lembre-se das aspas de crase.

  return(
    <div>
      <h1>BEM VINDO A HOME</h1>
      <div className='container'>
        <div className='lista-filmes'>
          {filmes.map((filme)=> {
            return(
              <article key={filme.id}>
                 <strong>{ filme.title }</strong>
                 <img src={`https:image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                 <Link to ={`filme/${ filme.id }`}>Acessar</Link>
              </article>
            )

          })}

        </div>
      </div>
    </div>
  )
}

export default Home;