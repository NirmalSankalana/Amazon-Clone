import axios from 'axios';
import React, { useContext } from 'react'
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import Rating from './Rating';

function Product(props) {
    const { product } = props;
    const { state, dispatch: ctxDispatch } = useContext(Store)
    const {
        cart: { cartItems },
    } = state;

    const addToCartHandler = async (item) => {
        const existItem = cartItems.find((x) => x._id === product._id)
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${item._id}`)
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of range');
            return;
        }
        ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } })
    }

    return (
        <Card className="product" key={product.slug}>
            <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} className='card-img-top' />
            </Link>
            <Card.Body>
                <Link to={`/product/${product.slug}`} >
                    <Card.Title>{product.name}</Card.Title>
                </Link>
                <Rating rating={product.rating} numReviews={product.numReviews} />
                <Card.Text><strong>${product.price}</strong></Card.Text>
                <Button className='add-to-cart' onClick={() => addToCartHandler(product)}>Add to Cart</Button>
            </Card.Body>
            <div className="product-info">

            </div>
        </Card>
    )
}

export default Product