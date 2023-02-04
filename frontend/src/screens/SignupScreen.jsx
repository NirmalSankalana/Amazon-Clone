import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'
import { toast } from 'react-toastify';
import Axios from "axios";
import { Store } from '../Store';
import { getError } from '../util';


function SignupScreen() {

    const { search } = useLocation();
    const navigate = useNavigate()
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { state, dispatch: ctxDispatch } = useContext(Store)
    const { userInfo } = state

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Password Doesn't match");
            return
        }
        try {
            const { data } = await Axios.post('/api/users/signup', { name, email, password });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data })
            localStorage.setItem('userInfo', JSON.stringify(data))
            navigate(redirect || '/')
            console.log(data);
        } catch (error) {
            console.log(error)
            toast.error(getError(error))
        }
    }

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])
    return (
        <Container className='signin-container'>
            <Helmet>
                <title>Sign Up</title>
            </Helmet>
            <h2>Sign In</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' required onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' required onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' required onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId='confirm-password'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' required onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Group>
                <div className='mb-3'>
                    <Button type='submit'>Sign Up</Button>
                </div>
                <div className='mb-3'>
                    New Customer?{' '}
                    <Link to={`/signin?redirect=${redirect}`}>Already Have an Account?</Link>
                </div>
            </Form>
        </Container>
    )
}

export default SignupScreen