import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link'
import { AUTH_TOKEN } from '../constants'
import { isLoggedInVar } from '../cache'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

function LoginButton(props) {
    console.log("LoginButton: " + isLoggedInVar())

    return (
        <Button className="mr-sm-2" variant="outline-primary" onClick={props.onClick}>Log in</Button>
    )
}

function LogoutButton(props) {
    console.log("LogoutButton: " + isLoggedInVar())
    return (
        <Button className="mr-sm-2" variant="outline-danger" onClick={props.onClick}>Log out</Button>
    )
}

export default function TopNavbar() {

    const router = useRouter()

    const handleLogin = () => {
        router.push('/login')
    }

    const handleLogout = () => {
        Cookies.remove(AUTH_TOKEN)
        isLoggedInVar(!!Cookies.get(AUTH_TOKEN))
        router.push('/')
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/" >Reddit App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-between" id="basic-navbar-nav">
                <Nav>
                    <Nav.Link href="/">Feed</Nav.Link>
                    <Nav.Link href="/">Bookmarks</Nav.Link>
                </Nav>
                <div>
                    {isLoggedInVar()
                        ? <LogoutButton onClick={handleLogout} />
                        : <LoginButton onClick={handleLogin} />
                    }
                    <Link href="/signup" passHref>
                        <Button variant="primary">Sign Up</Button>
                    </Link>
                </div>
            </Navbar.Collapse>
        </Navbar>
    )
}