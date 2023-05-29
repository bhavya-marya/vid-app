import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import axios from 'axios';
import { format } from "timeago.js";

const Container = styled.div`
    display:flex;
    gap:10px;
    margin:30px 0px;
`;

const Img = styled.img`
    background-color:#999;
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

const Details = styled.div`
    display:flex;
    flex-direction:column;
    width:85%;
`;

const User = styled.span`
    font-size:13px;
    font-weight:500;
    color: ${({ theme }) => theme.text};
    margin-bottom:10px;
`;

const Date = styled.span`
    font-size:12px;
    font-weight:400;
    color: ${({ theme }) => theme.textSoft};
    margin-left:5px;
`;

const Text = styled.span`
    font-size:14px;
    color: ${({ theme }) => theme.text};
`;

const Comment = ({ comment }) => {
    const [channel, setChannel] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
                const res = await axios.get(`https://vid-app1.herokuapp.com/api/users/find/${comment.userId}`, config);
                setChannel(res.data);

            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [comment.userId])
    return (
        <Container>
            <Img src={channel.img} />
            <Details>
                <User>{channel.name} <Date>{format(comment.createdAt)}</Date></User>
                <Text>{comment.desc}</Text>
            </Details>
        </Container>
    )
}

export default Comment
