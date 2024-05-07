import React, { useState, useEffect } from 'react';
import { listProducts } from '../services/ProductService';
import { Link } from 'react-router-dom';

const DashboardComponent = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await listProducts();
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Available Products</h2>
            <div className="row">
                {products.map(product => (
                    <div key={product.id} className="col-md-4 mb-4">
                        <Link to={`/public/products/${product.id}`} className="text-decoration-none">
                            <div className="card">
                                <img src={product.image} className="card-img-top" alt={product.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text">Price: ${product.basePrice}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardComponent;
