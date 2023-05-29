import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Comment from './Comment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
`;
const NewComment = styled.div`
    display:flex;
    align-items:center;
    gap:10px;
`;
const Img = styled.img`
    background-color:#999;
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;
const Input = styled.input`
    border:none;
    border-bottom: 1px solid ${({ theme }) => theme.soft};
    background-color:transparent;
    outline:none;
    padding:5px;
    width:100%;
    color:${({ theme }) => theme.text};
`;
const Form = styled.form`
    width:100%;
`

const Comments = ({ videoId }) => {
    const currentUser = useSelector(state => state.user.currentUser);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
            const res = await axios.post(`https://vid-app1.herokuapp.com/api/comments`, { desc: newComment, videoId }, config);
            console.log(res.data);
            window.location.reload(false);
        } catch (err) {

        }
    }
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
                const res = await axios.get(`https://vid-app1.herokuapp.com/api/comments/${videoId}`, config);
                setComments(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchComments();
    }, [videoId]);
    return (
        <Container>
            {currentUser && <NewComment>
                <Img src={currentUser.img}></Img>
                <Form onSubmit={handleSubmit}>
                    <Input placeholder="Add a comment..." onChange={(e) => setNewComment(e.target.value)} ></Input>
                </Form>
            </NewComment>}
            {comments.map((comment) => {
                return <Comment key={comment._id} comment={comment} />
            })}
        </Container>
    )
}

export default Comments
