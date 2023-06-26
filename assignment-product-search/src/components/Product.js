import React from "react";
import { Component } from "react";
import "./Product.css";

class Product extends Component {
  render() {
    return (
      <div>
        <div className="productCard">
          <div className="productImage">
            <img src={this.props.image} alt="leater-jacket"></img>
          </div>
          <div className="productInfo">
            <h3 className="productName">{this.props.name}</h3>
            <p className="description">{this.props.description}</p>
            <p className="price">${this.props.price}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
