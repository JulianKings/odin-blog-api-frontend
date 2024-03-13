/* eslint-disable react-hooks/exhaustive-deps */
import { NavLink, Outlet } from 'react-router-dom';
import './content.css';
import gitIcon from './assets/github.svg'
import { useEffect, useRef, useState } from 'react';
import useMultiRefs from './scripts/helper/helper';

function MainContent() {
    const [userObject, setUserObject] = useState(null);
    const [content, addContent] = useMultiRefs();
    const navMenu = useRef(null);
    const userMenu = useRef(null);

    useEffect(() => {
        const contentElements = content();
        contentElements.forEach((element) => {
            if(element.getAttribute('data-click-event') !== 'true')
            {
                element.addEventListener('click', () => {
                    // cleanup
                    if(navMenu.current && navMenu.current.classList.contains('selected'))
                    {
                        navMenu.current.classList.remove('selected');
                    }
                });
                element.setAttribute('data-click-event', 'true');
            }
        })

        if(localStorage.getItem('sso_token'))
        {
            const ssoToken = localStorage.getItem('sso_token');
            fetch("http://localhost:3000/sso", {                
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + ssoToken
                },
                mode: "cors",
                dataType: 'json',
             })
            .then((response) => {
                if(response.status === 401)
                {
                    // Awaiting for login or token expired

                    if(localStorage.getItem('sso_token'))
                    {
                        localStorage.removeItem('sso_token');
                    }
                    // cleanup user if it exists
                    if(userObject)
                    {
                        setUserObject(null);
                    }
                    return null;
                } else if (response.status >= 400) {
                    throw new Error("server error");
                }
                return response.json();
            })
            .then((response) => {
                if(response)
                {
                    // We are logged in
                    setUserObject(response.user);
                }
            })
            .catch((error) => {
                throw new Error(error);
            })
        }
    }, []);

    useEffect(() => {
        if(userObject)
        {
            if(navMenu.current)
            {
                if(!navMenu.current.getAttribute('data-click-event') !== 'true')
                {
                    navMenu.current.addEventListener('click', (event) => {
                        event.stopPropagation();
                    })
                    navMenu.current.setAttribute('data-click-event', 'true');
                }                
            }

            if(userMenu.current)
            {
                if(!userMenu.current.getAttribute('data-click-event') !== 'true')
                {
                    userMenu.current.addEventListener('click', (event) => {
                        event.stopPropagation();
                        if(navMenu.current && !navMenu.current.classList.contains('selected'))
                        {
                            navMenu.current.classList.add('selected');
                        }
                    })
                    userMenu.current.setAttribute('data-click-event', 'true');
                } 
            }
        }
    }, [userObject])

    let loginBar = (<>
        <div className='navigation-item'><NavLink to='/sign-in'>Login</NavLink></div>
        <div className='navigation-item navigation-started'><NavLink to='/sign-up'>Get Started</NavLink></div>
    </>);

    let commentsLink = '/';

    if(userObject)
    {
        commentsLink = '/comments/' + userObject._id;
        loginBar = (<>
            <div className='navigation-item navigation-started' ref={userMenu}>{userObject.username}</div>
        </>)
    }

    return <>
    <nav ref={addContent} className='navigation'>
        <div className='navigation-logo'>Blog<span>API</span></div>
        <div className='navigation-bar'>
            <div className='navigation-item'><NavLink to='/'>Home</NavLink></div>
            <div className='navigation-item'><NavLink to='/articles'>All Articles</NavLink></div>
            <div className='navigation-item'><NavLink to='/about'>About</NavLink></div>
            {loginBar}

            <div className='navigation-bar-menu' ref={navMenu}>
                <div className='navigation-bar-menu-container'>
                    <div className='navigation-bar-menu-item'><NavLink to={commentsLink}>My comments</NavLink></div>
                    <div className='navigation-bar-menu-item'><NavLink to='/saved_articles'>Saved articles</NavLink></div>
                    <div className='navigation-bar-menu-item'><NavLink to='/logout'>Logout</NavLink></div>
                </div>
            </div>
        </div>
    </nav>
    <main ref={addContent} className='content-holder'>
        <Outlet context={[userObject, setUserObject]} />
    </main>
    <footer ref={addContent} className='footer'>
        <div className='footer-content'>
            <div className='footer-logo'>
                Blog<span>API</span>
            </div>
            <div className='footer-links'>
                <div className='link-column'>
                    <p className='title'>INFORMATION</p>
                    <p>Contact Us</p>
                    <p>About Us</p>
                    <p>Our Team</p>
                    <p>Blog</p>
                </div>
                <div className='link-column'>
                    <p className='title'>CUSTOMER SERVICE</p>
                    <p>Terms & Conditions</p>
                    <p>Delivery</p>
                    <p>Privacy Policy</p>
                    <p>Support Site</p>
                </div>
                <div className='link-column'>
                    <p className='title'>FOLLOW US</p>
                    <p>Facebook</p>
                    <p>Instagram</p>
                    <p>X</p>
                </div>
            </div>
            <div className='footer-end'>
                <a href='https://github.com/JulianKings/odin-blog-api-frontend'><img src={gitIcon} alt='GitHub Icon' /></a>
                <p>© 2024 Site developed as part of one of the final lessons for The Odin Project</p>
            </div>
        </div>    
    </footer>
    </>
}

export default MainContent