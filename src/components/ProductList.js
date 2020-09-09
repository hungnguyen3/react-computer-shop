import React, { Component } from "react";
import Product from "./Product";
import Title from "./Title";
import { ProductConsumer } from "../context";

export default class ProductList extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="py-5">
					<div className="container">
						{/* title */}
						<Title name="our" title="products" />
						<div className="row">
							<ProductConsumer>
								{value => {
									return value.products.map(product => {
										// passing the key and product
										// an array of Product so each product must have a key
										return <Product key={product.id} product={product} />;
									});
								}}
							</ProductConsumer>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
