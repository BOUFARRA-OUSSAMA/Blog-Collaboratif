import React, { useState, useEffect } from 'react';
import { deleteProduct, listProducts } from '../services/ProductService';
import { useNavigate } from 'react-router-dom';

const ListProductComponent = () => {

    const token = localStorage.getItem('token');

    const [products, setProducts] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllProducts();
    }, []);

    function getAllProducts() {
        listProducts().then((response) => {
            setProducts(response.data);
        }).catch(error => {
            console.error('Error fetching products:', error);
        });
    }

    const addNewProduct = () => {
        navigator('/admin/create-product');
    };

    const updateProduct = (productId) => {
        navigator(`/admin/update-product/${productId}`);
    };

    function removeProduct(id) {
        deleteProduct(id, token).then(() => {
            getAllProducts();
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <div>
            <h2>List of Products</h2>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Base Price</th>
                        <th>Reduction</th>
                        <th>Threshold</th>
                        <th>Image</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.basePrice}</td>
                            <td>{product.reduction}</td>
                            <td>{product.threshold}</td>
                            <td>{product.image}</td>
                            <td>{product.quantity}</td>
                            <td>{product.description}</td>
                            <td>{product.category}</td>
                            <td>
                                <button className="btn btn-primary mr-2" onClick={() => updateProduct(product.id)}>Update</button>
                                <button className="btn btn-danger" onClick={() => removeProduct(product.id)} style={{ marginLeft: '10px' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="text-center">
                <button className="btn btn-primary" onClick={addNewProduct}>Add Product</button>
            </div>
        </div>
    );
};

export default ListProductComponent;
