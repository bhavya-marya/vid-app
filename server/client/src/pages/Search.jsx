import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components"
import Card from '../components/Card';

const Container = styled.div`
    display:flex;
    flex-wrap:wrap;
    gap:10px;
`

const Search = () => {
    const [videos, setVideos] = useState([]);
    const query = useLocation().search;
    useEffect(() => {
        const fetchVideos = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
            const res = await axios.get(`https://vid-app1.herokuapp.com/api/videos/search${query}`, config);
            setVideos(res.data);
        }
        fetchVideos();
    }, [query]);
    return (
        <Container>
            {videos.map((video) => {
                return <Card key={video._id} video={video} />
            })}
        </Container>
    )
}

export default Search
