"use client";
import React, { useState, useEffect } from "react";
import PromptForm from "@/components/PromptForm";
import "./learning-technique.css";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { InfinitySpin } from "react-loader-spinner";
import FileActions from "../../components/FileActions";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { RoundedCorner } from "@mui/icons-material";

const stepStyle = {
  "& .Mui-active": {
    "&.MuiStepIcon-root": {
      color: "#D40689",
      fontSize: "3rem",
    },
    "& .MuiStepConnector-line": {
      borderColor: "warning.main",
    },
  },
  "& .Mui-completed": {
    "&.MuiStepIcon-root": {
      color: "#340a63",
      fontsize: "3rem",
    },
    "& .MuiStepConnector-line": {
      borderColor: "secondary.main",
    },
  },
};
let feynmanTechArray;
export const page = () => {
  const [fetching, setFetching] = useState(false);
  const [choices, setChoices] = useState([]);
  const [unsplashImages, setUnsplashImages] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [index, setIndex] = useState(0);
  const { data: session } = useSession();
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const userId = session?.user.id;
  const authorName = session?.user.name;
  const pathname = usePathname();
  const[concept,setConcept]=useState("")
  console.log(pathname);

  useEffect(() => {
    if (submitted) {
      feynmanTechArray[index] = inputValue;
      const newChoices = [...choices];
      newChoices[0].message.content = feynmanTechArray.join("\n\n");
      setChoices(newChoices);
    }
  }, [submitted]);

  const handleDoubleClick = (i, index) => {
    setIndex(index);
    setInputValue(feynmanTechArray[index]);
    setSubmitted(false);
    setOpen(true);
  };

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

  /* 
    const fetchFromUnsplash = async (prompt) => {
      try {
        setFetching(true);
  
        // Fetch images from Unsplash
        const unsplashResponse = await fetch(
          `/api.unsplash.com/?query=${encodeURIComponent(prompt)}&client_id=your_unsplash_api_key`
        );
        const unsplashData = await unsplashResponse.json();
        setUnsplashImages(unsplashData.results);
  
        setFetching(false);
      } catch (error) {
        console.error("Error fetching data from Unsplash:", error);
        setFetching(false);
      }
    }; */

  return (
    <div>
      <div>
        {open && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg shadow-md p-5" // Added padding classes here
            >
              <div className="mb-4">
                <label htmlFor="textField" className="block text-blue-500 mb-4">
                  Enter your updates:
                </label>
                <textarea
                  id="textField"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-auto focus:outline-none focus:ring focus:border-blue-300"
                  style={{ minWidth: "600px", resize: "vertical" }} // Set a minimum width for the input field
                  rows={3}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      {!open && (<main className="max-w-4xl mx-auto px-4 py-8">
        <p sx="color: #1668F5" className="illustrateText">
          Enter your difficult concept to be explained using Feynman technique
          for better understanding!
        </p>
        <PromptForm
          onSubmit={async (prompt, conceptSent) => {
            setConcept(conceptSent);
            setFetching(true);
            const response = await fetch("/api/chat-gpt", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                prompt: prompt,
              }),
            });
            const result = await response.json();
            setFetching(false);
            setChoices(result.choices);
          }}
        />

        <div className="flex flex-col items-center">
          {fetching && <Spinner />}
        </div>

        <div className="mt-8">
          {choices.map((choice, i) => {
            feynmanTechArray = choice.message.content.split("\n\n");
            return (
              <>
                <Box sx={{ maxWidth: 400 }}>
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
                                        handleDoubleClick(i, index)
                                      }
                                    >
                                      {feynmanTechArray[index].split(":")[0]}
                                    </h3>
                                    <p
                                      className="inside-page__text"
                                      onDoubleClick={() =>
                                        handleDoubleClick(i, index)
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
                                          sx={{ mt: 1, mr: 1 }}
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
                                    {/*                             <a href="#" className="inside-page__btn inside-page__btn--city">View deals</a>
                                     */}{" "}
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
                          background: "#D40689",
                          borderRadius: "7000px",
                          width: "1.5rem",
                          "&:hover": { background: "#fff", color: "#D40689" },
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
        {!fetching && choices !== null && choices.length > 0 && (
          <FileActions
            choices={choices}
            pathname={pathname}
            authorName={authorName}
            userId={userId}
            fileTitle={concept}
          ></FileActions>
        )}
      </main>)}
    </div>
  );
};

export default page;
const Spinner = () => <InfinitySpin width="200" color="#777" />;
