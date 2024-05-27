import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ProductPage = () => {
    const { id } = useParams()
    const [product, setProduct] = useState([])
    useEffect(() => {
        fetchProduct()
    }, [])
    const fetchProduct = async () => {
        const response = await axios.get(`http://localhost:3000/api/auth/products/${id}`);
        setProduct(response.data.product);
    }
    return (
        <div className="card mb-3" style={{ maxWidth: 540 }}>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage