import useMergedRef from '@react-hook/merged-ref';
import useMultiRefs from '../scripts/helper/helper';
import '../style/signUp.css'
import { useEffect, useRef } from 'react';

function SignUp()
{
    // general declaration
    const [inputs, addInput] = useMultiRefs();

    // bar management
    const strengthFirstBar = useRef(null);
    const strengthSecondBar = useRef(null);
    const strengthThirdBar = useRef(null);
    const strengthFourthBar = useRef(null);
    const strengthCaption = useRef(null);
    const strengthDiv = useRef(null);

    // password lock management
    const passwordLock = useRef(null);
    const passwordInput = useRef(null);

    const multiPasswordRef = useMergedRef(passwordInput, addInput);

    useEffect(() => {
        const inputElements = inputs();
        inputElements.forEach((input) => {
            // register all Handlers
            if(input.getAttribute('data-change-event') !== 'true')
            {
                input.addEventListener("change", (event) => {
                    onInputChange(event, input, input.parentElement.nextElementSibling);
                });
                input.setAttribute('data-change-event', 'true');
            }
        
            // password handler
            if(input.id === "password")
            {
                if(input.getAttribute('data-change-fast-event') !== 'true')
                {
                    input.addEventListener('input', (event) => {
                        onFastInputChange(event, input, input.parentElement.nextElementSibling);
                    });

                input.addEventListener('propertychange', (event) => {
                    onFastInputChange(event, input, input.parentElement.nextElementSibling);
                    }); // for IE8
                    input.setAttribute('data-change-fast-event', 'true');
                }


                if(input.getAttribute('data-strength-check-event') !== 'true')
                {
        
                    // small handler for the password strength check
                    input.addEventListener('focus', () => {
                        if(strengthDiv.current.style["display"] !== "flex")
                        {
                            strengthDiv.current.style["display"] = "flex";
                        }
            
                    });
            
                    input.addEventListener('focusout', () => {
                        if(strengthDiv.current.style["display"] !== "none")
                        {
                            strengthDiv.current.style["display"] = "none";
                        }
            
                    });


                    input.setAttribute('data-strength-check-event', 'true');
                }
            }        
        });

        // register lock status handler
        if(passwordLock.current.getAttribute('data-event-click') !== 'true')
        {
            passwordLock.current.addEventListener('click', () => {
                swapLock();
                passwordInput.current.setAttribute("type", (passwordInput.current.getAttribute('type') === 'text') ? "password" : "text");
                
                // refresh, since it lost focus on click
                if(strengthDiv.current.style["display"] !== "flex")
                {
                    strengthDiv.current.style["display"] = "flex";
                }
            });
            
            passwordLock.current.setAttribute('data-event-click', 'true');
        }
    }, []);

    return (
    <>
        <div className="content-holder">
            <form method="post" onSubmit={handleSubmit}>
                <div className="form-holder">
                    <div className="form-title-holder">Sign up</div>
                    <div className="form-row">
                        <div className="form-input">
                            <div className="form-input-label"><label htmlFor="userName">User Name</label></div>
                            <div className="form-input-content"><input ref={addInput} type="text" id="userName" name="user_name" minLength="3" maxLength="12" required /><span></span></div>
                            <div className="form-input-error"></div>
                        </div>
                        <div className="form-input">
                            <div className="form-input-label"><label htmlFor="email">Email</label></div>
                            <div className="form-input-content"><input ref={addInput} type="email" id="email" name="user_email" required /><span></span></div>
                            <div className="form-input-error"></div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-input">
                            <div className="form-input-label"><label htmlFor="firstName">First Name</label></div>
                            <div className="form-input-content"><input ref={addInput} type="text" id="firstName" name="user_firstName" maxLength="16" required /><span></span></div>
                            <div className="form-input-error"></div>
                        </div>
                        <div className="form-input">
                            <div className="form-input-label"><label htmlFor="lastName">Last Name</label></div>
                            <div className="form-input-content"><input ref={addInput} type="text" id="lastName" name="user_lastName" maxLength="16" required /><span></span></div>
                            <div className="form-input-error"></div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-input">
                            <div className="form-input-label"><label htmlFor="password">Password</label></div>
                            <div className="form-input-password-strength" ref={strengthDiv}>
                                <div className="form-input-password-strength-meter">
                                    <div className="form-input-password-strength-bar" ref={strengthFirstBar} id="firstBar"></div>
                                    <div className="form-input-password-strength-bar" ref={strengthSecondBar} id="secondBar"></div>
                                    <div className="form-input-password-strength-bar" ref={strengthThirdBar} id="thirdBar"></div>
                                    <div className="form-input-password-strength-bar" ref={strengthFourthBar} id="fourthBar"></div>
                                </div>
                                <div className="form-input-password-strength-caption" ref={strengthCaption}>Strength</div>
                            </div>
                            <div className="form-input-content">
                                <input ref={multiPasswordRef} type="password" id="password" name="user_password" required minLength="6" maxLength="32" />
                                <span></span>
                                <div id="formPasswordLock" ref={passwordLock}></div>
                            </div>
                            <div className="form-input-error"></div>
                        </div>
                        <div className="form-input">
                            <div className="form-input-label"><label htmlFor="confirmPassword">Confirm Password</label></div>
                            <div className="form-input-content"><input ref={addInput} type="password" id="confirmPassword" name="user_confirm-password" required /><span></span></div>
                            <div className="form-input-error"></div>
                        </div>
                    </div>
                    <div className='form-row'>
                        <button type='submit'>Sign up</button>
                    </div>
                </div>
            </form>
        </div>
    </>);

    // Handlers
    function handleSubmit(event)
    {
        console.log('Sent!');
        event.preventDefault();
    }

    function onFastInputChange(inputEvent, input, prevSibling)
    {
        let inputValue = inputEvent.target.value;
        // apply/remove required flag
        if(input.getAttribute("required") !== null && inputValue !== undefined 
        && inputValue !== "")
        {
            input.setAttribute("wasRequired", true);
            input.removeAttribute("required");
        } else if(input.getAttribute("wasRequired") !== null && inputValue === undefined ||
        input.getAttribute("wasRequired") !== null && inputValue === "")
        {
            input.setAttribute("required", "");
            input.removeAttribute("wasRequired");

            // cleanup errors since its empty
            if(input.classList.contains("error"))
            {
                input.classList.remove("error");
                prevSibling.textContent = "";
            }

            setNeutralPassword();
            cleanUpLock();
        }    

        if(inputValue !== "" && inputValue !== undefined)
        {
            enableLock();

            let validRegexVeryStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%"'()*?&]{8,}$/;
            let validRegexStrong = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%"'()*#?&]{8,}$/;
            let validRegexSecondaryStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            let validRegexAverage = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            if(validRegexVeryStrong.test(inputValue))
            {
                setVeryStrongPassword();
            } else if(validRegexStrong.test(inputValue) || validRegexSecondaryStrong.test(inputValue)) {
                setStrongPassword();
            } else if(validRegexAverage.test(inputValue)) {
                setAveragePassword();
            } else {
                setWeakPassword();
            }
        }
                
    }

    function isValidName(name)
    {
        return true;
    }

    function isValidMail(mail)
    {
        return true;
    }

    function onInputChange(inputEvent, input, prevSibling)
    {
        let inputValue = inputEvent.target.value;

        // apply/remove required flag
        if(input.getAttribute("required") !== null && inputValue !== undefined 
        && inputValue !== "")
        {
            input.setAttribute("wasRequired", true);
            input.removeAttribute("required");
        } else if(input.getAttribute("wasRequired") !== null && inputValue === undefined ||
        input.getAttribute("wasRequired") !== null && inputValue === "")
        {
            input.setAttribute("required", "");
            input.removeAttribute("wasRequired");
        }

        //clean up
        if(input.classList.contains("error"))
        {
            input.classList.remove("error");
            // cleanup error notif
            prevSibling.textContent = "";
        }

        if(input.classList.contains("valid"))
        {
            input.classList.remove("valid");
        }

        if(inputValue !== undefined && inputValue !== "")
        {
            // Handle each input
            if(input.id === "userName")
            {
                // Handle names and inform of any errors
                if(!isValidName(inputValue)) {
                    input.classList.add("error");
                    prevSibling.textContent = "This name is already taken";
                } else if(inputValue.length < 3) {
                    input.classList.add("error");
                    prevSibling.textContent = "Name minimum length is 3 characters";
                } else {
                    input.classList.add("valid");
                }
            } else if(input.id === "lastName")
            {
                if(inputValue.length < 3) {
                    input.classList.add("error");
                    prevSibling.textContent = "Last name minimum length is 3 characters";
                } else {
                    input.classList.add("valid");
                }
            } else if(input.id === "email")
            {
                let validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                if(!isValidMail(inputValue)) {
                    input.classList.add("error");
                    prevSibling.textContent = "This email is already taken";
                } else if(!validRegex.test(inputValue)) {
                    input.classList.add("error");
                    prevSibling.textContent = "Invalid email address";
                } else {
                    input.classList.add("valid");
                }
            } else if(input.id === "firstName")
            {
                if(inputValue.length < 3) {
                    input.classList.add("error");
                    prevSibling.textContent = "First name minimum length is 3 characters";
                } else {
                    input.classList.add("valid");
                }
            } else if(input.id === "password")
            {
                // reset lock status
                cleanUpLock();
                enableLock();

                if(inputValue.length < 6) {
                    input.classList.add("error");
                    prevSibling.textContent = "Password minimum length is 6 characters";
                    moveLock();
                } else {
                    input.classList.add("valid");
                    moveLock();
                }
            } else if(input.id === "confirmPassword")
            {
                if(inputValue === passwordInput.current.value)
                {
                    input.classList.add("valid");
                } else {
                    input.classList.add("error");
                    prevSibling.textContent = "Password doesn't match";
                    
                }
            }
        }
    }

    // Strength check helpers
    function setWeakPassword()
    {
        strengthFirstBar.current.style["background-color"] = "#500000";
        strengthSecondBar.current.style["background-color"] = "#868686";
        strengthThirdBar.current.style["background-color"] = "#868686";
        strengthFourthBar.current.style["background-color"] = "#868686";
        strengthCaption.current.textContent = "Weak";
        strengthCaption.current.style["color"] = "#500000";
    }

    function setAveragePassword()
    {
        strengthFirstBar.current.style["background-color"] = "orange";
        strengthSecondBar.current.style["background-color"] = "orange";
        strengthThirdBar.current.style["background-color"] = "#868686";
        strengthFourthBar.current.style["background-color"] = "#868686";
        strengthCaption.current.textContent = "Average";
        strengthCaption.current.style["color"] = "orange";
    }

    function setStrongPassword()
    {
        strengthFirstBar.current.style["background-color"] = "#23ad5c";
        strengthSecondBar.current.style["background-color"] = "#23ad5c";
        strengthThirdBar.current.style["background-color"] = "#23ad5c";
        strengthFourthBar.current.style["background-color"] = "#868686";
        strengthCaption.current.textContent = "Strong";
        strengthCaption.current.style["color"] = "#23ad5c";
    }

    function setVeryStrongPassword()
    {
        strengthFirstBar.current.style["background-color"] = "#007435";
        strengthSecondBar.current.style["background-color"] = "#007435";
        strengthThirdBar.current.style["background-color"] = "#007435";
        strengthFourthBar.current.style["background-color"] = "#007435";
        strengthCaption.current.textContent = "Very Strong";
        strengthCaption.current.style["color"] = "#007435";
    }

    function setNeutralPassword()
    {
        strengthFirstBar.current.style["background-color"] = "#868686";
        strengthSecondBar.current.style["background-color"] = "#868686";
        strengthThirdBar.current.style["background-color"] = "#868686";
        strengthFourthBar.current.style["background-color"] = "#868686";
        strengthCaption.current.textContent = "Strength";
        strengthCaption.current.style["color"] = "#868686";
    }

    // password lock helpers
    function cleanUpLock()
    {
        if(passwordLock.current.classList.contains("form-input-password-lock"))
        {
            passwordLock.current.classList.remove("form-input-password-lock");
        }

        if(passwordLock.current.classList.contains("form-input-password-lock-disabled"))
        {
            passwordLock.current.classList.remove("form-input-password-lock-disabled");
        }

        if(passwordLock.current.classList.contains("form-input-password-lock-2"))
        {
            passwordLock.current.classList.remove("form-input-password-lock-2");
        }

        if(passwordLock.current.classList.contains("form-input-password-lock-disabled-2"))
        {
            passwordLock.current.classList.remove("form-input-password-lock-disabled-2");
        }
    }

    function moveLock()
    {
        if(passwordLock.current.classList.contains("form-input-password-lock"))
        {
            passwordLock.current.classList.remove("form-input-password-lock");
            passwordLock.current.classList.add("form-input-password-lock-2");
        } else if(passwordLock.current.classList.contains("form-input-password-lock-disabled"))
        {
            passwordLock.current.classList.remove("form-input-password-lock-disabled");
            passwordLock.current.classList.add("form-input-password-lock-disabled-2");
        } else if(passwordLock.current.classList.contains("form-input-password-lock-2"))
        {
            passwordLock.current.classList.remove("form-input-password-lock-2");
            passwordLock.current.classList.add("form-input-password-lock");
        } else if(passwordLock.current.classList.contains("form-input-password-lock-disabled-2"))
        {
            passwordLock.current.classList.remove("form-input-password-lock-disabled-2");
            passwordLock.current.classList.add("form-input-password-lock-disabled");
        }
    }

    function swapLock()
    {
        if(passwordLock.current.classList.contains("form-input-password-lock"))
        {
            passwordLock.current.classList.remove("form-input-password-lock");
            passwordLock.current.classList.add("form-input-password-lock-disabled");
        } else if(passwordLock.current.classList.contains("form-input-password-lock-disabled"))
        {
            passwordLock.current.classList.remove("form-input-password-lock-disabled");
            passwordLock.current.classList.add("form-input-password-lock");
        } else if(passwordLock.current.classList.contains("form-input-password-lock-2"))
        {
            passwordLock.current.classList.remove("form-input-password-lock-2");
            passwordLock.current.classList.add("form-input-password-lock-disabled-2");
        } else if(passwordLock.current.classList.contains("form-input-password-lock-disabled-2"))
        {
            passwordLock.current.classList.remove("form-input-password-lock-disabled-2");
            passwordLock.current.classList.add("form-input-password-lock-2");
        }
    }

    function enableLock()
    {
        if((passwordInput.current.getAttribute('type') === 'password'))
        {
            if(!passwordLock.current.classList.contains("form-input-password-lock"))
            {
                passwordLock.current.classList.add("form-input-password-lock");
            }
        } else {
            if(!passwordLock.current.classList.contains("form-input-password-lock-disabled"))
            {
                passwordLock.current.classList.add("form-input-password-lock-disabled");
            }
        }
    }
}

export default SignUp