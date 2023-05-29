import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase.js"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { profileImg } from '../redux/userSlice.js';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 200px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  z-index:1;
`;

const Title = styled.h1`
    text-align:center;
`;

const Input = styled.input`
    border:1px solid ${({ theme }) => theme.soft};
    color:${({ theme }) => theme.text};
    border-radius:3px;
    background-color:transparent;
    padding:10px;
    z-index:1;
`;

const Desc = styled.textarea`
    border:1px solid ${({ theme }) => theme.soft};
    color:${({ theme }) => theme.text};
    border-radius:3px;
    background-color:transparent;
    padding:10px;
    z-index:1;
`;

const Button = styled.button`
    border-radius:3px;
    padding:10px 20px;
    border:none;
    font-weight:500;
    cursor:pointer;
    background-color: ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.textSoft};
    z-index:1;
`;

const Label = styled.label`
    font-size:14px;
    font-weight:400px;
    z-index:1;
`;

const ProfileImg = ({ setOpen }) => {
    const currentUser = useSelector(state => state.user.currentUser);
    const [img, setImg] = useState(undefined);
    const [imgPerc, setImgPerc] = useState(0);
    const [url, setUrl] = useState("");
    const dispatch = useDispatch();

    const uploadFile = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImgPerc(Math.round(progress))
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => { },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUrl(downloadURL);
                });
            });
    };

    useEffect(() => { img && uploadFile(img); }, [img]);

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
            const res = await axios.put(`https://vid-app1.herokuapp.com/api/users/${currentUser._id}`, { img: url }, config);
            dispatch(profileImg(url));
            setOpen(false);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setOpen(false)}>X</Close>
                <Title>Upload a new profile image</Title>
                <Label>Upload here:</Label>
                {imgPerc > 0 ? ("Uploading:" + imgPerc + "%") : (<Input type="file" accept="image/*" onChange={e => setImg(e.target.files[0])} />)}
                <Button onClick={handleUpload}>Upload</Button>
            </Wrapper>
        </Container>
    )
}

export default ProfileImg
