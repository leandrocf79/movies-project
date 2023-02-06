import RoutesApp from './routes';

import { ToastContainer } from 'react-toastify';
//No site diz para importar o css do ToastContainer:
//      https://fkhadra.github.io/react-toastify/introduction
//      https://fkhadra.github.io/react-toastify/installation
import 'react-toastify/dist/ReactToastify.css';

// Fechar ToastContainer em 3 segundos --> autoClose={3000}
function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={3000}/>
      <RoutesApp/>
    </div>
  );
}

export default App;
