import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";

export default class Details extends Component {
	render() {
		return (
			<ProductConsumer>
				{value => {
					const {
						id,
						company,
						img,
						info,
						price,
						title,
						inCart,
					} = value.detailProduct;
					return (
						<div className="container py-5">
							{/* title */}
							<div className="row">
								<div className="col-10 mx-auto text-center text-slanted text-blue my-5">
									<h1>{title}</h1>
								</div>
							</div>
							{/* product information divided into 2 sections*/}
							<div className="row">
								{/* image section */}
								<div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
									<img src={img} className="img-fluid" alt="product" />
								</div>
								{/* info section */}
								<div className="col-10 mx-auto col-md-6 my-4 text-capitalize">
									{/* title, company, price and info */}
									<h1>model:{title}</h1>
									<h4 className="text-title text-uppercase text-muted mt-2 mb-2">
										made by : <span>{company}</span>
									</h4>
									<h4 className="text-blue">
										<strong>
											price : <span>${price}</span>
										</strong>
									</h4>
									<p className="text-capitalize font-weight-bold mt-5 mb-1">
										Information about product:
									</p>
									<p className="text-muted lead">{info}</p>
									{/* buttons */}
									<div>
										<Link to="/">
											<ButtonContainer>view products</ButtonContainer>
										</Link>
										<ButtonContainer
											cart
											disabled={inCart ? true : false}
											onClick={() => {
												value.addToCart(id);
												value.openModal(id);
											}}
										>
											{inCart ? "in cart" : "add to cart"}
										</ButtonContainer>
									</div>
								</div>
							</div>
						</div>
					);
				}}
			</ProductConsumer>
		);
	}
}
