// src/components/ProductTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductUploadForm from './ProductUploadForm';

const ProductTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mt-5">
      <ProductUploadForm />
      <h1 className="mb-4">Product List</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>
            <th scope="col">Stock</th>
            <th scope="col">Images</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <th scope="row">{product._id}</th>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.category.name}</td>
              <td>{product.stock}</td>
              <td>
                {product.imagePaths.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/uploads/${image}`}
                    alt={`Product ${index}`}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    className="me-2"
                  />
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
