import { useEffect, useState} from 'react';
import api from '../../services/api';

import './home.css';
import { Link } from 'react-router-dom';

// URL DA API: /movie/now_playing?api_key=28fc232cc001c31e8a031f419d0a14ca&language=pt-BR

function Home(){
  const [filmes, setFilmes] = useState([]);
  const [loading, SetLoading] = useState(true); // Carregando filmes...  (Deixe "true" e passe para falso mais abaixo, apos carregar todos os filmes)


  useEffect(()=>{

    async function loadFilmes(){
      const response = await api.get("movie/now_playing", {
        params:{
         api_key: "28fc232cc001c31e8a031f419d0a14ca",
         language: "pt-BR",
         page: 1,
        }
      })

      setFilmes(response.data.results.slice(0,10))
      
      // Carregando filmes...  (Passe para "false" para exibir o conteúdo)
      SetLoading(false);
    }

    loadFilmes();

  }, [])



// Carregando filmes...
if(loading){
  return(
    <div className='loading'>
      <h3>Carregando filmes...</h3>
    </div>
  )
}


  return(
    <div>
      <div className='container'>
        <div className='lista-filmes'>
        <h1>Top 10</h1>
          {filmes.map((filme)=> {
            return(
              <article key={filme.id}>
                 <strong>{ filme.title }</strong>
                 <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
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