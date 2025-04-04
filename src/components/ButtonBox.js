import React from "react";
import { Button } from "react-bootstrap";

const ButtonBox = () => {
  return (
    <div className="button-box">
      <Button variant="warning">Seoul</Button>
      <Button variant="warning">New York</Button>
      <Button variant="warning">London</Button>
      <Button variant="warning">Tokyo</Button>
    </div>
  );
};

export default ButtonBox;
