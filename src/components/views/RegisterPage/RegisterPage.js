import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';


function RegisterPage(props){

    const dispatch = useDispatch();

    const [Email, setEmail] = useState('');
    const [Name, serName] = useState('');
    const [Password, setPassword] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');


    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    };

    const onNameHandler = (event) => {
        serName(event.currentTarget.value);
    };

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    };

    const onPhoneNumberHandler = (event) => {
        setPhoneNumber(event.currentTarget.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        ///

          let body = {
            email: Email,
            name : Name,
            password: Password,
            phoneNumber: PhoneNumber
          };
          dispatch(registerUser(body)).then((res) => {
            alert("가입이 정상적으로 완료되었습니다");
            props.history.push("/auth/signin");
          });
        }
    /////


    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>

            <form style={{ display: 'felx', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />

                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <label>Phone Number</label>
                <input type="tel" value={PhoneNumber} onChange={onPhoneNumberHandler} />



                <br />
                <button>
                    회원가입
                </button>
            </form>

        </div>
    )
}
export default RegisterPage