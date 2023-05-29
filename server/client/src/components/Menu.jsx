import React from 'react';
import styled from "styled-components";
import VidShare from "../img/share.png";
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import ExploreSharpIcon from '@mui/icons-material/ExploreSharp';
import BookmarkSharpIcon from '@mui/icons-material/BookmarkSharp';
import RestoreSharpIcon from '@mui/icons-material/RestoreSharp';
import LightModeSharpIcon from '@mui/icons-material/LightModeSharp';
import SubscriptionsSharpIcon from '@mui/icons-material/SubscriptionsSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import VideoLibrarySharpIcon from '@mui/icons-material/VideoLibrarySharp';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { logout } from '../redux/userSlice';

const Container = styled.div`
    flex:1;
    background-color:${({ theme }) => theme.bgLighter};
    height:100vh;
    color:${({ theme }) => theme.text};
    font-size:14px;
    position:sticky;
    top:0;
`;

const Wrapper = styled.div`
    padding:18px 26px;

`;

const Logo = styled.div`
    display:flex;
    align-items: center;
    gap:5px;
    font-weight:bold;
    margin-bottom:25px;
`;

const Img = styled.img`
    height:25px;
`;

const Item = styled.div`
    display:flex;
    align-items:center;
    gap:20px;
    cursor:pointer;
    padding:7px 0px;
    color:${({ theme }) => theme.text};
    &:hover{
        background-color:${({ theme }) => theme.soft};
    }
`

const Hr = styled.hr`
    margin:5px;
    border: 0.5px solid ${({ theme }) => theme.soft};
`

const Button = styled.button`
    border:none;
    padding:0;
    font-weight:500;
    cursor:pointer;
    background-color: transparent;
    color: ${({ theme }) => theme.text};
`;

const Menu = ({ darkMode, setDarkMode }) => {
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();

    const handleTheme = () => {
        if (darkMode === "true") {
            setDarkMode("false");
            localStorage.setItem("darkMode", "false");
        } else {
            setDarkMode("true");
            localStorage.setItem("darkMode", "true");
        }
    }

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
            const res = await axios.post("https://vid-app1.herokuapp.com/api/auth/signout", {}, config);
            dispatch(logout());
            console.log(res);
        } catch (err) {

        }
    }
    return (
        <Container>
            <Wrapper>
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    <Logo>
                        <Img src={VidShare} />
                        VideoBook
                    </Logo>
                </Link>
                <Hr />
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <HomeSharpIcon />
                        Home
                    </Item>
                </Link>
                <Hr />
                <Link to="trending" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <ExploreSharpIcon />
                        Explore
                    </Item>
                </Link >
                <Hr />
                <Link to="saved" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <BookmarkSharpIcon />
                        Saved
                    </Item>
                </Link>
                <Hr />
                <Link to="history" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <RestoreSharpIcon />
                        History
                    </Item>
                </Link>
                <Hr />
                <Link to="following" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <SubscriptionsSharpIcon />
                        Following
                    </Item>
                </Link>
                <Hr />
                <Link to="myvids" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <VideoLibrarySharpIcon />
                        My videos
                    </Item>
                </Link>
                <Hr />
                {!currentUser &&
                    <>
                        <Link to="/signin" style={{ textDecoration: "none" }}>
                            <Item>
                                <AccountCircleSharpIcon />
                                Sign In
                            </Item>
                        </Link>
                        <Hr />
                    </>
                }
                {currentUser &&
                    <>
                        <Item>
                            <AccountCircleSharpIcon />
                            <Button onClick={handleLogout}>Sign Out</Button>
                        </Item>
                        <Hr />
                    </>
                }
                <Item onClick={handleTheme}>
                    <LightModeSharpIcon />
                    {darkMode === "true" ? "Light Mode" : "Dark Mode"}
                </Item>
            </Wrapper>
        </Container>
    )
}

export default Menu;