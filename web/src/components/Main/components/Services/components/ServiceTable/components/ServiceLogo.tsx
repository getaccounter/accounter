import React from "react";
import { Service } from "..";

type Props = {
  service: Service;
};

const ServiceLogo = (props: Props) => (
  <img
    src={`/api/media/${props.service.logo}`}
    alt={`${props.service.name} logo`}
    height={64}
    width={64}
  />
);

export default ServiceLogo;
