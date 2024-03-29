import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form} from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'
import { toast } from 'react-toastify';
import Axios from "axios";
import { Store } from '../Store';
import { getError } from '../util';


function SigninScreen() {

    const { search } = useLocation();
    const navigate = useNavigate()
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { state, dispatch: ctxDispatch } = useContext(Store)
    const { userInfo } = state

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await Axios.post('/api/users/signin', { email, password });
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
                <title>Sign In</title>
            </Helmet>
            <h2>Sign In</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' required onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' required onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <div className='mb-3'>
                    <Button type='submit'>Sign In</Button>
                </div>
                <div className='mb-3'>
                    New Customer?{' '}
                    <Link to={`/signup?redirect=${redirect}`}>Create your new account</Link>
                </div>
            </Form>
        </Container>
    )
}

export default SigninScreen