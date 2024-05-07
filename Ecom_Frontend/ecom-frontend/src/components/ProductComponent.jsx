import React, { useEffect, useState } from 'react';
import { createProduct, getProduct, updateProduct } from '../services/ProductService';
import { useNavigate, useParams } from 'react-router-dom';

const ProductComponent = () => {

    const token = localStorage.getItem('token');

    const navigator = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: '',
        basePrice: '',
        reduction: '',
        threshold: '',
        image: '',
        quantity: '',
        description: '',
        category: ''
    });

    const [errors, setErrors] = useState({});
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const validateForm = () => {
        const errors = {};

        if (!formData.name.trim()) {
            errors.name = 'Product name is required';
        }

        const basePrice = String(formData.basePrice).trim(); // Convert to string and then trim
        if (!basePrice) {
            errors.basePrice = 'Base price is required';
        } else if (isNaN(basePrice)) {
            errors.basePrice = 'Base price must be a number';
        }

        const reduction = String(formData.reduction).trim(); // Convert to string and then trim
        if (!reduction) {
            errors.reduction = 'Reduction is required';
        } else if (isNaN(reduction)) {
            errors.reduction = 'Reduction must be a number';
        }

        const threshold = String(formData.threshold).trim(); // Convert to string and then trim
        if (!threshold) {
            errors.threshold = 'Threshold is required';
        } else if (isNaN(threshold)) {
            errors.threshold = 'Threshold must be a number';
        }

        if (!formData.image) {
            errors.image = 'Image is required';
        }

        const quantity = String(formData.quantity).trim(); // Convert to string and then trim
        if (!quantity) {
            errors.quantity = 'Quantity is required';
        } else if (isNaN(quantity)) {
            errors.quantity = 'Quantity must be a number';
        }

        if (!formData.description.trim()) {
            errors.description = 'Description is required';
        }

        if (!formData.category.trim()) {
            errors.category = 'Category is required';
        }

        return errors;
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the first selected file
        if (file) {
            // Check if file path is available
            const imagePath = "../../img/" + file.name; // Use file path if available, otherwise fallback to file name
            // Set the image path in the form data
            setFormData(prevState => ({
                ...prevState,
                image: imagePath
            }));
        }
    };
    
    

    useEffect(() => {
        if (id) {
            getProduct(id)
                .then((response) => {
                    const productData = response.data;
                    setFormData({
                        name: productData.name,
                        basePrice: productData.basePrice,
                        reduction: productData.reduction,
                        threshold: productData.threshold,
                        image: productData.image,
                        quantity: productData.quantity,
                        description: productData.description,
                        category: productData.category
                    });
                })
                .catch(error => {
                    console.error('Error fetching product:', error);
                });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        if (id) {
            updateProduct(id, formData, token)
                .then(response => {
                    console.log('Product updated successfully:', response.data);
                    navigator('/admin/products');
                    setFormData({
                        name: '',
                        basePrice: '',
                        reduction: '',
                        threshold: '',
                        image: '',
                        quantity: '',
                        description: '',
                        category: ''
                    });
                })
                .catch(error => {
                    console.error('Error updating product:', error);
                });
        } else {
            createProduct(formData, token)
                .then(response => {
                    console.log('Product added successfully:', response.data);
                    navigator('/admin/products');
                    setFormData({
                        name: '',
                        basePrice: '',
                        reduction: '',
                        threshold: '',
                        image: '',
                        quantity: '',
                        description: '',
                        category: ''
                    });
                })
                .catch(error => {
                    console.error('Error adding product:', error);
                });
        }
    };

    function pageTitle() {
        if (id) {
            return <div className="card-header">Update Product</div>
        } else {
            return <div className="card-header">Add Product</div>
        }
    }

    return (
        <div className="container mt-5 pb-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        {pageTitle()}
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Product Name:</label>
                                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
                                    {errors.name && <span className="text-danger">{errors.name}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="basePrice">Base Price:</label>
                                    <input type="text" className="form-control" id="basePrice" name="basePrice" value={formData.basePrice} onChange={handleChange} />
                                    {errors.basePrice && <span className="text-danger">{errors.basePrice}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="reduction">Reduction:</label>
                                    <input type="text" className="form-control" id="reduction" name="reduction" value={formData.reduction} onChange={handleChange} />
                                    {errors.reduction && <span className="text-danger">{errors.reduction}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="threshold">Threshold:</label>
                                    <input type="text" className="form-control" id="threshold" name="threshold" value={formData.threshold} onChange={handleChange} />
                                    {errors.threshold && <span className="text-danger">{errors.threshold}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="image">Image:</label>
                                    <input
                                        type="file"
                                        className="form-control-file"
                                        id="image"
                                        name="image"
                                        accept="image/*" // Accept only image files
                                        onChange={handleImageChange} // Handle file selection
                                    />
                                    {errors.image && <span className="text-danger">{errors.image}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="quantity">Quantity:</label>
                                    <input type="text" className="form-control" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} />
                                    {errors.quantity && <span className="text-danger">{errors.quantity}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description:</label>
                                    <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} />
                                    {errors.description && <span className="text-danger">{errors.description}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category">Category:</label>
                                    <select
                                        className="form-control"
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                    {errors.category && <span className="text-danger">{errors.category}</span>}
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductComponent;
