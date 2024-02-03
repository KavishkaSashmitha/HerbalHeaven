import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { NavbarSimple } from './components/navBar';

function App() {
  return (
    <>
      <Routes>
        <Route element={<NavbarSimple />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
