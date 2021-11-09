import css from './productsList.css';
import Product from './product/product.js';
import { useState, useEffect } from 'react';
import website from '../../../website/website.js';
let k = css;


function ProductsList(props) {
    let [products, setproducts] = useState([]);
    useEffect(() => {
        fetch(`${website}/products`)
        .then((result)=>{
            return result.json();
        })
        .then((data)=>{
            setproducts(data);
            props.handleNumber(data.length);
        })
        }, [])
    return (
        <div>
            <div className='productsContainer container container-fluid'>
                {products.map((e, i)=>{
                    return <Product productDetails={e} key={i}/>;
                })}
            </div>
        </div>
    );
}

export default ProductsList;