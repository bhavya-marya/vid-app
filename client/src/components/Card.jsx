import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { format } from "timeago.js";
import axios from "axios";

const Container = styled.div`
    width:${(props) => props.type !== "sm" && "360px"};
    margin-bottom:${(props) => props.type === "sm" ? "10px" : "45px"};
    cursor:pointer;
    display: ${(props) => props.type === "sm" && "flex"};
    gap:10px;
`;

const Img = styled.img`
    width:100%;
    height:${(props) => props.type === "sm" ? "100px" : "202px"};
    background-color:#999;
    flex:2;
`;

const Details = styled.div`
    display:flex;
    margin-top:${(props) => props.type === "sm" ? "0px" : "16px"};
    gap:12px;
    flex:1;
`;

const ProfileImg = styled.img`
    width:36px;
    height:36px;
    background-color:#999;
    border-radius:50%;
    display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div`
`;

const Title = styled.h1`
    font-size:16px;
    font-weight:500;
    color: ${({ theme }) => theme.text};
    margin:0px;
`;

const ProfileName = styled.h2`
    font-size:14px;
    color: ${({ theme }) => theme.textSoft};
    margin:6px 0px;
`;

const Info = styled.div`
    font-size:14px;
    color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`https://vid-app1.herokuapp.com/api/users/find/${video.userId}`);
            setUser(res.data);
        }
        fetchUser();
    }, [video.userId])
    return (
        <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
            <Container type={type}>
                <Img type={type} src={video.imgUrl} />
                <Details type={type}>
                    <ProfileImg type={type} src={user.img} />
                    <Texts>
                        <Title>{video.title}</Title>
                        <ProfileName>{user.name}</ProfileName>
                        <Info>{video.views} views {format(video.createdAt)}</Info>
                    </Texts>
                </Details>
            </Container>
        </Link>
    )
}

export default Card
