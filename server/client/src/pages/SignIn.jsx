import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice.js';
import { auth, provider } from "../firebase.js";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    display:flex;
    align-items:center;
    flex-direction:column;
    justify-content:center;
    height:calc(100vh - 60px);
    color:${({ theme }) => theme.text};
`;


const Wrapper = styled.div`
    display:flex;
    align-items:center;
    flex-direction:column;
    background-color:${({ theme }) => theme.bgLighter};
    border:1px solid ${({ theme }) => theme.soft};
    padding:20px 50px;
    gap:10px;
`;

const Title = styled.h1`
    font-size:24px;
`;
const SubTitle = styled.h2`
    font-size:20px;
    font-weight:300;
`;
const Input = styled.input`
    border:1px solid ${({ theme }) => theme.soft};
    border-radius:3px;
    padding:10px;
    background-color:transparent;
    width:100%;
    color:${({ theme }) => theme.text};
`;
const Button = styled.button`
    border-radius:3px;
    padding:10px 20px;
    border:none;
    font-weight:500;
    cursor:pointer;
    background-color: ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.textSoft};
`;

const SignIn = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
            const res = await axios.post("https://vid-app1.herokuapp.com/api/auth/signin", { name, password }, config);
            dispatch(loginSuccess(res.data));
            navigate("/");
        } catch (err) {
            dispatch(loginFailure());
        }
    }

    const signInWithGoogle = async () => {
        dispatch(loginStart());
        signInWithPopup(auth, provider).then((res) => {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
            axios.post("https://vid-app1.herokuapp.com/api/auth/google", {
                name: res.user.displayName,
                email: res.user.email,
                img: res.user.photoURL,
            }, config).then((res) => { dispatch(loginSuccess(res.data)); navigate("/"); })
        }).catch((error) => { dispatch(loginFailure()); });
    }

    const signUp = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }

            await axios.post("https://vid-app1.herokuapp.com/api/auth/signup", { name, email, password }, config);
            const res = await axios.post("https://vid-app1.herokuapp.com/api/auth/signin", { name, password }, config);
            dispatch(loginSuccess(res.data));
            navigate("/");
        } catch (err) {
            dispatch(loginFailure());
        }
    }
    return (
        <Container>
            <Wrapper>
                <Title>Sign In</Title>
                <SubTitle>to continue on to VideoBook</SubTitle>
                <Input placeholder="username" onChange={e => setName(e.target.value)} />
                <Input placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />
                <Button onClick={handleLogin}>Sign In</Button>
                <Title>Or</Title>
                <Button onClick={signInWithGoogle}>Sign in with Google</Button>
                <Title>Or</Title>
                <Input placeholder="username" onChange={e => setName(e.target.value)} />
                <Input placeholder="email" onChange={e => setEmail(e.target.value)} />
                <Input placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />
                <Button onClick={signUp}>Sign up</Button>
            </Wrapper>
        </Container>
    )
}

export default SignIn
