import React from "react";
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import Offers from "../Components/Offer/Offers";
import NewCollections from "../Components/NewCollections/NewCollections";

const Shop = () => {
	return (
		<>
			<Hero />
			<Popular />
			<Offers />
			<NewCollections />
		</>
	);
};

export default Shop;
