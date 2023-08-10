import axios from "axios";

const baseUrl = "http://localhost:5000";

const getAllStep = (setStep) => {
  axios.get(baseUrl).then(({ data }) => {
    console.log("data ---> ", data);
    setStep(data);
  });
};

// Add step
const addStep = (
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
) => {
  {
    axios
      .post(`${baseUrl}/save`, {
        region,
        technology,
        stepseqid,
        stepdescription,
        referenceurl,
        completionstatus,
      })
      .then((data) => {
        console.log(data);
        setRegion("");
        setTechnology("");
        setStepseqid("");
        setStepdescription("");
        setReferenceurl("");
        setCompletionstatus("");
        getAllStep(setStep);
      })
      .catch((err) => console.log(err));
  }
  // {
  //   toast.success("Step added successfully", {
  //     position: toast.POSITION.TOP_RIGHT,
  //   });
  // }
};

// Update step
const updateStep = (
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
) => {
  axios
    .post(`${baseUrl}/update`, {
      _id: stePId,
      region,
      technology,
      stepseqid,
      stepdescription,
      referenceurl,
      completionstatus,
    })
    .then((data) => {
      setRegion("");
      setTechnology("");
      setStepseqid("");
      setStepdescription("");
      setReferenceurl("");
      setCompletionstatus("");
      setIsUpdating(false);
      getAllStep(setStep);
    })
    .catch((err) => console.log(err));
};

const deleteStep = (_id, setStep) => {
  axios
    .post(`${baseUrl}/delete`, { _id })
    .then((data) => {
      console.log(data);
      getAllStep(setStep);
    })
    .catch((err) => console.log(err));
};

export { getAllStep, addStep, updateStep, deleteStep };
