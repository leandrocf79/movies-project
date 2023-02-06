/* Atualizar a página e verificar.

Vá em  inspecionar/Application/LocalStorage/http://localhost:3000/

para visualizar os dados do array que foi pego.

*/

import {useEffect, useState} from 'react';
import './favoritos.css';

//Para poder acessar os detalher usar:
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

function Favoritos(){

    const [filmes, setFilmes] = useState([]);
    useEffect(()=>{
        const minhaLista=localStorage.getItem("@salvarfilmes");
        setFilmes(JSON.parse(minhaLista) || [])

    }, [])

/* são 2 coisas. Tirar o item da lista e do localStorage.
filmes. Tem todos os filmes

filter() filtra as opções

return(item.id !== id);   Vai devolver todos os filmes menos o que foi excluido

Agora tratar de destruir em localStorage:


*/

function excluirFilme(id){
   // alert("Teste botão excluir. ID clicado: " + id);
   let filtroFilmes = filmes.filter((item)=>{
        return(item.id !== id);
   })
   setFilmes(filtroFilmes);
   localStorage.setItem("@salvarfilmes", JSON.stringify(filtroFilmes))

   toast.success("Filme removido com sucesso");

}


    return(
        <div className='meus-filmes'>
            <h1>Meus filmes favoritos</h1> 

        {filmes.length===0 && <span>Não tem filme salvo nesta lista</span>}
        
            <ul>
                {filmes.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button onClick={ ()=> excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default Favoritos;