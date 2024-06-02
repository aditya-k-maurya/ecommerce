import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import Item from '../Items/Item'
import axios from 'axios'

const NewCollections = () => {

  const [new_collection, setNew_collection] = useState([])
  
  useEffect(() => {
    fetchNewCollection()
  }, [])
  
  	const fetchNewCollection = async () => {
			try {
				const response = await axios.get(
					"http://localhost:4000/api/v1/product/newcollection"
        );

        setNew_collection(response.data.data)
        
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => {
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}

export default NewCollections