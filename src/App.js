import Navbar from './mainComponents/navbar';
import css from './App.css';
import Home from './Home/home';
import SignUp from './signUp/signUp.js';
import Footer from './mainComponents/footer';
import AboutUs from './aboutUs/aboutUs.js';
import Products from './products/products.js';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import Login from './login/login.js';

import Loader from './Loader/loader.js';
import { Suspense } from 'react/cjs/react.development';
import { createContext } from 'react/cjs/react.development';
import PublicRoute from './routesHandling/publicRoutes';
import PrivateRoute from './routesHandling/privateRoutes';
import ProtectedRoutes from './routesHandling/protectedRoutes';
import { useState, useEffect } from 'react';
import authCheck from './authService/authCheck';

let App = ()=> {
    let [ isAuthenticated, setIsAuthenticated ] = useState(false);
    let [ isAdmin, setIsAdmin ] = useState(true);
    let [ isLoading, setIsLoading ] = useState(true); 
    
    useEffect(()=>{
        let req = authCheck(setIsAuthenticated, setIsLoading);
        console.log(isAuthenticated);

        return ()=>{
          req.abort();
        }
    })

    return (
      <div id="app-container">
        <div id='backgroundImg'></div>
        <Router>

            <Navbar
              isAuth={isAuthenticated}
            />

              {!isLoading ?
                <Suspense fallback={<h1>loading...</h1>}>
                  <Switch>

                    {/*///////////////// Public ROUTES /////////////////*/}
                    <PublicRoute
                      path="/Login"
                      isAuthenticated={isAuthenticated}
                    >
                      <Login setIsAuthenticated={setIsAuthenticated} />
                    </PublicRoute>
                    
                    <PublicRoute
                      path="/SignUp"
                      isAuthenticated={isAuthenticated}
                    >
                      <SignUp />
                    </PublicRoute>

                    {/*///////////////// NEURAL ROUTES /////////////////*/}
                    <Route exact path='/'>
                      <Home />
                    </Route>
                    
                    <Route path='/AboutUs'>
                      <AboutUs />
                    </Route>
                    
                    <Route path='/products'>
                      <Products />
                    </Route>


                    {/*///////////////// Private ROUTES /////////////////*/}

                    <PrivateRoute
                      
                      isAuthenticated={isAuthenticated}
                    >
                      <ProtectedRoutes setIsAuthenticated={setIsAuthenticated} isAdmin={isAdmin} />
                    </PrivateRoute>
        
                    {/*///////////////// 404 ROUTE /////////////////*/}
                    <Route path='*'>
                      <h1>nada</h1>
                    </Route>
                  
                  </Switch>
                </Suspense>
            :
              <Loader />
            }






            {/* <Switch >
              <Route exact path ="/">
                <Home />
              </Route>
              <Route path ="/Login">
                <Login />
              </Route>
              <Route path ="/SignUp">
                <SignUp/>
              </Route>
              <Route path ="/AboutUs">
                <AboutUs />
              </Route>
              <Route path ="/Cartel">
                <Cartel />
              </Route>
              <Route path="/Products">
                <Products />
              </Route>
              <Route exact path="/Profile">
                <Profile />
              </Route>
              <Route path="/profile/manageItems">
                <UpdateItemBox />
              </Route>
            </Switch> */}
            <Footer />
        </Router>
      </div>
    );
}
export default App; 
