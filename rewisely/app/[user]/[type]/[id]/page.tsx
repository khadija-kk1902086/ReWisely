"use client";
import * as React from "react";
import { useParams } from "next/navigation";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";
import { InfinitySpin } from "react-loader-spinner";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import App1 from "../../../mindmapContainer";
import "../../../../styles/flashcard.css";
import SocialShare from "@/components/SocialShare";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import "../../../learning-technique/learning-technique.css";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import EditsSaving from "@/components/EditsSaving";

let flashcardArray;
let feynmanTechArray;
let questionsAnswers;

const Page = () => {
  const params = useParams();

  const { user, type, id } = params;
  const [fetching, setFetching] = React.useState(false);
  const [material, setMaterial] = React.useState("");
  const [choices, setChoices] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const [inputValue, setInputValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [indexqa, setIndexqa] = React.useState("");

  React.useEffect(() => {
    GetMaterial();
    console.log(params);
    console.log(user);
    console.log(type);
    console.log(id);
  }, []);

  React.useEffect(() => {
    if (material) {
      console.log("Material:", material);
      setChoices(JSON.parse(material.content));
      console.log("Choices:", choices);
    }
  }, [material]);

  React.useEffect(() => {
    if (submitted) {
      if (type === "summaries") {
        const newChoices = [...choices];
        newChoices[0].message.content = inputValue;
        setChoices(newChoices);
      } else if (type === "flashCards") {
        flashcardArray[index] = inputValue;
        const newChoices = [...choices];
        newChoices[0].message.content = flashcardArray.join("\n");
        setChoices(newChoices);
      } else if (type === "questionsAnswers") {
        questionsAnswers[indexqa] = inputValue;
        const newChoices = [...choices];
        newChoices[0].message.content = questionsAnswers.join("\n");
        setChoices(newChoices);
      } else if (type === "learningTechniques") {
        feynmanTechArray[index] = inputValue;
        const newChoices = [...choices];
        newChoices[0].message.content = feynmanTechArray.join("\n\n");
        setChoices(newChoices);
      }
    }
  }, [submitted]);



  const steps = [
    {
      label: "Choose a Topic",
      url: "/assets/images/teach.png",
    },
    {
      label: "Teach it to a child",
      url: "/assets/images/identify.png",
    },
    {
      label: "Identify Gaps in Understanding",
      url: "/assets/images/understandGap.png",
    },

    {
      label: "Identify Gaps in Review and Consolidate",
      url: "/assets/images/reviewGap.png",
    },

    {
      label: "Repeat and Simplify",
      url: "/assets/images/repeat.png",
    },
    {
      label: "Reflect and Review",
      url: "/assets/images/review.png",
    },
  ];

const stepStyle = {
  "& .Mui-active": {
    "&.MuiStepIcon-root": {
      color: "#6EC6CA",
      fontSize: "3rem",
    },
    "& .MuiStepConnector-line": {
      borderColor: "warning.main",
    },
  },
  "& .Mui-completed": {
    "&.MuiStepIcon-root": {
      color: "#8474A1",
      fontsize: "3rem",
    },
    "& .MuiStepConnector-line": {
      borderColor: "secondary.main",
    },
  },
};
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const GetMaterial = async () => {
    try {
      setFetching(true);
      const response = await fetch(`/api/${user}/${type}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch material");
      }
      const jsonData = await response.json();
      setMaterial(jsonData.material);
      console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK");
      console.log(jsonData);
      console.log(material);
      console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK");
      console.log("fetched successfully!");
      setFetching(false);
    } catch (error) {
      console.error("Error fetching material:", error);
    }
  };

  const handleDoubleClick = (i: number) => {
    setInputValue(choices[i].message.content);
    setSubmitted(false);
    setOpen(true);
  };

  const handleDoubleClickFlashCards = (i: number, index: number) => {
    setInputValue(flashcardArray[index]);
    setSubmitted(false);
    setOpen(true);
  };

  const handleDoubleClickQA = () => {
    setInputValue(questionsAnswers[indexqa]);
    setSubmitted(false);
    setOpen(true);
  };

  const handleDoubleClickFeynman = (i, index) => {
    setIndex(index);
    setInputValue(feynmanTechArray[index]);
    setSubmitted(false);
    setOpen(true);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log("Text field value:", inputValue);
    setSubmitted(true);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div>
        {!fetching && (
          <div className="fixed top-1/2 left-0 transform -translate-y-1/2 flex flex-col items-center justify-center gap-4 p-4 bg-white shadow-md rounded-md">
            {" "}
            <SocialShare user={user} type={type} id={id} />
          </div>
        )}
      </div>
      {open && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-md p-5" // Added padding classes here
          >
            <div className="mb-4">
              <label
                htmlFor="textField"
                className="block text-[#8474A1] font-bold mb-4"
              >
                Enter your updates:
              </label>
              <textarea
                id="textField"
                value={inputValue}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-auto focus:outline-none focus:ring focus:border-[#8474A1]-300"
                style={{ minWidth: "600px", resize: "vertical" }} // Set a minimum width for the input field
                rows={5}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#05585C] hover:bg-[#08979D] text-white px-4 py-2 rounded-md mr-2 focus:outline-none focus:ring focus:border-[#05585C]"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-[6EC6CA]"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* {user} - {type} - {id} */}
      {/* -------------Text Summary------------------- */}
      {!fetching && material && choices && type === "summaries"
        ? choices.map((choice, i) => {
            return (
              <Card
                sx={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  maxWidth: 700,
                  marginTop: 10,
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  borderRadius: 10,
                }}
              >
                <CardActionArea>
                  <CardContent onDoubleClick={() => handleDoubleClick(i)}>
                    <Typography
                      className="text-[#08979D] font-bold flex items-center justify-center"
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      Summary
                    </Typography>
                    <Typography className="mt-5 text-9xl leading-[1.15] text-center sm:text-sm text-black">
                      {choice.message.content}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })
        : ""}
      {/* ------------- mindmap------------------- */}
      {!fetching && material && choices && type === "mindmaps" && (
        <>
          <App1
            sx={{ marginLeft: "auto", marginRight: "auto" }}
            choices={choices}
          />
          {/* <App1/> */}
        </>
      )}
      {/* ------------- Flash Cards------------------- */}
      {!fetching && material && choices && type === "flashCards"
        ? choices.map((choice, i) => {
            flashcardArray = choice.message.content.split("\n");
            return (
              <>
                <div className="wrapper ml-36 mr-36">
                  <button
                    onClick={(e) =>
                      setIndex((index) => (index > 0 ? index - 1 : index))
                    }
                  >
                    {" "}
                    <ArrowBackIosNewSharpIcon
                      className="icon"
                      style={{ marginTop: "60%", fontSize: "90px" }}
                    />{" "}
                  </button>

                  <div
                    className="single-card"
                    onDoubleClick={() => handleDoubleClickFlashCards(i, index)}
                  >
                    <div className="front">
                      <div>
                        <h2
                          style={{
                            fontWeight: "bold",
                            fontSize: "30px",
                          }}
                          className="content"
                          onDoubleClick={() =>
                            handleDoubleClickFlashCards(i, index)
                          }
                        >
                          {flashcardArray[index].split(":")[0]}
                        </h2>
                        {/* Additional content and styling as needed */}
                      </div>
                    </div>
                    <div className="back">
                      <div>
                        <h2
                          style={{
                            fontWeight: "bold",
                            fontSize: "30px",
                          }}
                          className="content"
                          onDoubleClick={() =>
                            handleDoubleClickFlashCards(i, index)
                          }
                        >
                          {flashcardArray[index].split(":")[1]}
                        </h2>
                        {/* Additional content and styling as needed */}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) =>
                      setIndex((index) =>
                        index + 1 < flashcardArray.length ? index + 1 : index
                      )
                    }
                  >
                    {" "}
                    <ArrowForwardIosSharpIcon
                      className="icon"
                      style={{ marginTop: "60%", fontSize: "100px" }}
                    />
                  </button>
                </div>
              </>
            );
          })
        : ""}

      {/* ------------- Feynman------------------- */}
      {!open &&
        !fetching &&
        material &&
        type === "learningTechniques" &&
        choices && (
          <div className="mt-8">
            {choices.map((choice, i) => {
              feynmanTechArray = choice.message.content.split("\n\n");
              return (
                <>
                  <Box className="ml-40 mr-40" sx={{ maxWidth: 400 }}>
                    <Stepper
                      activeStep={activeStep}
                      orientation="vertical"
                      sx={stepStyle}
                    >
                      {steps.map((step, index) => (
                        <Step key={step.label}>
                          <StepLabel
                            optional={
                              index === 5 ? (
                                <Typography variant="caption">
                                  Last step
                                </Typography>
                              ) : null
                            }
                          >
                            {step.label}
                          </StepLabel>
                          <StepContent>
                            <Typography>
                              <section className="card-section">
                                <div className="card">
                                  <div className="flip-card">
                                    <div className="flip-card__container">
                                      <div className="card-front">
                                        <div className="card-front__tp card-front__tp--city">
                                          <h2 className="card-front__heading">
                                            {
                                              feynmanTechArray[index].split(
                                                ":"
                                              )[0]
                                            }
                                          </h2>
                                          <p className="card-front__text-price">
                                            Step {index + 1}
                                          </p>
                                        </div>

                                        <div className="card-front__bt">
                                          <p className="card-front__text-view card-front__text-view--city">
                                            View me
                                          </p>
                                        </div>
                                      </div>
                                      <div className="card-back">
                                        <div className="video__container">
                                          <img
                                            src={step.url}
                                            alt=""
                                            className="video__media"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="inside-page">
                                    <div className="inside-page__container">
                                      <h3
                                        className="inside-page__heading inside-page__heading--city"
                                        onDoubleClick={() =>
                                          handleDoubleClickFeynman(i, index)
                                        }
                                      >
                                        {feynmanTechArray[index].split(":")[0]}
                                      </h3>
                                      <p
                                        className="inside-page__text"
                                        onDoubleClick={() =>
                                          handleDoubleClickFeynman(i, index)
                                        }
                                      >
                                        {feynmanTechArray[index].split(":")[1]}{" "}
                                      </p>
                                      <Box sx={{ mb: 2 }}>
                                        <div>
                                          <Button
                                            className="backBTN"
                                            disabled={index === 0}
                                            onClick={handleBack}
                                            sx={{
                                              mt: 1,
                                              mr: 1,
                                              color: "#CCABD8",
                                            }}
                                          >
                                            Back
                                          </Button>
                                          <Button
                                            className="continueBTN"
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{
                                              mt: 1,
                                              mr: 1,
                                              bgcolor: "#096773",
                                            }}
                                          >
                                            {index === steps.length - 1
                                              ? "Finish"
                                              : "Continue"}
                                          </Button>
                                        </div>
                                      </Box>
                                    </div>
                                  </div>
                                </div>
                              </section>
                            </Typography>
                          </StepContent>
                        </Step>
                      ))}
                    </Stepper>
                    {activeStep === steps.length && (
                      <Paper
                        square
                        elevation={0}
                        sx={{ p: 3 }}
                        className="endMessage"
                      >
                        <Typography className="endMessageText">
                          Congurlations! you are done.
                        </Typography>
                        <Button
                          onClick={handleReset}
                          sx={{
                            mt: 1,
                            mr: 1,
                            color: "white",
                            background: "#08979D",
                            borderRadius: "1rem",
                            p: 1,
                            width: "2rem",
                            "&:hover": { background: "#fff", color: "#08979D" },
                          }}
                        >
                          Reset
                        </Button>
                      </Paper>
                    )}
                  </Box>
                </>
              );
            })}
          </div>
        )}
      {/* ------------- Q&A------------------ */}
      { !fetching && type === "questionsAnswers" && material && choices
        ? choices.map((choice, i) => {
            questionsAnswers = choice.message.content.split("\n");
            return (
              <>
                <div className="wrapper ml-96">
                  <div>
                    {questionsAnswers.map((pair, index) => (
                      <div className="qandaCard">
                        <div
                          className="wrap animate pop"
                          key={index}
                          onClick={() => {
                            setIndexqa(index);
                          }}
                          onDoubleClick={() => handleDoubleClickQA()}
                        >
                          <div className="overlay">
                            <div className="overlay-content animate slide-left delay-2">
                              <h1 className="animate slide-left pop delay-4 text-white">
                                Question -{index + 1}-
                              </h1>
                            </div>
                            <div className="image-content animate slide delay-5">
                              {" "}
                            </div>
                            <div className="dots animate">
                              <div className="dot animate slide-up delay-6"></div>
                              <div className="dot animate slide-up delay-7"></div>
                              <div className="dot animate slide-up delay-8"></div>
                            </div>
                          </div>
                          <div className="text">
                            <p className="question">
                              {questionsAnswers[index].split("?")[0]}?<br></br>
                            </p>
                            <p className="answer">
                              {questionsAnswers[index].split("?")[1]}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            );
          })
        : ""}
      {/* ------------- Loading spinner------------------- */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        {fetching && <Spinner />}
      </div>

      {/* ------------- SaveEdits------------------- */}
      {choices && (
        <EditsSaving
          choices={choices}
          type={type}
          userId={user}
          materialId={id}
        ></EditsSaving>
      )}
    </div>
  );
};

export default Page;
const Spinner = () => <InfinitySpin width="200" color="#08979D" />