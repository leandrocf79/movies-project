import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; //pegar os parâmetros
import api from '../../services/api'; 
import './filme-info.css';

import { toast } from 'react-toastify';

function Filme(){
  const {  id  } = useParams(); 
  const navigate = useNavigate(); 
  const[filme, setFilme] = useState({});
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
    
    .then((response)=> {
      
      setFilme(response.data);
      setLoading(false);

    })
   
    .catch(()=>{
      console.log("Filme não encontrado");
      navigate("/", {replace: true}); 
      return; 
    }) 
  }
  loadFilme();
  
  return()=>{
    console.log("Componente foi desmontado");
  }

}, [navigate, id]) 


function salvarFilme(){
  //alert("teste botão salvar filme")
  const minhaLista = localStorage.getItem("@salvarfilmes")
  
  let filmeSalvo = JSON.parse(minhaLista) || []; // Aqui vai verificar se existe ou criar um array

  const hasFilme = filmeSalvo.some((filmeSalvo)=> filmeSalvo.id === filme.id ); // Vai verificar por id se já existe na lista
//Vai retornar boolean

if(hasFilme){
  //alert("Esse filme já está na lista");
  toast.warn("Esse filme já está na lista");

return; // parar a execução
}
filmeSalvo.push(filme);
localStorage.setItem("@salvarfilmes", JSON.stringify(filmeSalvo));
//alert("Filme salvo com sucesso!")
toast.success("Filme salvo com sucesso!");

}


if(loading){
  return(
    <div className="filme-info">
      <h2>Carregando detalhes do filme...</h2>
    </div>
  )
}
  return(
    <div className="filme-info">
      
      <h1>{filme.title}</h1>
      <img src = { `https://image.tmdb.org/t/p/original/${filme.backdrop_path}` } alt={filme.title}/>
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>      
      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className="area-buttons">

      <button onClick={salvarFilme}>Salvar</button>
      
      <button><a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a></button>
      </div>
    
    </div>
  )
}

export default Filme;