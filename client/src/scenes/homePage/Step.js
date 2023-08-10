import React from "react";

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const Step = ({
  region,
  technology,
  stepseqid,
  stepdescription,
  referenceurl,
  completionstatus,
  updateMode,
  deleteStep,
}) => {
  return (
    <div className="step">
      <div className="region">{region}</div>
      <div className="technology">{technology}</div>
      <div className="stepseqid">{stepseqid}</div>
      <div className="stepdescription">{stepdescription}</div>
      <div className="referenceurl">{referenceurl}</div>
      <div className="completionstatus">{completionstatus}</div>
      <div className="icons">
        <BiEdit className="icon" onClick={updateMode} />
        <AiFillDelete className="icon" onClick={deleteStep} />
      </div>
    </div>
  );
};

export default Step;
