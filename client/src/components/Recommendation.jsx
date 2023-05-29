import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import Card from './Card';

const Container = styled.div`
  flex: 2;
`;

const Recommendation = ({ tags }) => {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        const fetchVideos = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
            if (tags.length > 0) {
                const res = await axios.get(`https://vid-app1.herokuapp.com/api/videos/tags?tags=${tags}`, config);
                setVideos(res.data);
            }
        }
        fetchVideos();
    }, [tags])
    return (
        <Container>
            {videos.map((video) => {
                return <Card key={video._id} video={video} type="sm" />
            })}
        </Container>
    )
}

export default Recommendation
