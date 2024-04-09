// ProductCard.js
import React from 'react';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="bg-light-green p-4 rounded-md shadow-md ">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 object-cover mb-4"
      />
      <h2 className="text-lg font-semibold">{product.productName}</h2>
      <p className="text-gray-600 mb-4">${product.cost.toFixed(2)}</p>
      <button
        onClick={addToCart}
        className="bg-blue-500 text-white px-4 py-2 rounded-full"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
