import { Link } from 'react-router-dom';

import './erro.css';

function Erro(){
    return(
        <div className='erro-404'>
            <h1>Erro 404</h1>
            <h2>Página não encontrada.</h2>

            <Link to="/">Voltar para página inicial</Link>
        </div>
    )
}

export default Erro;