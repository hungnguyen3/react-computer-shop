import React, { Component } from "react";
import Title from "../Title";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import { ProductConsumer } from "../../context";
import CartList from "./CartList";
import CartTotal from "./CartTotal";

export default class Cart extends Component {
	render() {
		return (
			<section>
				<ProductConsumer>
					{value => {
						const { cart } = value;
						if (cart.length > 0) {
							return (
								// wrap inside react fragment
								// return only 1 item(1 div)
								<React.Fragment>
									{/* passing in title and cart */}
									<Title name="your" title="cart"></Title>
									<CartColumns></CartColumns>
									<CartList value={value}></CartList>
									<CartTotal
										value={value}
										history={this.props.history}
									></CartTotal>
								</React.Fragment>
							);
						} else {
							return <EmptyCart></EmptyCart>;
						}
					}}
				</ProductConsumer>
			</section>
		);
	}
}
