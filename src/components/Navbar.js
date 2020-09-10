import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import styled from "styled-components";
import { ButtonContainer } from "./Button";

export default class Navbar extends Component {
	render() {
		return (
			<NavContainer className="navbar navbar-expand-sm navbar-dark px-sm-5">
				{/* icon */}
				<Link to="/">
					<img src={logo} alt="store" className="navbar-brand" />
				</Link>
				{/* products
                    align in the center
                    ml-5 = left margin by 5*/}
				<ul className="navbar-nav align-items-center">
					<li className="nav-item ml-3">
						<Link to="/" className="nav-link">
							products
						</Link>
					</li>
				</ul>
				{/* cart button */}
				<Link to="/cart" className="ml-auto">
					<ButtonContainer>
						<span className="mr-2">
							<i className="fas fa-cart-plus" /> Cart
						</span>
					</ButtonContainer>
				</Link>
			</NavContainer>
		);
	}
}

// styled Nav Bar
const NavContainer = styled.nav`
	background: var(--mainBlue);
	.nav-link {
		color: var(--navyBlue) !important;
		font-size: 1.5rem;
		text-transform: capitalize;
	}
	.nav-link:hover {
		color: var(--mainWhite) !important;
	}
`;
