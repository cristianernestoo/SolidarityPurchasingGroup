import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Router, Switch, Route, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import OrdersPage from './components/OrdersPage';
import ShopEmployeePage from './components/ShopEmployeePage';
import RegisterInterface from './components/RegisterInterface';
import Market from './views/Market';
import Homepage from './components/Homepage';
import LoginForm from './LoginForm';
import API from './API';
import VirtualClock from './components/VirtualClock';
import FarmerPlanning from './components/FarmerPlanning';
import FarmerInterface from './components/FarmerInterface';
import ClientPage from './components/ClientOrders/ClientPage';
import { FarmerOrders } from './components/FarmerOrders';
import WarehouseManagerPage from './components/WarehouseManagerPage';
import WarehouseEmployeePage from './components/WarehouseEmployeePage';
import ManagerPage from './components/ManagerPage';
import WeeklyReports from "./components/WeeklyReports";
import MonthlyReports from "./components/MonthlyReports";
import {Clock} from "./Clock.js";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userid, setUserid] = useState(0);
  const [userEmail, setUserEmail] = useState(''); //getting the email
  const [userRole, setUserRole] = useState('');
  const [dirty, setDirty] = useState(false);
  const [orders, setOrders] = useState([]);
  const [cancelOrders, setCancelOrders] = useState([]);
  const routerHistory = useHistory();
  const [products, setProducts] = useState([]);
  const [notificationFlag, setNotificationFlag] = useState(0); // 0 notification not showed yet, 1 notification showed
  const [farmerProducts, setFarmerProducts] = useState([]);
  const [currentClient, setCurrentClient] = useState('');
  const [clientOrders, setClientOrders] = useState([]);
  const [clientAcceptedOrders, setClientAcceptedOrders] = useState([]);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [clock, setClock] = useState(null);

  useEffect(() => {
    if (!initialized) {
      setClock(new Clock());
      setInitialized(true);
    }

  }, [initialized]);

  useEffect(() => {
    API.getWeekProducts().then((p) => {
      setProducts(p);

    });
  }, [products]);



  useEffect(() => {
    API.getUserInfo().then((user) => {
      setUserEmail(user.email);
      setUserid(user.id);
      setLoggedIn(true);
      setUserRole(user.role);
      setDirty(true);
    })
  }, [])

  // Rehydrate clientsList & ordersList when user is logged in
  useEffect(() => {
    if (loggedIn && (userRole === "shopemployee" || "warehousemanager" || "warehouseemployee" || "manager") && dirty) {
      API.getAllOrders().then((o) => {
        setOrders(o);
      });
    }
  }, [loggedIn, userRole, dirty]);

  useEffect(() => {
    if (userRole === "client" && userid) {
      API.getClientById(userid).then((client) => {
        setCurrentClient(client);
        API.getNotifications(userid).then((notification) => {
          if (notification.length > 0) {
            API.getCancellingOrdersByClientId(userid).then((orders) => {
              setCancelOrders(orders);
            });
          }
        });
        API.getClientPendingOrders(userid).then((orders) => {
          setClientOrders(orders)
        })
        API.getClientAcceptedOrders(userid).then((orders) => {
          setClientAcceptedOrders(orders)
        })
      });
    }
  }, [userid, userRole])

  useEffect(() => {
    if (userRole === "farmer" && userid) {
      API.getProductsByFarmer(userid).then((products) => {
        setFarmerProducts(products);
      });
      API.getOrderedProductsByFarmer(userid).then((products) => {
        setOrderedProducts(products);
      });
    }
  }, [userid, userRole])

  const doLogIn = (email, password) => {
    API.logIn(email, password, routerHistory).then(([e]) => {
      API.getUserInfo().then((user) => {
        setUserEmail(e);
        setUserid(user.id);
        setLoggedIn(true);
        setUserRole(user.role);
        setDirty(true);
      }).catch((err) => console.log(err));
    }).catch((err) => {
      console.log(err);
    });
  };

  const doLogOut = () => {
    API.logOut().then(() => {
      setLoggedIn(false);
      setUserEmail('');
      setUserid(0);
      setUserRole('');
      setCancelOrders([]);
      routerHistory.push('/');
    }).catch((err) => console.log(err));
  };
  
  return (
    <Router history={routerHistory}>
      <NavBar loggedIn={loggedIn} doLogOut={doLogOut} userRole={userRole} />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path='/products' render={({ location }) =>
          <>
            <Market products={products} userid={userid} userRole={userRole} currentClient={currentClient}
              client={location.state ? location.state.client : ""} show={cancelOrders ? (cancelOrders.length > 0 && notificationFlag === 0) : false}
              cancelOrders={cancelOrders} setNotificationFlag={setNotificationFlag} clock={clock} />
          </>
        } />
        <Route exact path="/orders">
          {loggedIn && userRole == 'shopemployee' ? <OrdersPage orders={orders} setOrders={setOrders} loggedIn={loggedIn} /> : <LoginForm doLogIn={doLogIn} />}
        </Route>
        <Route exact path="/clientlist">
          {loggedIn && userRole == 'shopemployee' ? <ShopEmployeePage /> : <LoginForm doLogIn={doLogIn} />}
        </Route>
        <Route exact path="/warehouseEmployee">
          {loggedIn && userRole == 'warehouseemployee' ? <WarehouseEmployeePage orders={orders} /> : <LoginForm doLogIn={doLogIn} />}
        </Route>
        <Route exact path="/registerform">
          <RegisterInterface userRole={userRole} />
        </Route>
        <Route exact path="/clock">
          {initialized && <VirtualClock clock={clock} />}
        </Route>

        {loggedIn ? (
          ''
        ) : (<Route exact path="/login">
          <LoginForm doLogIn={doLogIn} />
        </Route>)}
        <Route exact path="/farmer">
          {loggedIn && userRole == 'farmer' ? <FarmerInterface products={farmerProducts} userid={userid} clock={clock} /> : <LoginForm doLogIn={doLogIn} />}
        </Route>
        <Route exact path="/farmerPlanning">
          {loggedIn && userRole == 'farmer' ? <FarmerPlanning userid={userid} products={products} farmerProducts={farmerProducts} clock={clock} /> : <LoginForm doLogIn={doLogIn} />}
        </Route>
        <Route exact path="/client">
          {loggedIn && userRole == 'client' ? <ClientPage clientOrders={clientOrders} clientAcceptedOrders={clientAcceptedOrders} /> : <LoginForm doLogIn={doLogIn} />}
        </Route>
        <Route exact path="/farmerOrders">
          {loggedIn && userRole == 'farmer' ? <FarmerOrders userid={userid} orderedProducts={orderedProducts} clock={clock} /> : <LoginForm doLogIn={doLogIn} />}
        </Route>
        <Route exact path="/warehousemanager">
          {loggedIn && userRole=='warehousemanager' ? <WarehouseManagerPage orders={orders} /> : <LoginForm doLogIn={doLogIn}/>}
        </Route>
        <Route exact path="/manager">
          {loggedIn && userRole=='manager' ? <ManagerPage userid={userid}/> : <LoginForm doLogIn={doLogIn}/>}
        </Route>
        <Route exact path="/weeklyReports">
          {loggedIn && userRole=='manager' ? <WeeklyReports clock={clock.time} orders={orders}/> : <LoginForm doLogIn={doLogIn}/>}
        </Route >
        <Route exact path="/monthlyReports">
          {loggedIn && userRole=='manager' ? <MonthlyReports orders={orders}/> : <LoginForm doLogIn={doLogIn}/>}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
