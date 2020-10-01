import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Layout from '../components/layout'
import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { AUTH_TOKEN } from '../constants'
import { gql, useMutation } from '@apollo/client'
import { isLoggedInVar } from '../cache'
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'
import apolloClient from '../lib/apolloClient'

const LOGIN_MUTATION = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter()

    const [handleLogin, { loading: mutationLoading, error: mutationError }] = useMutation(LOGIN_MUTATION,
        { 
            onCompleted(data) {
                Cookies.set(AUTH_TOKEN, data.login.token)
                isLoggedInVar(!!Cookies.get(AUTH_TOKEN))
                router.push('/')
            }
        })

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin({ variables: { email: email, password: password } });
    }

    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Log In</h2>
                <Form onSubmit={handleSubmit}>
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
                        <Form.Text className="text-muted">
                            <span className="mr-2">Need an account ?</span>
                            <Link href="/signup">
                                <a>Sign Up</a>
                            </Link>
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Log In
                    </Button>
                </Form>
                {mutationLoading && <p>Loading...</p>}
                {mutationError && <p>Error :( Please try again</p>}
            </section>
        </Layout>
    )
}