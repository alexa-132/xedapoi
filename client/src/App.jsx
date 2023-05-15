import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import { 
  Routes, 
  Route, 
  Navigate
} from 'react-router-dom'
import Success from "./pages/Success";
import { useSelector } from "react-redux";


const App = () => {
  const user = false;
  // useSelector((state) => state.user.currentUser);
  return (
    <Routes>
      <Route path='/' 
        element = {<Home/>}
      />
      <Route path='/products/:categories' 
        element = {<ProductList/>}
      />
      <Route path='/product/:id' 
        element = {<Product/>}
        />
      <Route path='/login'
        element = { user ? <Navigate to='/'/> : <Login/>}
        />
      <Route path='/register' 
        element = { user ? <Navigate to='/'/> : <Register/>}
      />
      <Route path='/cart' 
        element = {<Cart/>}
      />
      <Route path='/success' 
        element = {<Success/>}
      />
    </Routes>
  )
};

export default App;