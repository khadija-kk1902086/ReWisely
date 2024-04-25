import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
} from "next-share";

export default function SocialShare({ user, type, id }) {

  return (
    <>
      <FacebookShareButton
        id="FacebookShareButton"
        url={`http://localhost:3000/${user}/${type}/${id}`}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <PinterestShareButton url={`http://localhost:3000/${user}/${type}/${id}`}>
        <PinterestIcon size={32} round />
      </PinterestShareButton>
      <RedditShareButton url={`http://localhost:3000/${user}/${type}/${id}`}>
        <RedditIcon size={32} round />
      </RedditShareButton>
      <WhatsappShareButton url={`http://localhost:3000/${user}/${type}/${id}`}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <LinkedinShareButton url={`http://localhost:3000/${user}/${type}/${id}`}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <TelegramShareButton url={`http://localhost:3000/${user}/${type}/${id}`}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>
      <TwitterShareButton url={`http://localhost:3000/${user}/${type}/${id}`}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </>
  );
}
