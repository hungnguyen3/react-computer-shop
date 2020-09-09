import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
// have a package.json in the Cart folder to avoid importing many files
import Cart from "./components/Cart";
import Details from "./components/Details";
import Default from "./components/Default";
import ProductList from "./components/ProductList";
import Modal from "./components/Modal";

function App() {
	return (
		<React.Fragment>
			<Navbar></Navbar>
			<Switch>
				<Route exact path="/" component={ProductList}></Route>
				<Route path="/details" component={Details}></Route>
				<Route path="/cart" component={Cart}></Route>
				<Route component={Default} />
			</Switch>
			<Modal></Modal>
		</React.Fragment>
	);
}

export default App;
