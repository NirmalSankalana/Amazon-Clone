import React, { useContext, useEffect, useState } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { Helmet } from 'react-helmet-async'
import { Button, Form } from 'react-bootstrap'
import { Store } from '../Store'
import { useNavigate } from 'react-router-dom'

export const PaymentMethodsScreen = () => {
    const navigate = useNavigate()
    const { state, dispatch: ctxDispatch } = useContext(Store)
    const {
        cart: { shippingAddress, paymentMethod }
    } = state;
    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])
    const [paymentMethodName, setPaymentMethod] = useState(
        paymentMethod || "PayPal"
    )
    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName })
        localStorage.setItem('paymentMethod', paymentMethodName);
        navigate('/placeorder');
    }
    return (
        <>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <div className='container'>
                <Helmet>
                    <title>Payment Methods</title>
                </Helmet>
                <h2 className='my-3'>
                    Payment Methods
                </h2>
                <Form onSubmit={submitHandler}>
                    <div className='mb-3'>
                        <Form.Check
                            type='radio'
                            id='paypal'
                            label='PayPal'
                            value="PayPal"
                            checked={paymentMethodName === 'PayPal'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />

                        <Form.Check
                            type='radio'
                            id='stripe'
                            label='Stripe'
                            value="Stripe"
                            checked={paymentMethodName === 'Stripe'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <Button type="submit">Choose</Button>
                    </div>
                </Form>
            </div>

        </>
    )
}
