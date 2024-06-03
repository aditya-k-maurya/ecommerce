import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
	let cart = {};
	for (let index = 0; index < 300 + 1; index++) {
		cart[index] = 0;
	}
	return cart;
};

const ShopContextProvider = (props) => {
	const [cartItems, setCartItems] = useState(getDefaultCart());
	const [all_product, setAll_Product] = useState([]);

	useEffect(() => {
		fetchProducts();
		fetchCartItem();
	}, []);

	const fetchCartItem = async () => {
		if (localStorage.getItem("auth-token")) {
			try {
				const response = await axios.post(
					"http://localhost:4000/api/v1/user/getcartData",
					{  },
					{
						headers: {
							"auth-token": `${localStorage.getItem("auth-token")}`,
						},
					}
				);

				setCartItems(response.data.data);
			} catch (error) {
				console.error("Error in adding to cart :", error);
			}
		}
	};

	const fetchProducts = async () => {
		try {
			const response = await axios.get(
				"http://localhost:4000/api/v1/product/allproducts",
				{},
				{
					headers: {
						"auth-token": `${localStorage.getItem("auth-token")}`,
					},
				}
			);
			setAll_Product(response.data.data); // Set the response data to the state
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};

	const addToCart = async (itemId) => {
		setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
		if (localStorage.getItem("auth-token")) {
			try {
				const response = await axios.post(
					"http://localhost:4000/api/v1/user/addtocart",
					{ itemId },
					{
						headers: {
							"auth-token": `${localStorage.getItem("auth-token")}`,
						},
					}
				);

				// console.log(response);
			} catch (error) {
				console.error("Error in adding to cart :", error);
			}
		}
	};

	const removeFromCart = async (itemId) => {
		setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
		if (localStorage.getItem("auth-token")) {
			try {
				const response = await axios.post(
					"http://localhost:4000/api/v1/user/removefromcart",
					{ itemId },
					{
						headers: {
							"auth-token": `${localStorage.getItem("auth-token")}`,
						},
					}
				);

				console.log(response);
			} catch (error) {
				console.error("Error in adding to cart :", error);
			}
		}
	};

	const getTotalCartAmount = () => {
		let totalAmount = 0;
		for (const item in cartItems) {
			if (cartItems[item] > 0) {
				let itemInfo = all_product.find(
					(product) => product.id === Number(item)
				);
				totalAmount += itemInfo.new_price * cartItems[item];
			}
		}
		return totalAmount;
	};

	const getTotalCartItems = () => {
		let totalItem = 0;
		for (const item in cartItems) {
			if (cartItems[item] > 0) {
				totalItem += cartItems[item];
			}
		}
		return totalItem;
	};

	const contextValue = {
		getTotalCartItems,
		getTotalCartAmount,
		all_product,
		cartItems,
		addToCart,
		removeFromCart,
	};

	return (
		<ShopContext.Provider value={contextValue}>
			{props.children}
		</ShopContext.Provider>
	);
};

export default ShopContextProvider;
