import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

// createContext gives Provider and Consumer
const ProductContext = React.createContext();

class ProductProvider extends Component {
	// state is where you store props of the component
	state = {
		products: [],
		detailProduct: detailProduct,
		cart: [],
		modalOpen: false,
		modalProduct: detailProduct,
		cartSubTotal: 1,
		cartTotal: 2,
		cartTax: 3,
	};

	componentDidMount() {
		this.setProduct();
	}

	// copy the data from storeProducts into products
	setProduct = () => {
		let tempProducts = [];
		storeProducts.forEach(item => {
			const singleItem = { ...item };
			tempProducts = [...tempProducts, singleItem];
		});
		this.setState(() => {
			return { products: tempProducts };
		});
	};

	// function for the items in the products
	getItem = id => {
		return this.state.products.find(item => item.id === id);
	};
	handleDetail = id => {
		const product = this.getItem(id);
		this.setState(() => {
			return { detailProduct: product };
		});
	};
	addToCart = id => {
		let tempProducts = [...this.state.products];
		const index = tempProducts.indexOf(this.getItem(id));
		const product = tempProducts[index];

		product.inCart = true;
		product.count = 1;
		product.total = product.price;

		this.setState(
			() => {
				return { products: tempProducts, cart: [...this.state.cart, product] };
			},
			() => {
				this.addTotal();
			}
		);
	};

	//fucntions for the modal
	openModal = id => {
		const product = this.getItem(id);
		this.setState(() => {
			return { modalProduct: product, modalOpen: true };
		});
	};
	closeModal = () => {
		this.setState(() => {
			return { modalOpen: false };
		});
	};

	// functions for the cart
	increment = id => {
		let tempCart = [...this.state.cart];
		const product = tempCart.find(item => item.id === id);
		product.count++;
		product.total = product.price * product.count;

		this.setState(
			() => {
				return { cart: [...tempCart] };
			},
			() => {
				this.addTotal();
			}
		);
	};
	decrement = id => {
		let tempCart = [...this.state.cart];
		const product = tempCart.find(item => item.id === id);
		product.count--;
		if (product.count === 0) {
			this.removeItem(id);
		} else {
			product.total = product.price * product.count;
			this.setState(
				() => {
					return { cart: [...tempCart] };
				},
				() => {
					this.addTotal();
				}
			);
		}
	};
	removeItem = id => {
		let tempProducts = [...this.state.products];
		let tempCart = [...this.state.cart];
		tempCart = tempCart.filter(item => item.id !== id);
		const index = tempProducts.indexOf(this.getItem(id));
		// removedProduct is pointing to an item inside tempProducts
		let removedProduct = tempProducts[index];
		removedProduct.inCart = false;
		removedProduct.count = 0;
		removedProduct.total = 0;
		this.setState(
			() => {
				return {
					cart: [...tempCart],
					products: [...tempProducts],
				};
			},
			() => {
				this.addTotal();
			}
		);
	};
	clearCart = () => {
		this.setState(
			// clear the cart array
			() => {
				return { cart: [] };
			},
			// this will give a new set of new copy of the products
			() => {
				this.setProduct();
				this.addTotal();
			}
		);
	};
	addTotal = () => {
		let subTotal = 0;
		this.state.cart.forEach(item => {
			subTotal += item.total;
		});
		const tempTax = subTotal * 0.12;
		// 2 decimal places
		const tax = parseFloat(tempTax.toFixed(2));
		const total = subTotal + tax;
		this.setState(() => {
			return {
				cartSubTotal: subTotal,
				cartTax: tax,
				cartTotal: total,
			};
		});
	};
	render() {
		return (
			<ProductContext.Provider
				value={{
					...this.state,
					handleDetail: this.handleDetail,
					addToCart: this.addToCart,
					openModal: this.openModal,
					closeModal: this.closeModal,
					increment: this.increment,
					decrement: this.decrement,
					removeItem: this.removeItem,
					clearCart: this.clearCart,
				}}
			>
				{this.props.children}
			</ProductContext.Provider>
		);
	}
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
