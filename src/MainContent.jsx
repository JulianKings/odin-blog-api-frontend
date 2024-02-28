import { NavLink, Outlet } from 'react-router-dom';
import './content.css';
import gitIcon from './assets/github.svg'

function MainContent() {
    return <>
    <nav className='navigation'>
        <div className='navigationLogo'>Blog<span>API</span></div>
        <div className='navigationBar'>
            <div className='navigationItem'><NavLink to='/'>Home</NavLink></div>
            <div className='navigationItem'><NavLink to='/articles'>All Articles</NavLink></div>
            <div className='navigationItem'><NavLink to='/about'>About</NavLink></div>
            <div className='navigationItem'><NavLink to='/sign-in'>Login</NavLink></div>
            <div className='navigationItem navigationStarted'><NavLink to='/sign-up'>Get Started</NavLink></div>
        </div>
    </nav>
    <main className='contentHolder'>
        <Outlet />
    </main>
    <footer className='footer'>
        <div className='footerContent'>
            <div className='footerLogo'>
                Blog<span>API</span>
            </div>
            <div className='footerLinks'>
                <div className='linkColumn'>
                    <p className='title'>INFORMATION</p>
                    <p>Contact Us</p>
                    <p>About Us</p>
                    <p>Our Team</p>
                    <p>Blog</p>
                </div>
                <div className='linkColumn'>
                    <p className='title'>CUSTOMER SERVICE</p>
                    <p>Terms & Conditions</p>
                    <p>Delivery</p>
                    <p>Privacy Policy</p>
                    <p>Support Site</p>
                </div>
                <div className='linkColumn'>
                    <p className='title'>FOLLOW US</p>
                    <p>Facebook</p>
                    <p>Instagram</p>
                    <p>X</p>
                </div>
            </div>
            <div className='footerEnd'>
                <a href='https://github.com/JulianKings/odin-blog-api-frontend'><img src={gitIcon} alt='GitHub Icon' /></a>
                <p>© 2024 Site developed as part of one of the final lessons for The Odin Project</p>
            </div>
        </div>    
    </footer>
    </>
}

export default MainContent