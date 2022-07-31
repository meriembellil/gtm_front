import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import "react-image-lightbox/style.css"
import { Link } from 'react-router-dom';
import { UncontrolledTooltip } from 'reactstrap';

const Gallery = (props) => {

    const { pictures } = props
    const [photoIndex, setphotoIndex] = useState(0)
    const [isGalleryZoom, setisGalleryZoom] = useState(false)

    return (
        <div className="zoom-gallery">
            <Link
                to="#"
                onClick={() => { setisGalleryZoom(true); setphotoIndex(0) }}
                style={{ fontSize: "1.3rem" }}
            >
                <i className="bx bx-images" id="gallery" />
                <UncontrolledTooltip placement="top" target="gallery">
                    Gallery
                </UncontrolledTooltip>
            </Link>
            {isGalleryZoom &&
                <Lightbox
                    mainSrc={pictures[photoIndex]?.path}
                    nextSrc={pictures[(photoIndex + 1) % pictures?.length]?.path}
                    prevSrc={pictures[(photoIndex + pictures?.length - 1) % pictures.length]?.path}
                    onCloseRequest={() => {
                        setisGalleryZoom(false)
                    }}
                    onMovePrevRequest={() => {
                        setphotoIndex((photoIndex + pictures?.length - 1) % pictures?.length)
                    }}
                    onMoveNextRequest={() => {
                        setphotoIndex((photoIndex + 1) % pictures?.length)
                    }}
                />
            }
        </div>
    )
}

export default Gallery;
