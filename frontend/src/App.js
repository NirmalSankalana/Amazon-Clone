import data from './data';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import ProductScreen from './screens/ProductScreen';

import HomeScreen from './screens/HomeScreen';

function App() {
  return (
    <BrowserRouter>
    <div>
      <header>
        <Link to="/">Amazona</Link>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/product/:slug' element={<ProductScreen />} />
        </Routes>

      </main>
    </div>
    </BrowserRouter>
  );
}

export default App;

