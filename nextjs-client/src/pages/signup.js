import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Layout from '../components/layout'
import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'
import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import Cookies from 'js-cookie'
import { AUTH_TOKEN } from '../constants'
import { useRouter } from 'next/router'
import { isLoggedInVar } from '../cache'

const SIGNUP_QUERY = gql`
    mutation signup($name: String!, $email: String!, $password: String!) {
        signup(name: $name, email: $email, password: $password) {
            token
        }
    }
`

export default function Signup() {

    const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [handleSignup, { loading: mutationLoading, error: mutationError}] = useMutation(SIGNUP_QUERY, {
        onCompleted({ token }) {
            Cookies.set(AUTH_TOKEN, token)
            isLoggedInVar(true)
            router.push('/')
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        handleSignup({ variables: { name: name, email: email, password: password }})
    }

    return (
        <Layout>
            <Head>
                <title>Sign Up</title>
            </Head>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Create an account</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="text" placeholder="Enter name"
                            onChange={e => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" placeholder="Enter email"
                            onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" placeholder="Password"
                            onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                </Form>
            </section>
        </Layout>
    )
}