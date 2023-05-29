import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import Card from '../components/Card';
import axios from "axios";
import { useSelector } from 'react-redux';
import spinner from "../img/loading.gif";

const Container = styled.div`
    display:flex;
    justify-content:space-between;
    flex-wrap:wrap;
`;

const Wrapper = styled.div`
    color:${({ theme }) => theme.text};
    align-items:center;
    display:flex;
    justify-content:center;
    width:100%;
    height:70vh;
`

const Text = styled.div`
`

const Gif = styled.img`
`


const Home = ({ type }) => {
    const [videos, setVideos] = useState([]);
    const currentUser = useSelector(state => state.user.currentUser);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchVideos = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
            const res = await axios.get(`https://vid-app1.herokuapp.com/api/videos/${type}`, config);
            setVideos(res.data);
            setLoading(false);
        }
        (currentUser || (type === "random" || type === "trending")) && fetchVideos();
    }, [type, currentUser])

    return (
        <Container>
            {loading && <Wrapper><Gif src={spinner} /></Wrapper>}
            {!loading && ((currentUser || (type === "random" || type === "trending")) ? (videos.map((video) => {
                return <Card key={video._id} video={video} />
            })) : (<Wrapper><Text>Please sign in to view this section</Text></Wrapper>))}
        </Container>
    )
}

export default Home
