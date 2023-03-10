import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from 'axios';
import { unavailable, img_500, unavailableLandscape } from '../../config/config';
import YouTubeIcon from '@mui/icons-material/YouTube';
import "./ContentModal.css";
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Carousel from './Carousel/Carousel.js';


const useStyle = styled((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    paper: {
        width: "90%",
        height: "80%",
        backgroundColor: "#39445a",
        border: "1px solid #282c34",
        borderRadius: 10,
        color: "white",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 3),
    }
}));


export default function ContentModal({ children, media_type, id }) {
    const classes = useStyle();
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = useState();
    const [video, setVideo] = useState();

    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
    };

    const fetchData = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}?api_key=73a73dda6aef402ee87166dd70d8aa0d&language=en-US`
        );
        setContent(data);
        // console.log(data);
    };

    const fetchVideo = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=73a73dda6aef402ee87166dd70d8aa0d&language=en-US`
        );
        setVideo(data.results[0]?.key);
    };

    useEffect(() => {
        fetchData();
        fetchVideo();
    }, []);

    return (
        <>
            <div
                onClick={handleOpen}
                className="media"
                style={{ cursor: "pointer" }}
                color="inherit"
            >
                {children}
            </div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slotsBackdrop={Backdrop}
                slotPropsBackdrop={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box>
                        {content && (
                            <div className={classes.paper}>
                                <div className='ContentModal'>
                                    <img
                                        alt={content.name || content.title}
                                        className='ContentModal_portrait'
                                        src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable}
                                    />
                                    <img
                                        src={content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailableLandscape}
                                        alt={content.name || content.title}
                                        className="ContentModal_landscape"
                                    />
                                    <div className='ContentModal_about'>
                                        <span className='ContentModal_title'>
                                            {content.name || content.title}(
                                            {(
                                                content.first_air_date ||
                                                content.release_date ||
                                                "------"
                                            ).substring(0, 4)}
                                            )
                                        </span>
                                        {content.tagline && (
                                            <i className='tagline'>{content.tagline}</i>
                                        )}
                                        <span className='ContentModal_description'>
                                            {content.overview}
                                        </span>
                                        <div>
                                            <Carousel media_type={media_type} id={id}/>
                                        </div>
                                        <Button
                                            variant='contained'
                                            startIcon={<YouTubeIcon />}
                                            color="secondary"
                                            target="_blank"
                                            href={`http://www.youtube.com/watch?v=${video}`}
                                        >
                                            Watch the Trailer

                                        </Button>
                                    </div>
                                </div>

                            </div>
                        )}
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}