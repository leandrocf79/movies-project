import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; //para pegar os parâmetros

import api from '../../services/api'; // para usar await

/* Para usar o useParams verifique em routes.js o nome dado, 
se foi id, key ou outros nesta área --> <Route path="/filme/:id" element={ <Filme/> } />
Neste caso foi "id" */

function Filme(){
  const {  id  } = useParams(); 
//Pegou o id agora pode usar o useEffect

//para exibir em return
const[filme, setFilme] = useState({});

//Para exibir um texto enquanto carrega
const[loading, setLoading] = useState(true);



useEffect(()=> {
  async function loadFilme(){
    await api.get(`/movie/${id}` , {
      params:{
        api_key: "28fc232cc001c31e8a031f419d0a14ca",
        language: "pt-BR",
        page: 1,
       }      
    })
    //Se encontrar o filme entra em .then((response)
    .then((response)=> {
      //console.log(response.data);
      setFilme(response.data);
      setLoading(false);

    })
    //Se der errado entra em .catch
    .catch(()=>{
      console.log("Filme não encontrado");

    })

  }
  loadFilme();


  //Verificar a saida da página
  return()=>{
    console.log("Componente foi desmontado");
  }

}, [])


//Para exibir um texto enquanto carrega
if(loading){
  return(
    <div className="filme-info">
      <h2>Carregando detalhes do filme...</h2>
    </div>
  )
}//Quando loading for falso aí já vai para o próximo return abaixo. (já carregou tudo)


/*Na home tem a url que será utilizada abaixo, com um alteração, veja nas
propriedades da url da página "backdrop_path", "overview", "vote_average".

https://api.themoviedb.org/3/movie/550?api_key=28fc232cc001c31e8a031f419d0a14ca

<img src={`https:image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
<img src={`https:image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
*/
  return(
    <div className="filme-info">
      {/* <h1>Detalhes do filme { id } </h1> */}

      <h1>{filme.title}</h1>
      <img src={`https:image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>      
      <strong>Avaliação: {filme.vote_average} / 10</strong>
    </div>
  )
}

export default Filme;