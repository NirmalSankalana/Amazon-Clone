import React, { useEffect, useReducer} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import logger from 'use-reducer-logger';
import { Col, Row } from 'react-bootstrap';

import Product from '../components/Product';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true }
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false }
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

function HomeScreen() {
    const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
        products: [],
        loading: true,
        error: '',
    })

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' })
            try {
                const result = await axios.get('/api/products')
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });

            }
        }
        fetchData();
    }, [])

    return (
        <div className='product-container'>
            <h2 className='heading'>Featured products</h2>
            <div className="products">
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>{error}</div>
                ) : (
                    <Row>
                    {products.map((product) => (
                        <Col xsm={12} sm={6} md={4} lg={3} className='mb-3'>
                            <Product product={product} />
                        </Col>
                    ))}
                    </Row>
                    )}
            </div>
        </div>
    )
}

export default HomeScreen