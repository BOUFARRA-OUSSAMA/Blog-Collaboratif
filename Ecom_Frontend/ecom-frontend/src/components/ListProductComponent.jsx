import React, { useState, useEffect } from 'react';
import { deleteProduct, listProducts } from '../services/ProductService';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const ListProductComponent = () => {
    const token = localStorage.getItem('token');
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust this number as needed
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
        const confirmed = window.confirm('Are you sure you want to delete the product?');
        if (!confirmed) {
            return; // Do not proceed with form submission if not confirmed
        }
        deleteProduct(id, token).then(() => {
            getAllProducts();
        }).catch(error => {
            console.error(error);
        });
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.filter(product => {
        return (
            !product.category.includes("ARCHIVED") &&
            (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.id.toString().toLowerCase().includes(searchTerm.toLowerCase()))
        ) && (!categoryFilter || product.category === categoryFilter);
    }).slice(indexOfFirstItem, indexOfLastItem);

    const handleCategoryFilterChange = (category) => {
        setCategoryFilter(category === categoryFilter ? '' : category);
    };

    const categories = [
        'ELECTRONICS',
        'CLOTHING',
        'BOOKS',
        'HOME_APPLIANCES',
        'SPORTS_EQUIPMENT',
        'BEAUTY_PRODUCTS',
        'FOOD_AND_DRINKS',
        'TOYS',
        'FURNITURE',
        'JEWELRY'
    ];

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="custom-margin">
            <h2>List of Products</h2>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by ID or Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="category-slider">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`btn ${categoryFilter === category ? 'btn-primary' : 'btn-light'}`}
                        onClick={() => handleCategoryFilterChange(category)}
                    >
                        {category}
                    </button>
                ))}
                <button className={`btn ${categoryFilter === '' ? 'btn-primary' : 'btn-light'}`} onClick={() => handleCategoryFilterChange('')}>All</button>
            </div>
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
                    {currentItems.map(product => (
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
            <div className="pagination">
                {Array.from({ length: Math.ceil(products.length / itemsPerPage) }).map((_, index) => (
                    <button key={index} className="btn btn-light" onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
            <div className="bottom-padding"></div>
        </div>
    );
};

export default ListProductComponent;
