import React from "react";
import styled from "styled-components";

const ThumbWrapper = styled.div`position: relative; width: 380px; height: 250px; overflow: hidden;`

const OverWrapper = styled.div`position: absolute; right: 0; bottom: 0; left: 0; padding: 0 12px; height: 50px; white-space: nowrap; zoom: 1;`;
const OverBackground = styled.span`position: absolute; top: 0; right: 0; bottom: 0; left: 0; background-color:rgba(0, 0, 0, 0.3);`;
const OverText = styled.p`overflow: hidden;text-overflow: ellipsis; color: white; font-weight:800;z-index: 900; position: absolute; width:90%;`;

const ThumbNews = ({ imageUrl, text }) => {
  return (
    <ThumbWrapper>
      <img src={imageUrl} />
      <OverWrapper>
        <OverBackground />
          <OverText>{text}</OverText>
      </OverWrapper>
    </ThumbWrapper>
  );
}

export default ThumbNews;