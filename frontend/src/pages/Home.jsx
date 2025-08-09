// Home.jsx - Updated version with proper spacing
import { Fragment, useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useSearchParams } from 'react-router-dom'

export default function Home() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/products?${searchParams.toString()}`)
            .then(res => res.json())
            .then(res => {
                setProducts(res.products)
                setLoading(false)
            },[searchParams])
            .catch(err => {
                console.error('Error fetching products:', err)
                setLoading(false)
            })
    }, [])

    return (
        <Fragment>
            <div className="container-fluid">
                <div style={{ paddingTop: '20px', marginTop: '20px' }}>
                    <h1 id="products_heading">Latest Products</h1>
                </div>
                
                {loading ? (
                    <div className="d-flex justify-content-center" style={{ marginTop: '3rem' }}>
                        <div className="loader"></div>
                    </div>
                ) : (
                    <section id="products" className="mt-3">
                        <div className="row">
                            {products && products.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </Fragment>
    )
}