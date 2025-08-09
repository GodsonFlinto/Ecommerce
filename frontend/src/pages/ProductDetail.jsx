// ProductDetail.jsx - Updated version
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function ProductDetail({cartItems, setCartItems}) {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const { id } = useParams()

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/products/` + id)
            .then(res => res.json())
            .then(res => {
                setProduct(res.products)
                setLoading(false)
            })
            .catch(err => {
                console.error('Error fetching product:', err)
                setLoading(false)
            })
    }, [id])

    function addtocart() {
        const itemExist = cartItems.find((item)=>item.product._id == product._id)
        if(!itemExist){
            const newItems = {product, quantity }
            setCartItems((state)=>[...state, newItems])
        }
        
    }

    const increaseQty = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1)
        }
    }

    const decreaseQty = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    if (loading) {
        return (
            <div className="container-fluid">
                <div className="d-flex justify-content-center">
                    <div className="loader"></div>
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="container-fluid">
                <div className="text-center">
                    <h3>Product not found</h3>
                </div>
            </div>
        )
    }

    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-around">
                <div className="col-12 col-lg-5 img-fluid" id="product_image">
                    <img 
                        src={product.images[0].image} 
                        alt={product.name} 
                        className="img-fluid"
                        style={{ maxHeight: '500px', width: 'auto' }}
                    />
                </div>

                <div className="col-12 col-lg-5 mt-5">
                    <h3>{product.name}</h3>
                    <p id="product_id">Product #{product._id}</p>

                    <hr />

                    <div className="rating-outer">
                        <div 
                            className="rating-inner" 
                            style={{ width: `${(product.ratings / 5) * 100}%` }}
                        ></div>
                    </div>
                    <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                    <hr />

                    <p id="product_price">${product.price}</p>
                    
                    <div className="stockCounter d-inline">
                        <span 
                            className="btn btn-danger minus" 
                            onClick={decreaseQty}
                            style={{ cursor: 'pointer' }}
                        >
                            -
                        </span>

                        <input 
                            type="number" 
                            className="form-control count d-inline" 
                            value={quantity} 
                            readOnly 
                        />

                        <span 
                            className="btn btn-primary plus" 
                            onClick={increaseQty}
                            style={{ cursor: 'pointer' }}
                        >
                            +
                        </span>
                    </div>
                    
                    <button 
                        type="button" 
                        onClick={addtocart}
                        id="cart_btn" 
                        className="btn btn-primary d-inline ml-4"
                        disabled={product.stock === 0}
                    >
                        Add to Cart
                    </button>

                    <hr />

                    <p>Status: 
                        <span 
                            id="stock_status" 
                            className={product.stock > 0 ? 'text-success' : 'text-danger'}
                        >
                            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </p>

                    <hr />

                    <h4 className="mt-2">Description:</h4>
                    <p>{product.description}</p>
                    
                    <hr />
                    
                    <p id="product_seller" className="mb-3">
                        Sold by: <strong>{product.seller}</strong>
                    </p>

                    <div className="rating w-50"></div>
                </div>
            </div>
        </div>
    )
}