import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ProductPage = ({ setCartCount }) => {
    const { id } = useParams()
    const [product, setProduct] = useState([])
    const [addCart, setAddCart] = useState(false)
    useEffect(() => {
        fetchProduct()
    }, [])
    const fetchProduct = async () => {
        const response = await axios.get(`http://localhost:3000/api/auth/products/${id}`);
        setProduct(response.data.product);
    }

    const addToCart = () => {
        setAddCart(true)
        setCartCount(prev => prev + 1)
    }
    return (
        <div className="container">
            <div className="card mt-5 mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="..." className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">{product.description}</p>
                            <p className="card-text"><small className="text-body-secondary">${product.price}</small></p>
                            <p className="card-text text-muted"><small className="text-body-secondary">{product.category}</small></p>
                            {!addCart ? (<button type="button" class="btn btn-primary" onClick={addToCart}>Add To Cart</button>) : (<button type="button" class="btn btn-success">Added To Cart Successfully</button>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage