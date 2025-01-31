import React, { FC } from "react";
import ContentLoader from "react-content-loader";

const Skeleton: FC = (props) => (
  <ContentLoader speed={2} width={280} height={455} viewBox="0 0 280 455" backgroundColor="#f3f3f3" foregroundColor="#ecebeb" {...props}>
    <rect x="0" y="233" rx="10" ry="10" width="280" height="24" />
    <rect x="0" y="267" rx="10" ry="10" width="280" height="84" />
    <rect x="0" y="368" rx="10" ry="10" width="88" height="27" />
    <rect x="119" y="360" rx="20" ry="20" width="152" height="44" />
    <circle cx="140" cy="110" r="109" />
  </ContentLoader>
);

export default Skeleton;
