import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import "./LoginPage.css"


function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    };

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        ////통신하는 부분

        let body = {
            email: Email,
            password: Password
        };


        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    props.history.push('/');
                } else {
                        alert('로그인 실패');
                }
            })
    };

        /////통신하는 부분


    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>

            <form style={{ display: 'felx', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                {/* 수정된 부분 */}
                <button type="submit">
                    로그인
                </button>
                {/* ------------ */}
                <p className="message">Not registered? <a href="/auth/signup">Create an account</a></p>
            </form>

        </div>
    );
}

export default LoginPage;

