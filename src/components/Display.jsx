import React, { useEffect, useState } from "react";
import axios from "axios";


const Display = ({ companyName, categoryName, top, minPrice, maxPrice }) => {
  const [products, setProducts] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://20.244.56.144/test/companies/${companyName}/categories/${categoryName}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [companyName, categoryName, top, minPrice, maxPrice]);

  const toggleProducts = () => {
    setShowAllProducts(!showAllProducts);
  };

  const handleSort = (e) => {
    const sortBy = e.target.value;
    const sortedProducts = [...products].sort((a, b) =>
      sortBy === "price"
        ? a.price - b.price
        : sortBy === "rating"
        ? b.rating - a.rating
        : a.discount - b.discount
    );
    setProducts(sortedProducts);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Top Products</h1>
      <div className="flex justify-between items-center mb-4">
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:ring-lime-500 mr-2"
            onClick={toggleProducts}
          >
            {showAllProducts ? "Hide Products" : "Show All Products"}
          </button>
          <select
            className="bg-white border border-gray-300 rounded-lg py-2 px-4"
            onChange={handleSort}
          >
            <option value="price">Sort by Price</option>
            <option value="rating">Sort by Rating</option>
            <option value="discount">Sort by Discount</option>
          </select>
        </div>
        <div>
          <span className="text-gray-500 mr-2">Filter:</span>
          <button className="text-blue-500 hover:underline">Price</button>
          <button className="text-blue-500 hover:underline ml-2">Rating</button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <div
            key={index}
            className={`bg-white shadow-md rounded-lg p-4 ${
              !showAllProducts && index >= 3 ? "hidden" : ""
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-2">Company: {product.company}</p>
            <p className="text-gray-700 mb-2">Category: {product.category}</p>
            <p className="text-gray-700 mb-2">Price: ${product.price}</p>
            <p className="text-gray-700 mb-2">Rating: {product.rating}</p>
            <p className="text-gray-700 mb-2">Discount: {product.discount}%</p>
            <p
              className={`text-sm mb-2 ${
                product.available ? "text-green-500" : "text-red-500"
              }`}
            >
              {product.available ? "Available" : "Out of Stock"}
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display;
