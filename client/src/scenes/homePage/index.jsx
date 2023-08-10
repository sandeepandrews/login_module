import { useEffect, useState } from "react";
import Step from "./Step";
import { TECHNOLOGIES, STATUS, REGION } from "./Categories";
import { addStep, getAllStep, updateStep, deleteStep } from "./HandleApi";
import validator from "validator";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function HomePage() {
  const [steP, setStep] = useState([]);
  const [region, setRegion] = useState("");
  const [technology, setTechnology] = useState("");
  const [stepseqid, setStepseqid] = useState("");
  const [stepdescription, setStepdescription] = useState("");
  const [referenceurl, setReferenceurl] = useState("");
  const [completionstatus, setCompletionstatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [stePId, setStepId] = useState("");
  const [urlerrorMessage, setURLErrorMessage] = useState("");

  useEffect(() => {
    getAllStep(setStep);
  }, []);

  const updateMode = (
    _id,
    region,
    technology,
    stepseqid,
    stepdescription,
    referenceurl,
    completionstatus
  ) => {
    setIsUpdating(true);
    setRegion(region);
    setTechnology(technology);
    setStepseqid(stepseqid);
    setStepdescription(stepdescription);
    setReferenceurl(referenceurl);
    setCompletionstatus(completionstatus);
    setStepId(_id);
  };

  // Reference URL validation:
  const validate = (referenceurl) => {
    if (validator.isURL(referenceurl)) {
      setURLErrorMessage("Valid URL");
    } else {
      setURLErrorMessage("Invalid URL");
    }
  };

  // Determining the length of "description" text:
  const textLength = stepdescription.length;

  const showToastMessage = () => {
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <>
      <div className="App">
        <div className="container">
          <h1>Pilot Deployment Steps App</h1>
          {/* Top banner to accept a new step */}
          <div className="top">
            <form
              className="fact-form"
              onSubmit={
                isUpdating
                  ? () =>
                      updateStep(
                        stePId,
                        region,
                        technology,
                        stepseqid,
                        stepdescription,
                        referenceurl,
                        completionstatus,
                        setStep,
                        setRegion,
                        setTechnology,
                        setStepseqid,
                        setStepdescription,
                        setReferenceurl,
                        setCompletionstatus,
                        setIsUpdating
                      )
                  : () => {
                      addStep(
                        region,
                        technology,
                        stepseqid,
                        stepdescription,
                        referenceurl,
                        completionstatus,
                        setRegion,
                        setTechnology,
                        setStepseqid,
                        setStepdescription,
                        setReferenceurl,
                        setCompletionstatus,
                        setStep
                      );
                      //                 {
                      // toast.success("Step added successfully", {
                      //   position: toast.POSITION.TOP_RIGHT,
                      // })
                      // }
                      console.log("hello");
                    }
              }
            >
              {/* Dropdown option for Region: */}
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="">Choose Region</option>
                {REGION.map((reg) => (
                  <option key={reg.name} value={reg.name}>
                    {reg.name.toUpperCase()}
                  </option>
                ))}
              </select>
              {/* Dropdown option for Technology: */}
              <select
                value={technology}
                onChange={(e) => setTechnology(e.target.value)}
              >
                <option value="">Choose Technology</option>
                {TECHNOLOGIES.map((tech) => (
                  <option key={tech.name} value={tech.name}>
                    {tech.name.toUpperCase()}
                  </option>
                ))}
              </select>
              {/* Input for Adding sequence number: */}
              <input
                type="text"
                placeholder="Add step sequence number..."
                value={stepseqid}
                onChange={(e) => setStepseqid(e.target.value)}
                disabled={isUpdating}
              />
              {/* Input for Adding Step Description: */}
              {"remaining characters: " + (200 - textLength)}
              <input
                type="text"
                placeholder="Add step description..."
                value={stepdescription}
                onChange={(e) => setStepdescription(e.target.value)}
                disabled={isUpdating}
              />
              {/* Input for Adding SIM Ticket: */}
              <input
                type="text"
                placeholder="Add reference SIM.."
                value={referenceurl}
                onChange={(e) => {
                  setReferenceurl(e.target.value);
                  validate(e.target.value);
                }}
              />
              <br />
              <span
                style={{
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                {urlerrorMessage}
              </span>

              {/* Dropdown option for Status: */}
              <select
                value={completionstatus}
                onChange={(e) => setCompletionstatus(e.target.value)}
              >
                <option value="">Status</option>
                {STATUS.map((status) => (
                  <option key={status.name} value={status.name}>
                    {status.name}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-large"
                // Disable "add" button when required input is missing
                disabled={
                  (validator.isURL(referenceurl) ? false : true,
                  !region,
                  !technology,
                  !stepseqid,
                  !stepdescription,
                  !referenceurl,
                  !completionstatus)
                }
                onClick={
                  isUpdating
                    ? () =>
                        updateStep(
                          stePId,
                          region,
                          technology,
                          stepseqid,
                          stepdescription,
                          referenceurl,
                          completionstatus,
                          setStep,
                          setRegion,
                          setTechnology,
                          setStepseqid,
                          setStepdescription,
                          setReferenceurl,
                          setCompletionstatus,
                          setIsUpdating
                        )
                    : () => {
                        addStep(
                          region,
                          technology,
                          stepseqid,
                          stepdescription,
                          referenceurl,
                          completionstatus,
                          setRegion,
                          setTechnology,
                          setStepseqid,
                          setStepdescription,
                          setReferenceurl,
                          setCompletionstatus,
                          setStep
                        );
                        {
                          toast.success("Step added successfully", {
                            position: toast.POSITION.TOP_RIGHT,
                          });
                        }
                      }
                }
              >
                {/* Add */}
                {isUpdating ? "Update" : "Add"}
              </button>
            </form>
          </div>
          <div>
            <button onClick={showToastMessage}>Notify</button>
            <ToastContainer />
          </div>
          {/*  For displaying the steps: */}
          <div className="list">
            {steP.map((item) => (
              <Step
                key={item._id}
                region={item.region}
                technology={item.technology}
                stepseqid={item.stepseqid}
                stepdescription={item.stepdescription}
                referenceurl={item.referenceurl}
                completionstatus={item.completionstatus}
                updateMode={() =>
                  updateMode(
                    item._id,
                    item.region,
                    item.technology,
                    item.stepseqid,
                    item.stepdescription,
                    item.referenceurl,
                    item.completionstatus
                  )
                }
                // Function to delete step:
                deleteStep={() => {
                  const confirmDelete = window.confirm(
                    "Are you sure you want to delete?"
                  );
                  if (confirmDelete) {
                    //   if (window.confirm("Are you sure to delete the step")) {
                    deleteStep(item._id, setStep);
                    toast.success("Step deleted successfully", {
                      position: toast.POSITION.TOP_RIGHT,
                    });
                  } else {
                    // alert("Not Deleted");
                    toast.dismiss();
                  }
                }}
              />
            ))}
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
