import React, { useState } from 'react';
import axios from 'axios';
import { AiTwotoneLike, AiOutlineLike } from 'react-icons/ai';

const Product = ({ _id, topic, title, about, owner, like, date, thumbnail, images }) => {
  const [liked, setLiked] = useState(like > 0);
  const [likeCount, setLikeCount] = useState(like);

  const handleLikeClick = async () => {
    if (!liked) {
      setLikeCount(likeCount + 1);
      setLiked(true);

      try {
        const newLike = likeCount + 1;
        const res = await axios.patch(`/products/${_id}`, { like: newLike });
        console.log(res.data);
      } catch (error) {
        console.error('Error updating like count:', error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="image-container">
              <div className="first">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="discount">-{owner}</div>
                  <h4>{topic}</h4>
                  <span className="wishlist">
                    {liked ? (
                      <AiTwotoneLike className="like-icon" />
                    ) : (
                      <AiOutlineLike className="like-icon" onClick={handleLikeClick} />
                    )}
                  </span>
                </div>
              </div>
              <h3>{likeCount}</h3>
              <img
                src={thumbnail} // Make sure to use the correct property for the image source
                className="img-fluid rounded thumbnail-image"
                alt={title}
              />
            </div>
            <div className="product-detail-container p-2">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="dress-name">{title}</h5>
                <div className="d-flex flex-column mb-2">
                  <small className="old-price text-right">$ {about}</small>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center pt-1">
                <div>
                  <i className="fa fa-star-o rating-star" />
                  <span className="rating-number">{date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
