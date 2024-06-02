import React, { useEffect, useState } from 'react'
import './Popular.css'
import Item from '../Items/Item'
import axios from 'axios'

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  
  useEffect(() => {
    fetchPopularProducts()
  }, [])
  
    	const fetchPopularProducts = async () => {
				try {
					const response = await axios.get(
						"http://localhost:4000/api/v1/product/popularinwomen"
					);

					setPopularProducts(response.data.data);
				} catch (error) {
					console.error("Error fetching products:", error);
				}
			};

  return (

    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr/>
      <div className="popular-item">
        {popularProducts.map((item, i) => {
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}

export default Popular