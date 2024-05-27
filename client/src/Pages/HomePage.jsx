import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../Components/ProductCard/ProductCard'

const HomePage = () => {
    const [productList, setProductList] = useState([])
    useEffect(() => {
        getProduct()
    }, [])

    const getProduct = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/auth/products');
            console.log(response.data)
            setProductList(response.data.product)
        } catch (error) {
            console.error('Error fetching products', error);
        }
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="products mt-5 d-flex justify-content-around flex-wrap">
                        {productList.length > 0 && productList.map((item) => <ProductCard key={item.id} product={item} />)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage