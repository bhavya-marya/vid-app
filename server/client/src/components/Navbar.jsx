import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import VideoCallSharpIcon from '@mui/icons-material/VideoCallSharp';
import Upload from './Upload';
import ProfileImg from './ProfileImg';

const Container = styled.div`
    position:sticky;
    top:0;
    background-color:${({ theme }) => theme.bgLighter};
    color:${({ theme }) => theme.text};
    height:56px;
`
const Wrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content:flex-end;
    height:100%;
    padding:0px 20px;
    position:relative;

`
const Search = styled.div`
    width:40%;
    position:absolute;
    left:0px;
    right:0px;
    margin:auto;
    display:flex;
    justify-content:space-between;
    padding:5px;
    border: 1px solid #ccc;
    border-radius:3px;
    color:${({ theme }) => theme.text};
`
const Input = styled.input`
    border:none;
    background-color:transparent;
    color:${({ theme }) => theme.text};
    width:100%;
    outline:none;
`

const Item = styled.div`
    display:flex;
    align-items:center;
    gap:10px;
    cursor:pointer;
    padding:5px;
    border: 1px solid #ccc;
    border-radius:3px;
    color:${({ theme }) => theme.text};
`

const User = styled.div`
    display:flex;
    align-items:center;
    gap:10px;
    font-weight:500;
    color:${({ theme }) => theme.text};
`

const Avatar = styled.img`
    width:32px;
    height:32px;
    border-radius:50%;
    background-color:#999;
    cursor:pointer;
`

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [profileImg, setProfileImg] = useState(false);
    const [query, setQuery] = useState("");
    const currentUser = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();


    return (
        <>
            <Container>
                <Wrapper>
                    <Search>
                        <Input placeholder='Search' onChange={(e) => setQuery(e.target.value)} />
                        <SearchSharpIcon onClick={() => navigate(`/search?q=${query}`)} />
                    </Search>
                    {currentUser ? (
                        <User>
                            <VideoCallSharpIcon onClick={() => setOpen(true)} />
                            <Avatar onClick={() => setProfileImg(true)} src={currentUser.img} />
                            {currentUser.name}
                        </User>
                    ) : (
                        <Link to="/signin" style={{ textDecoration: "none" }}>
                            <Item>
                                <AccountCircleSharpIcon />
                                Sign In
                            </Item>
                        </Link>
                    )}
                </Wrapper>
            </Container>
            {open && <Upload setOpen={setOpen} />}
            {profileImg && <ProfileImg setOpen={setProfileImg} />}
        </>
    )
}

export default Navbar
