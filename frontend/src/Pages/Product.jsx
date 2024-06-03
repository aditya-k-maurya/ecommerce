import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../Components/Breadcrum/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

const Product = () => {
	const [product, setProduct] = useState(null);

	const { all_product, isLoading } = useContext(ShopContext);
	const { productId } = useParams();

	useEffect(() => {
		if (all_product) {
			const productData = all_product.find((e) => e.id === Number(productId));
			setProduct(productData);
		}
	}, [all_product, productId]);



	if (!product) {
		return <div>Product not found</div>;
	}

  if (!isLoading) {
    return (
      <>
        <Breadcrum product={product} />
        <ProductDisplay product={product} />
        <DescriptionBox />
        <RelatedProducts />
      </>
    );
  }
};

export default Product;
