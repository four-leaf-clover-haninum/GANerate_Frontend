import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';

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

        console.log('Email', Email);
        console.log('Password', Password);

        let body = {
            email: Email,
            password: Password
        };

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    props.history.push('/');
                } else {
                    const { code } = response.payload;
                    if (code === 2201) {
                        alert('존재하지 않는 아이디');
                    } else if (code === 2202) {
                        alert('올바르지 않은 비밀번호');
                    } else if (code === -1) {
                        alert('비밀번호는 필수입니다.');
                    } else if (code === 0) {
                        alert('성공');
                    } else {
                        alert('로그인 실패');
                    }
                }
            });
    };

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
                <button>
                    로그인
                </button>
            </form>

        </div>
    );
}

export default LoginPage;

