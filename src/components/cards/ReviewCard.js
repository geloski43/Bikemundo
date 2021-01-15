import React from "react";
import { Comment, Tooltip, Avatar, Typography } from 'antd';

const { Text } = Typography;


const ReviewCard = ({ product, user }) => {


  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const getInitials = (string) => {
    const names = string.split(' '),
      initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {

      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  return (
    <>
      {product.reviews.map((r, i) => {
        return (
          <div key={i}>
            <Comment
              author={<Text code>{r.postedBy.split("@")[0]}</Text>}

              avatar={
                user && user.picture && user.email === r.postedBy ? <Avatar
                  src={user.picture} />
                  : <Avatar
                    style={{ background: `linear-gradient(to right, #${randomColor}, #${randomColor})` }}
                  > {getInitials(r.postedBy)}</Avatar>
              }

              content={
                <Text strong>
                  {r.review}
                </Text>
              }
              datetime={
                <Tooltip title={new Date(r.timestamp).toLocaleString()} >
                  <span>{r.timestamp.split("T")[0]}</span>
                </Tooltip>
              }
            />
          </div>
        )
      })}
    </>
  )
}


export default ReviewCard;