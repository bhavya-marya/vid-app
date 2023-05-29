import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import BookmarkSharpIcon from '@mui/icons-material/BookmarkSharp';
import ReplySharpIcon from '@mui/icons-material/ReplySharp';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { fetchSuccess, like } from "../redux/videoSlice";
import { format } from "timeago.js";
import { follow, save } from "../redux/userSlice";
import Recommendation from "../components/Recommendation";
import spinner from "../img/loading.gif";
import Error from "../components/Error";

const Container = styled.div`
  display: flex;
  gap: 24px;
  paddding:0px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;


const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color:#999;
`;

const ChannelDetails = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
  width:85%;
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;


const Follow = styled.button`
    border:none;
    border-radius:3px;
    height:max-content;
    padding:10px 20px;
    cursor:pointer;
`;

const VideoFrame = styled.video`
  max-height:720px;
  width:100%;
  object-fit:cover;
  z-index:0;
`

const Gif = styled.img`
`

const Wrapper = styled.div`
  align-items:center;
  width:100%;
  display:flex;
  justify-content:center;
`

const Video = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  const currentVideo = useSelector(state => state.video.currentVideo);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split('/')[2];
  const [channel, setChannel] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLike = async () => {
    if (!currentUser) {
      setError(true);
      setTimeout(() => setError(false), 1000);
    } else {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
        currentVideo.likes.includes(currentUser._id)
          ? await axios.put(`https://vid-app1.herokuapp.com/api/users/unlike/${currentVideo._id}`, {}, config)
          : await axios.put(`https://vid-app1.herokuapp.com/api/users/like/${currentVideo._id}`, {}, config);
        dispatch(like(currentUser._id));
      } catch (err) {
      }
    }

  }

  const handleSave = async () => {
    if (!currentUser) {
      setError(true);
      setTimeout(() => setError(false), 1000);
    } else {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
        currentUser.saved.includes(currentVideo._id)
          ? await axios.put(`https://vid-app1.herokuapp.com/api/users/unsave/${currentVideo._id}`, {}, config)
          : await axios.put(`https://vid-app1.herokuapp.com/api/users/save/${currentVideo._id}`, {}, config);
        dispatch(save(currentVideo._id));
      } catch (err) {
      }
    }
  }

  const handleFollow = async () => {
    if (!currentUser) {
      setError(true);
      setTimeout(() => setError(false), 1000);
    } else {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
        currentUser.following.includes(channel._id)
          ? await axios.put(`https://vid-app1.herokuapp.com/api/users/unfol/${channel._id}`, {}, config)
          : await axios.put(`https://vid-app1.herokuapp.com/api/users/fol/${channel._id}`, {}, config);
        dispatch(follow(channel._id));
      } catch (err) {
      }
    }

  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
        await axios.put(`https://vid-app1.herokuapp.com/api/videos/view/${path}`, {}, config);
        currentUser && await axios.put(`https://vid-app1.herokuapp.com/api/users/history/${path}`, {}, config);
        const videoRes = await axios.get(`https://vid-app1.herokuapp.com/api/videos/find/${path}`, config);
        const channelRes = await axios.get(`https://vid-app1.herokuapp.com/api/users/find/${videoRes.data.userId}`, config);
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [path, dispatch]);
  return (
    <>
      <Container>
        {loading && <Wrapper><Gif src={spinner} /></Wrapper>}
        {!loading &&
          <>
            <Content>
              <VideoWrapper>
                <VideoFrame src={currentVideo.videoUrl} controls />
              </VideoWrapper>
              <Title>{currentVideo.title}</Title>
              <Details>
                <Info>{currentVideo.views} views {format(currentVideo.createdAt)} 1 day ago</Info>
                <Buttons>
                  <Button onClick={handleLike}>
                    {!currentUser ? <ThumbUpAltOutlinedIcon /> : (currentVideo.likes?.includes(currentUser._id) ? <ThumbUpIcon /> : <ThumbUpAltOutlinedIcon />)}
                    {currentVideo.likes?.length}
                  </Button>
                  <Button>
                    <ReplySharpIcon /> Share
                  </Button>
                  <Button onClick={handleSave}>
                    <BookmarkSharpIcon /> {!currentUser ? "Save" : (currentUser.saved?.includes(currentVideo._id) ? "Saved" : "Save")}
                  </Button>
                </Buttons>
              </Details>
              <Hr />
              <Channel>
                <ChannelInfo>
                  <Img src={channel.img} />
                  <ChannelDetails>
                    <ChannelName>{channel.name}</ChannelName>
                    <ChannelCounter>{channel.followers} Followers</ChannelCounter>
                    <Description>
                      {currentVideo.desc}
                    </Description>
                  </ChannelDetails>
                </ChannelInfo>
                <Follow onClick={handleFollow}>{!currentUser ? "Follow" : (currentUser.following.includes(channel._id) ? "Following" : "Follow")}</Follow>
              </Channel>
              <Hr />
              <Comments videoId={currentVideo._id} />
            </Content>
            <Recommendation tags={currentVideo.tags} /> </>}
      </Container>
      {error && <Error setError={setError} />}
    </>
  )
}

export default Video
