import '../style/signUp.css'

function SignUp()
{
    return (
    <>
        <div className="content-holder">
            <form method="post" action="/sign-up">
                <div className="form-holder">
                    <div className="form-title-holder">Let&apos;s do this!</div>
                    <div className="form-row">
                        <div className="form-input">
                            <div className="form-input-label"><label htmlFor="userName">User Name</label></div>
                            <div className="form-input-content"><input type="text" id="userName" name="user_name" minLength="3" maxLength="12" required /><span></span></div>
                            <div className="form-input-error"></div>
                        </div>
                        <div className="form-input">
                            <div className="form-input-label"><label htmlFor="lastName">Last Name</label></div>
                            <div className="form-input-content"><input type="text" id="lastName" name="user_lastName" required /><span></span></div>
                            <div className="form-input-error"></div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-input">
                            <div className="form-input-label"><label htmlFor="email">Email</label></div>
                            <div className="form-input-content"><input type="text" id="email" name="user_email" required /><span></span></div>
                            <div className="form-input-error"></div>
                        </div>
                        <div className="form-input">
                            <div className="form-input-label"><label htmlFor="phoneNumber">Phone Number</label></div>
                            <div className="form-input-content"><input type="tel" id="phoneNumber" name="user_phone" maxLength="14" /><span></span></div>
                            <div className="form-input-error"></div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-input">
                            <div className="form-input-label"><label htmlFor="password">Password</label></div>
                            <div className="form-input-password-strength">
                                <div className="form-input-password-strength-meter">
                                    <div className="form-input-password-strength-bar" id="firstBar"></div>
                                    <div className="form-input-password-strength-bar" id="secondBar"></div>
                                    <div className="form-input-password-strength-bar" id="thirdBar"></div>
                                    <div className="form-input-password-strength-bar" id="fourthBar"></div>
                                </div>
                                <div className="form-input-password-strength-caption">Strength</div>
                            </div>
                            <div className="form-input-content">
                                <input type="password" id="password" name="user_password" required minLength="6" maxLength="32" />
                                <span></span>
                                <div id="formPasswordLock"></div>
                            </div>
                            <div className="form-input-error"></div>
                        </div>
                        <div className="form-input">
                            <div className="form-input-label"><label htmlFor="confirmPassword">Confirm Password</label></div>
                            <div className="form-input-content"><input type="password" id="confirmPassword" name="user_confirm-password" required /><span></span></div>
                            <div className="form-input-error"></div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </>);
}

export default SignUp