"use client";
import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import CardMedia from "@mui/material/CardMedia";
import ShareIcon from "@mui/icons-material/Share";
import { InfinitySpin } from "react-loader-spinner";
import SocialShare from "../../components/SocialShare";
import CloseIcon from "@mui/icons-material/Close";
import LaunchIcon from "@mui/icons-material/Launch";
import "app/dashboard/dashboard.css";

const Dashboard = () => {
  const [userData, setUserData] = useState("");
  const { data: session } = useSession();
  const [mindmaps, setMindmaps] = useState([]);
  const [flashCards, setFlashCards] = useState([]);
  const [summaries, setSammaries] = useState([]);
  const [fynmanFiles, setFynmanFiles] = useState([]);
  const [QAs, setQAs] = useState([]);
  const [files, setFiles] = useState([]);
  const [requiredData, setRequiredData] = useState([]);
  const [loaded, setloaded] = useState(false);
  const [cardMedia, setCardMedia] = useState("");
  const [deleteType, setDeleteType] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState("");
  const [arraysLoaded, setArraysLoadded] = useState(false);
  const userId = session?.user.id;
  const accessToken = session?.user.accessToken;

  const [currentMaterial, setCurrentCurrentMaterial] = useState("Files");
  console.log("++++++++++++++++++++++++++");
  console.log(userId);
  console.log(accessToken);
  console.log("++++++++++++++++++++++++++");

  useEffect(() => {
    if (userId) {
      fetchData();
    }
    if (loaded) {
      setArrays();
    }
    if (arraysLoaded) {
      getMindmaps();
    }
  }, [loaded, userId, arraysLoaded]);

  const fetchData = async () => {
    try {
      if (session?.user.id) {
        const response = await fetch(`/api/user/${userId}`, {
          method: "GET",
          headers: {
            authorization: accessToken,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setloaded(true);
        } else if (response.status === 401) {
          window.location.href = "/sign-in";
        } else {
          throw new Error("Failed to fetch user data");
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const setArrays = () => {
    if (userData) {
      console.log(userData);
      const { Mindmaps, FlashCards, Sammaries, FynmanFiles, QAs, files } =
        userData;

      console.log("=================================");
      console.log(Mindmaps, FlashCards, Sammaries, FynmanFiles, QAs, files);
      console.log("=================================");

      setMindmaps(Mindmaps);
      setFlashCards(FlashCards);
      setSammaries(Sammaries);
      setFynmanFiles(FynmanFiles);
      setQAs(QAs);
      setFiles(files);
      setArraysLoadded(true);
    }
  };

  const getMindmaps = () => {
    setRequiredData(mindmaps);
    setCardMedia("/assets/images/mindMap2.png");
    setDeleteType("mindmaps");
    setCurrentCurrentMaterial("Mind map Files");
  };

  const getFlashCards = () => {
    setRequiredData(flashCards);
    setCardMedia("/assets/images/flashCards.png");
    setDeleteType("flashCards");
    setCurrentCurrentMaterial("Flash Cards Files");
  };
  const getSummaries = () => {
    setRequiredData(summaries);
    setCardMedia("/assets/images/textSummarization.png");
    setDeleteType("summaries");
    setCurrentCurrentMaterial("Summary Files");
  };
  const getfynmanFiles = () => {
    setRequiredData(fynmanFiles);
    setCardMedia("/assets/images/feymanTechnique.png");
    setDeleteType("learningTechniques");
    setCurrentCurrentMaterial("Feynman Files");
  };
  const getQAs = () => {
    setRequiredData(QAs);
    setCardMedia("/assets/images/extractingQuestions.png");
    setDeleteType("questionsAnswers");
    setCurrentCurrentMaterial("Q&A Files");
  };
  const getFiles = () => {
    setRequiredData(files);
    setDeleteType("files");
  };

  const handleDelete = async (id, index) => {
    await deleteItem(id);
    const updatedData = [...requiredData];
    updatedData.splice(index, 1);
    setRequiredData(updatedData);
  };

  const deleteItem = async (id) => {
    const response = await fetch("/api/deleteMaterial", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: deleteType,
        id: id,
      }),
    });
  };

  const handleShareClick = (index) => {
    setCurrentIndex(index);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div>
      <div class="app">
        <header class="app-header">
          <div class="app-header-logo">
            <div class="logo">
              <span class="logo-icon">
                <img src="/assets/images/logo.png" />
              </span>
              <h1 class="logo-title">
                <span>ReWisely</span>
              </h1>
            </div>
          </div>
          <div class="app-header-navigation">
            <div class="tabs">
              <a href="#">My {currentMaterial}</a>
            </div>
          </div>
        </header>
        <div class="app-body">
          <div class="app-body-navigation">
            <nav class="navigation">
              <a href="#">
                <i class="ph-browsers"></i>
                <span>My Profile</span>
              </a>
              <a href="#">
                <i class="ph-check-square"></i>
                <span onClick={getMindmaps}>
                  <Link href="/mind-map">
                    {/*  <ListItemAvatar>
                  <Avatar src="/assets/images/mindMap2.png" alt="My Mindmaps" />
                </ListItemAvatar> */}
                  </Link>
                  Mindmaps
                </span>
              </a>
              <a href="#">
                <i class="ph-swap"></i>
                <span onClick={getFlashCards}>
                  <Link href="/flash-cards">
                    {/* <ListItemAvatar><Avatar src="/assets/images/flashCards.png" alt="My Flash Cards Image"/></ListItemAvatar> */}
                  </Link>
                  Flashcards
                </span>
              </a>
              <a href="#">
                <i class="ph-file-text"></i>
                <span onClick={getSummaries}>
                  <Link href="/text-summary">
                    {/* <ListItemAvatar> <Avatar src="/assets/images/textSummarization.png" alt="My Summaries Image" /></ListItemAvatar> */}{" "}
                  </Link>
                  Summaries
                </span>
              </a>
              <a href="#">
                <i class="ph-globe"></i>
                <span onClick={getfynmanFiles}>
                  <Link href="/learning-technique">
                    {/*   <ListItemAvatar>
                  <Avatar
                    src="/assets/images/feymanTechnique.png"
                    alt="My Feynman files Image"
                  />
                </ListItemAvatar> */}
                  </Link>
                  Learning Techniqes
                </span>
              </a>
              <a href="#">
                <i class="ph-clipboard-text"></i>
                <span onClick={getQAs}>
                  <Link href="/questions-answers">
                    {/*   <ListItemAvatar>
                  <Avatar
                    src="/assets/images/extractingQuestions.png"
                    alt="My Questions and Answers Image"
                  />
                </ListItemAvatar> */}
                  </Link>
                  Q & A
                </span>
              </a>
            </nav>
          </div>

          <div class="app-body-main-content">
            <div className="flex flex-wrap justify-center">
              {requiredData.map((item, index) => (
                <div
                  key={index}
                  className="m-2 border border-green-500 rounded-md"
                >
                  <Card>
                    <CardContent>
                      <img
                        src="/assets/images/file.png"
                        alt=""
                        className="cardImg"
                      />
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                        {/* :{item.id} */}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <div className="flex gap-2">
                        <div>
                          <DeleteIcon
                            style={{ color: "rgb(255, 123, 0)" }}
                            onClick={() => {
                              handleDelete(item.id, index);
                            }}
                          />
                        </div>
                        <div>
                          <ShareIcon
                            style={{ color: "rgb(255, 123, 0)" }}
                            onClick={() => {
                              handleShareClick(index);
                            }}
                          />
                        </div>
                        <div>
                          <Link href={`/${userId}/${deleteType}/${item.id}`}>
                            <LaunchIcon style={{ color: "rgb(255, 123, 0)" }} />
                          </Link>
                        </div>
                      </div>

                      {popupOpen && currentIndex === index && (
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                          <div className="bg-white p-4 rounded-lg shadow-lg flex flex-row items-center">
                            <SocialShare
                              user={userId}
                              type={deleteType}
                              id={item.id}
                            />
                            <button onClick={handleClosePopup}>
                              <CloseIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </CardActions>
                  </Card>
                </div>
              ))}
            </div>
            {/*     <div className="fixed top-1/2 left-0 transform -translate-y-1/2 flex flex-col items-center justify-center gap-4 p-4 bg-white shadow-md rounded-md border border-green-900">
        <div className="flex-none w-64 bg-gray-100 rounded-l-lg overflow-y-auto ">
          <List
            sx={{ width: "100%", bgcolor: "background.paper" }}
            className="p-4"
          >
            <ListItem alignItems="flex-start" onClick={getMindmaps}>
              <Link href="/mind-map">
                <ListItemAvatar>
                  <Avatar src="/assets/images/mindMap2.png" alt="My Mindmaps" />
                </ListItemAvatar>
              </Link>
              <ListItemText primary="My Mindmaps" />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start" onClick={getFlashCards}>
              <Link href="/flash-cards">
                <ListItemAvatar>
                  <Avatar
                    src="/assets/images/flashCards.png"
                    alt="My Flash Cards Image"
                  />
                </ListItemAvatar>
              </Link>
              <ListItemText primary="My Flash Cards" />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start" onClick={getSummaries}>
              <Link href="/text-summary">
                <ListItemAvatar>
                  <Avatar
                    src="/assets/images/textSummarization.png"
                    alt="My Summaries Image"
                  />
                </ListItemAvatar>
              </Link>
              <ListItemText primary="My Summaries" />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start" onClick={getfynmanFiles}>
              <Link href="/learning-technique">
                <ListItemAvatar>
                  <Avatar
                    src="/assets/images/feymanTechnique.png"
                    alt="My Feynman files Image"
                  />
                </ListItemAvatar>
              </Link>
              <ListItemText primary="My Feynman Files" />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start" onClick={getQAs}>
              <Link href="/questions-answers">
                <ListItemAvatar>
                  <Avatar
                    src="/assets/images/extractingQuestions.png"
                    alt="My Questions and Answers Image"
                  />
                </ListItemAvatar>
              </Link>
              <ListItemText primary="My Questions and Answers" />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </div>
        <div className="flex-grow bg-white rounded-r-lg overflow-y-auto">
        </div>
      </div> */}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
              }}
            >
              {!userData && <Spinner />}
            </div>
          </div>

          {/* 		<div class="app-body-main-content">
			<section class="service-section">
				<div class="tiles">
					<article class="tile">
						<div class="tile-header">
							<i class="ph-lightning-light"></i>
							<h3>
								<span>Electricity</span>
								<span>UrkEnergo LTD.</span>
							</h3>
						</div>
						<a href="#">
							<span>Go to service</span>
							<span class="icon-button">
								<i class="ph-caret-right-bold"></i>
							</span>
						</a>
					</article>
					<article class="tile">
						<div class="tile-header">
							<i class="ph-fire-simple-light"></i>
							<h3>
								<span>Heating Gas</span>
								<span>Gazprom UA</span>
							</h3>
						</div>
						<a href="#">
							<span>Go to service</span>
							<span class="icon-button">
								<i class="ph-caret-right-bold"></i>
							</span>
						</a>
					</article>
					<article class="tile">
						<div class="tile-header">
							<i class="ph-file-light"></i>
							<h3>
								<span>Tax online</span>
								<span>Kharkov 62 str.</span>
							</h3>
						</div>
						<a href="#">
							<span>Go to service</span>
							<span class="icon-button">
								<i class="ph-caret-right-bold"></i>
							</span>
						</a>
					</article>
				</div>
				<div class="service-section-footer">
					<p>Services are paid according to the current state of the currency and tariff.</p>
				</div>
			</section>

		</div> */}
          {/* 		<div class="app-body-sidebar">

		</div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
const Spinner = () => <InfinitySpin width="200" color="#777" />;
