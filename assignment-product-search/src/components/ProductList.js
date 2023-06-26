import React, { useState } from "react";
import Product from "./Product";
import "./ProductList.css";

import leatherJacket from "../assets/leather-jacket.png";
import woolCardigan from "../assets/wool-cardigan.png";
import stripedShirt from "../assets/striped-shirt.png";
import poloShirt from "../assets/polo-shirt.png";
import plainShirt from "../assets/plain-shirt.png";
import suitJacket from "../assets/suit-jacket.png";
import suitTrousers from "../assets/suit-trousers.png";
import denimJeans from "../assets/denim-jeans.png";
import pencilSkirt from "../assets/pencil-skirt.png";
import cottonSkirt from "../assets/cotton-skirt.png";

const products = [
  {
    name: "Leather Jacket",
    category: "jackets",
    description:
      "Whether it's to protect from wind or just to look super cool, this leather jacket has you covered.",
    price: 400,
    image: leatherJacket,
  },
  {
    name: "Wool cardigan",
    category: "jackets",
    description:
      "Beautifully warm and soft, this cardigan will make you feel cosy on a cold day.",
    price: 80,
    image: woolCardigan,
  },
  {
    name: "Striped business shirt",
    category: "shirts",
    description:
      "No ironing necessary to look professional every day with this striped shirt.",
    price: 50,
    image: stripedShirt,
  },
  {
    name: "Short-sleeved polo shirt",
    category: "shirts",
    description: "The best shirt you can get for that business-casual look.",
    price: 30,
    image: poloShirt,
  },
  {
    name: "Plain business shirt",
    category: "shirts",
    description:
      "No ironing necessary to look professional every day with this plain business shirt.",
    price: 50,
    image: plainShirt,
  },
  {
    name: "Suit Jacket",
    category: "jackets",
    description: "Wear it with jeans or suit pants, it works with both!",
    price: 120,
    image: suitJacket,
  },
  {
    name: "Suit Trousers",
    category: "pants",
    description:
      "Get 5 of these and you've got pants for every day of the week.",
    price: 100,
    image: suitTrousers,
  },
  {
    name: "Denim Jeans",
    category: "pants",
    description:
      "A timeless classic, these denim jeans will never go out of style.",
    price: 80,
    image: denimJeans,
  },
  {
    name: "Pencil Skirt",
    category: "skirts",
    description:
      "A classy work-ready skirt that will make you feel like a million bucks.",
    price: 100,
    image: pencilSkirt,
  },
  {
    name: "Cotton flowy skirt",
    category: "skirts",
    description:
      "For those warm summer days when you just need to feel the breeze on your legs.",
    price: 45,
    image: cottonSkirt,
  },
];

function ProductList() {
  // Category filter
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Search term
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered products
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Input value
  const [inputValue, setInputValue] = useState("");

  // Sort order
  const [sortOrder, setSortOrder] = useState("default");

  // Filter function
  const handleFilter = (category) => {
    setCategoryFilter(category);
    if (category === "All") {
      setFilteredProducts(products);
    } else if (category === "pants and skirts") {
      const filtered = products.filter(
        (product) =>
          product.category === "pants" || product.category === "skirts"
      );
      setFilteredProducts(filtered);
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  // Search function
  const handleSearch = () => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Handle key press
  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Sort function
  const handleSort = (order) => {
    setSortOrder(order);
    let sortedProducts = [...filteredProducts];
    if (order === "ascending") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (order === "descending") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sortedProducts);
  };

  return (
    <div>
      <div className="container filter">
        <div className="links">
          <button onClick={() => handleFilter("shirts")}>Shirts</button>
          <button onClick={() => handleFilter("pants and skirts")}>
            Pants and skirts
          </button>
          <button onClick={() => handleFilter("jackets")}>Jackets</button>
          <button onClick={() => handleFilter("All")}>All Products</button>
        </div>
      </div>
      <div className="container search">
        <input
          type="text"
          placeholder="Search for a product..."
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setInputValue(e.target.value);
          }}
          onKeyUp={handleKeyUp}
          value={searchTerm}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="container sort">
        <select value={sortOrder} onChange={(e) => handleSort(e.target.value)}>
          <option value="default">Sort by Price</option>
          <option value="ascending">Lowest to Hightest</option>
          <option value="descending">Highest to Lowest</option>
        </select>
      </div>

      <div className="product-list">
        {filteredProducts.map((product, index) => (
          <Product
            key={index}
            name={product.name}
            description={product.description}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
