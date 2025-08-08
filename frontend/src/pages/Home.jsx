import { Fragment, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";

function Home(){
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(()=>{
    fetch(`${import.meta.env.VITE_API_URL}/products?`+searchParams.toString())
    
    .then(res => res.json())
    .then(res => setProducts(res.products))
  },[searchParams])
  //console.log(`${import.meta.env.VITE_API_URL}/products`);

    return <Fragment>

    <h1 id="products_heading">Latest Products</h1>

    <section id="products" className="container mt-5">
      <div className="row">
        {products.map((product, index) => (<ProductCard key={index} product={product}/>))}
        
      </div>
    </section>

    
    </Fragment>
}
export default Home