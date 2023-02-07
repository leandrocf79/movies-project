import './header.css';
import { Link } from 'react-router-dom'; //L maiúsculo

function Header(){
  return(
    <header>
      <Link className="logo" to="/">Filmes Flix</Link>
      <nav>
        <Link className="favoritos" to="/">Página inicial</Link>
        <Link className="favoritos" to="/favoritos">Meus filmes favoritos</Link>
      </nav>
     
    </header>
  )
}

export default Header;