import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { useSession } from "next-auth/react";
import { InfinitySpin } from "react-loader-spinner";
import FileActions from "./FileActions";
import SocialShare from "./SocialShare";
import App1 from "../app/mindmapContainer";
import { truncateSync } from "fs";
import { trusted } from "mongoose";
import Link from "next/link";
import { ArrowDownTrayIcon, ArrowUpTrayIcon, CursorArrowRaysIcon } from "@heroicons/react/20/solid";

let flashcardArray: string[] = [];
let questionsAnswers: string[] = [];

export const UploadButton = () => {
  const [file, setFile] = useState<File>();
  const [choices, setChoices] = useState([]);
  const [index, setIndex] = useState(0);
  const [indexqa, setIndexqa] = useState(0);
  const [fileTitle, setFileTitle] = useState("");

  const { data: session } = useSession();
  const [result, setResult] = useState<any>(null); // Declare result state
  // const [userId, setUserId] = useState<Number>();
  const [fetching, setFetching] = useState(false);
  const userId = session?.user.id;
  const authorName = session?.user.name;

  const [questionPairArray, setQuestionPairArray] = useState<string[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const [questionComplexity, setQuestionComplexity] = useState("Simple");
  const [numberOfQuestions, setNumberOfQuestions] = useState(3);
  const [numberOfWords, setNumberOfWords] = useState(30);
  const [numberOfCards, setNumberOfCards] = useState(3);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
/*   useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    console.log("Result:", result);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [result]); */

  useEffect(() => {
    if (submitted) {
      if (pathname === "/text-summary") {
        const newChoices = [...choices];
        newChoices[0].message.content = inputValue;
        setChoices(newChoices);
      } else if (pathname === "/flash-cards") {
        flashcardArray[index] = inputValue;
        const newChoices = [...choices];
        newChoices[0].message.content = flashcardArray.join("\n");
        setChoices(newChoices);
      } else if (pathname === "/questions-answers") {
        questionsAnswers[indexqa] = inputValue;
        const newChoices = [...choices];
        newChoices[0].message.content = questionsAnswers.join("\n");
        setChoices(newChoices);
      }
    }
  }, [submitted]);

  useEffect(() => {
    setChoices(choices);
  }, [choices]);

  const containerStyle: React.CSSProperties = {
    position: "absolute",
    top: "250px",
    left: "50%",
    bottom: "50px",
    transform: "translateX(-50%)",
    maxWidth: "900px",
    width: "100%",
    zIndex: "999",
    overflowY: "auto",
    maxHeight: "calc(70vh - 50px)",
    backgroundColor: "none",
  };

  let question = "";
  const pathname = usePathname();
  console.log(pathname);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setFetching(true);
    if (pathname === "/mind-map") {
      question =
        // "Give me a title and 6 bullet points with a brief description of this text and put each of the points in one line, put : between each point name and its description. add extra info in every point, separate each description and its extra info with a : ";
        //"extract from the text these fixed things: the title, 4 mindmap main points, and 3 sub-points from each main point.name each subpoint (put a :) and add one small senetence to each subpoint and put each main point in a whole one line";
        "extract from the text a title and these fixed things: 4(please please 4) mindmap numbered main points with 3(please 3)subpoint.name each subpoint (put a :) and add one small senetence to each subpoint and put each main point in a whole one line:";
      // "Give me a title and 6 bullet points with a brief description of this text and put each of the points in one line, put : between each point name and its description. add extra info in every point, separate each description and its extra info with a : ";
    } else if (pathname === "/questions-answers") {
      question = `With complexity being ${questionComplexity}, extract only ${numberOfQuestions} questions from the text with their answers without numbering and follow this format Question?Answer\n, here is an example: What is Next.js?It's a React framework\nWhat is React?Its a client side web library\n`;
    } else if (pathname === "/flash-cards") {
      question = `With complexity being ${questionComplexity}, extract only ${numberOfCards} definitions from the text with their key words and put each of them in one line without numbering them and use : between the key word and its definision  and if the text is in arabic answer:استخرج أهم التعاريف من النص `;
    } else if (pathname === "/text-summary") {
      question = `Summarize this text well in ${numberOfWords} words with complexity of summary being ${questionComplexity} and answer the same language as th text`;
    } else if (pathname === "/learning-technique") {
      question = "explain this text with Feynman Technique";
    }

    e.preventDefault();

    // Check if the file is undefined
    if (!file) {
      // Display an error message or handle the error accordingly
      console.error("File is undefined. Please select a file.");
      return; // Exit the function
    }
    try {
      const data = new FormData();
      data.set("file", file);
      data.set("userId", String(userId)); // Set user ID in form data
      data.set("authorName", authorName || ""); // Set user name in form data
      setFileTitle(file.name);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        throw new Error(
          `Failed to upload file: ${res.status} - ${res.statusText}`
        );
      }

      const { success, text } = await res.json();
      console.log(text);

      // console.log("HIIIIIIIIIIIIIIIIIIIIIIIIIIIII");
      // console.log(res);
      // console.log("HIIIIIIIIIIIIIIIIIIIIIIIIIIIII");

      const prompt = `${text}\n\n${question}`;
      console.log(prompt);
      const response = await fetch("/api/chat-gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt, //same as saying prompt: prompt,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch response from /api/chat-gpt: ${response.status} - ${response.statusText}`
        );
      }

      const result = await response.json();

      result.choices.forEach((choice: any) => {
        questionsAnswers = choice.message.content.split("\n").filter(Boolean);
      });

      console.log("questionsAnswersArray:", questionsAnswers);
      setChoices(result.choices);
      setFetching(false);
      setResult(result);
    } catch (e: any) {
      console.error(e);
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

  console.log("questionPairArray:", questionPairArray);

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

  const [showCard, setShowCard] = useState(false); 

  const handleClick = () => {
    setShowCard(!showCard); 
  };
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
                <label
                  htmlFor="textField"
                  className="block text-[#08979D] mb-4"
                >
                  Enter your updates:
                </label>
                <textarea
                  id="textField"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-auto focus:outline-none focus:ring focus:border-[#08979D]"
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
        <form
          onSubmit={onSubmit}
          className="form-container-inputs flex flex-row items-center flex-wrap"
        >
          <div className="flex flex-row items-center ">
            <div>
              <label className="relative cursor-pointer bg-white rounded-md border border-gray-300 m-2 shadow-sm py-2 px-4 inline-flex items-center space-x-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#08979D]">
                <svg
                  className="h-6 w-6 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span>Browse</span>
                <input
                  type="file"
                  name="file"
                  className="sr-only"
                  onChange={(e) => setFile(e.target.files?.[0])}
                />
                {file && (
                  <span className="ml-2 text-xs text-gray-500">
                    {file.name}
                  </span>
                )}
              </label>
            </div>
            <div>
              {pathname === "/flash-cards" && (
                <>
                  <div className="flex flex-row items-center mt-2">
                    <div style={{ width: "125px", marginBottom: "9px" }}>
                      <label
                        htmlFor="numberOfCards"
                        className="ml-2 text-sm font-medium text-[#08979D]"
                      >
                        Number of Cards:
                      </label>
                    </div>
                    <div>
                      <input
                        type="number"
                        id="numberOfCards"
                        value={numberOfCards}
                        onChange={(e) =>
                          setNumberOfCards(parseInt(e.target.value))
                        }
                        style={{ textAlign: "center" }}
                        min={1}
                      />
                    </div>
                    <div style={{ width: "87px", marginBottom: "8px" }}>
                      <label
                        htmlFor="complexity"
                        className="ml-2 text-sm font-medium text-[#08979D]"
                      >
                        Complexity:
                      </label>
                    </div>
                    <div>
                      <select
                        value={questionComplexity}
                        onChange={(e) => setQuestionComplexity(e.target.value)}
                      >
                        <option value="">Choose Flash Cards Complexity</option>
                        <option value="Simple">Simple</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Complex">Complex</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div>
              {pathname === "/text-summary" && (
                <>
                  <div className="flex flex-row items-center mt-6">
                    <div style={{ width: "125px", marginBottom: "25px" }}>
                      <label
                        htmlFor="numberOfWords"
                        className=" text-sm font-medium text-[#08979D]"
                      >
                        Number of Words:
                      </label>
                    </div>
                    <div>
                      <input
                        type="number"
                        id="numberOfWords"
                        value={numberOfWords}
                        onChange={(e) =>
                          setNumberOfWords(parseInt(e.target.value))
                        }
                        min={30}
                        style={{ textAlign: "center" }}
                        // max={500}
                      />
                    </div>
                    <div style={{ width: "90px", marginBottom: "25px" }}>
                      <label
                        htmlFor="summaryComplexity"
                        className="ml-2 text-sm font-medium text-[#08979D]"
                      >
                        Complexity:
                      </label>
                    </div>
                    <div>
                      <select
                        style={{ textAlign: "center" }}
                        value={questionComplexity}
                        onChange={(e) => setQuestionComplexity(e.target.value)}
                      >
                        <option value="">Choose Summary Complexity</option>
                        <option value="Simple">Simple</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Complex">Complex</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div>
              {pathname === "/questions-answers" && (
                <>
                  <div className="flex flex-row  items-center  mt-6">
                    <div style={{ width: "153px", marginBottom: "22px" }}>
                      <label
                        htmlFor="numberOfQuestions"
                        className="ml-2 text-sm font-medium text-[#08979D]"
                      >
                        Number of Questions:
                      </label>
                    </div>
                    <div>
                      <input
                        type="number"
                        id="numberOfQuestions"
                        style={{ textAlign: "center" }}
                        value={numberOfQuestions}
                        onChange={(e) =>
                          setNumberOfQuestions(parseInt(e.target.value))
                        }
                        min={1}
                        // max={20}
                      />
                    </div>
                    <div style={{ width: "88px", marginBottom: "22px" }}>
                      <label
                        htmlFor="summaryComplexity"
                        className="ml-2 text-sm font-medium text-[#08979D]"
                      >
                        Complexity:
                      </label>
                    </div>
                    <div>
                      <select
                        value={questionComplexity}
                        style={{ textAlign: "center" }}
                        onChange={(e) => setQuestionComplexity(e.target.value)}
                      >
                        <option value="">Choose Question Complexity</option>
                        <option value="Simple">Simple</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Complex">Complex</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div style={{marginLeft:"10px" }}>
              <button type="submit" className="black_btn">
                Upload
              </button>
            </div>
          </div>
        </form>
        {/* {
          <div className="pdf-parent-container">
            <div className="form-container-inputs flex flex-row items-center flex-wrap">
              <button className="pdf_btn_rotated" onClick={handleClick}>
                for PDF Files
              </button>

              {showCard && (
                <Card className="p-4">
                  {" "}
                  <div className="pfd-steps">
                    <p className="step-text">
                      For pdf files, you need to follow these steps:
                    </p>

                    <div className="individual-step">
                      <p className="step-text">click convert pdf button</p>
                      <CursorArrowRaysIcon className="pdfIcon" />
                    </div>
                    <div className="individual-step">
                      <p className="step-text">download the file converted</p>
                      <ArrowDownTrayIcon className="pdfIcon"></ArrowDownTrayIcon>
                    </div>
                    <div className="individual-step">
                      <p className="step-text">
                        Upload your .txt file using Upload button
                      </p>
                      <ArrowUpTrayIcon className="pdfIcon"></ArrowUpTrayIcon>
                    </div>
                  </div>
                  <button className="pdf_btn">
                    <Link href="https://www.pdf2go.com/pdf-to-text">
                      Convert PDF
                    </Link>
                  </button>
                </Card>
              )}
            </div>
          </div>
        } */}
        {/*  {pathname !== "/text-summary" ||pathname !== "/flash-cards" ?choices.map((choice) => {
        return <p key={choice.index}>{choice.message.content}</p>;
      }):""}
    */}

        {/* -------------Text Summary------------------- */}
        {!fetching && pathname === "/text-summary"
          ? choices.map((choice, i) => {
              return (
                <Card
                  sx={{
                    maxWidth: 700,
                    marginTop: 5,
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
                      <Typography className="mt-5 text-9xl leading-[1.15] text-center sm:text-sm text-[#8474A1]">
                        {choice.message.content}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })
          : ""}
        {/* ------------- mindmap------------------- */}
        {!fetching &&
          pathname === "/mind-map" &&
          choices &&
          choices.length > 0 && (
            <>
              <App1 choices={choices} />
              {/* <App1/> */}
            </>
          )}
        {/* ------------- Flash Cards------------------- */}
        {!fetching && pathname === "/flash-cards"
          ? choices.map((choice, i) => {
              flashcardArray = choice.message.content.split("\n");
              return (
                <>
                  <div className="wrapper">
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
                      onDoubleClick={() =>
                        handleDoubleClickFlashCards(i, index)
                      }
                    >
                      <div className="front">
                        <div className="content">
                          <h1
                            onDoubleClick={() =>
                              handleDoubleClickFlashCards(i, index)
                            }
                          >
                            {flashcardArray[index].split(":")[0]}
                          </h1>
                          {/* Additional content and styling as needed */}
                        </div>
                      </div>
                      <div className="back">
                        <div className="content">
                          <h1
                            onDoubleClick={() =>
                              handleDoubleClickFlashCards(i, index)
                            }
                          >
                            {flashcardArray[index].split(":")[1]}
                          </h1>
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
        {/* ------------Q & A------------------- */}
        {!fetching &&
          pathname === "/questions-answers" &&
          choices &&
          questionsAnswers.length > 0 && (
            <div>
              <div className="wrapper">
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
          )}
        {!fetching && choices !== null && choices.length > 0 && (
          <FileActions
            choices={choices}
            pathname={pathname}
            authorName={authorName}
            userId={userId}
            fileTitle={fileTitle}
          ></FileActions>
        )}
        {/* {choices !== null && choices.length > 0 && <SocialShare></SocialShare>} */}
      </div>
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
    </div>
  );
};

export default UploadButton;
const Spinner = () => <InfinitySpin width="200" color="#08979D" />;
