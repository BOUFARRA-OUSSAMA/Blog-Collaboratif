import React, { useState, useEffect } from 'react';
import { listProducts } from '../services/ProductService';
import { Link } from 'react-router-dom';
import '../App.css';

const DashboardComponent = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6); // Adjust the number of products per page as needed
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceFilter, setPriceFilter] = useState([0, 1000]); // Default price range
    const [reductionFilter, setReductionFilter] = useState([0, 50]); // Default reduction range
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

    useEffect(() => {
        fetchProducts();
    }, [currentPage]); // Refetch products when currentPage changes

    const fetchProducts = async () => {
        try {
            const response = await listProducts();
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Filter products by search term, selected category, price, and reduction
    const filteredProducts = products.filter(product => {
        // Check if the product meets all the filter criteria
        return (
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (!selectedCategory || product.category === selectedCategory) &&
            product.basePrice >= priceFilter[0] && product.basePrice <= priceFilter[1] &&
            product.reduction >= reductionFilter[0] / 100 && product.reduction <= reductionFilter[1] / 100
        );
    });

    // Calculate indexes of the first and last product to display on the current page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="custom-margin container mt-5">
                <div className="row">
                    <div className="col-md-3">
                        {/* Sidebar with categories */}
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Categories</h5>
                                <ul className="list-group">
                                    <li
                                        key="all"
                                        className={`list-group-item ${!selectedCategory ? 'active' : ''}`}
                                        onClick={() => setSelectedCategory('')}
                                    >
                                        All
                                    </li>
                                    {categories.map(category => (
                                        <li
                                            key={category}
                                            className={`list-group-item ${selectedCategory === category ? 'active' : ''}`}
                                            onClick={() => setSelectedCategory(category)}
                                        >
                                            {category}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        {/* Price filter */}
                        <div className="card mt-4">
                            <div className="card-body">
                                <h5 className="card-title">Price Range</h5>
                                <input
                                    type="range"
                                    className="form-range"
                                    min="0"
                                    max="1000"
                                    value={priceFilter[0]}
                                    onChange={e => setPriceFilter([parseInt(e.target.value), priceFilter[1]])}
                                />
                                <input
                                    type="range"
                                    className="form-range mt-2"
                                    min="0"
                                    max="1000"
                                    value={priceFilter[1]}
                                    onChange={e => setPriceFilter([priceFilter[0], parseInt(e.target.value)])}
                                />
                                <div className="d-flex justify-content-between mt-2">
                                    <span>{priceFilter[0]}</span>
                                    <span>{priceFilter[1]}</span>
                                </div>
                            </div>
                        </div>
                        {/* Reduction filter */}
                        <div className="card mt-4">
                            <div className="card-body">
                                <h5 className="card-title">Reduction Range</h5>
                                <input
                                    type="range"
                                    className="form-range"
                                    min="0"
                                    max="50"
                                    value={reductionFilter[0]}
                                    onChange={e => setReductionFilter([parseInt(e.target.value), reductionFilter[1]])}
                                />
                                <input
                                    type="range"
                                    className="form-range mt-2"
                                    min="0"
                                    max="50"
                                    value={reductionFilter[1]}
                                    onChange={e => setReductionFilter([reductionFilter[0], parseInt(e.target.value)])}
                                />
                                <div className="d-flex justify-content-between mt-2">
                                    <span>{reductionFilter[0]}%</span>
                                    <span>{reductionFilter[1]}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        {/* Main content */}
                        <h2 className="mb-4 title text-center">Available Products</h2>
                        {/* Search field */}
                        <input
                            type="text"
                            placeholder="Search by product name"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="search-bar"
                        />
                        <div className="row">
                            {currentProducts.map(product => (
                                <div key={product.id} className="col-md-4 mb-4">
                                    <Link to={`/public/products/${product.id}`} className="text-decoration-none">
                                        <div className="card">
                                            <img src={product.image} className="card-img-top" alt={product.name} />
                                            <div className="card-body">
                                                <h5 className="card-title">{product.name}</h5>
                                                <p className="card-text">{product.description}</p>
                                                <p className="card-text">
                                                    <strong>Price: ${product.basePrice}</strong>
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        {/* Pagination */}
                        <nav>
                            <ul className="pagination justify-content-center">
                                {[...Array(Math.ceil(filteredProducts.length / productsPerPage)).keys()].map(number => (
                                    <li key={number + 1} className="page-item">
                                        <button onClick={() => paginate(number + 1)} className="page-link">
                                            {number + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            <div className="bottom-padding"></div>
        </div>
    );
};

export default DashboardComponent;
