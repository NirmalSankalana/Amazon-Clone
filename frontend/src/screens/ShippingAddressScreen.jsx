import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { Store } from '../Store'
import CheckoutSteps from '../components/CheckoutSteps'

export const ShippingAddressScreen = () => {
    const navigate = useNavigate()
    const { state, dispatch: ctxDispatch } = useContext(Store)
    const {
        userInfo,
        cart: { shippingAddress },
    } = state;
    const [fullName, setFullName] = useState(shippingAddress.fullName || '')
    const [address, setAddress] = useState(shippingAddress.address || '')
    const [city, setCity] = useState(shippingAddress.city || '')
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
    const [country, setCountry] = useState(shippingAddress.country || '')
    useEffect(() => {
        if (!userInfo) {
            navigate('/signin?redirect=/shipping')
        }
    }, [userInfo, navigate])
    const submitHandler = (e) => {
        e.preventDefault()
        ctxDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                fullName,
                address,
                city,
                postalCode,
                country
            }
        });
        localStorage.setItem(
            'shippingAddress', JSON.stringify({
                fullName,
                address,
                city,
                postalCode,
                country
            })
        );
        navigate('/payment')
    }
    return (
        <div>
            <Helmet>
                <title>Shipping Screen</title>
            </Helmet>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <div className='container'>
                <h2 className='my-3'>Shipping Address</h2>
                <Form onSubmit={submitHandler}>
                    <Form.Group className='mb-3' controlId='fullName'>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='city'>
                        <Form.Label>City</Form.Label>
                        <Form.Control value={city} onChange={(e) => setCity(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='postal code'>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='country'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control value={country} onChange={(e) => setCountry(e.target.value)} required />
                    </Form.Group>
                    <div className='mb-3'>
                        <Button variant="primary" type="submit" onClick={submitHandler}>
                            Continue
                        </Button>
                    </div>
                </Form>
            </div>

        </div>
    )
}
