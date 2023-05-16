import { React, useState } from "react";
import { Link } from "react-router-dom";
import "../Course Objective Tab/CourseObjective.css";
import "./MediaContent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFileAudio, faPlay } from "@fortawesome/free-solid-svg-icons";
import InstructorCard from "../Video Card/InstructorCard";
import Module from "../Course Objective Tab/Module";


const tabs = [
  { id: 0, label: "Video" },
  { id: 1, label: "Document" },
  { id: 2, label: "Audio" },
];

const InstructorMedia = ({onEdit}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showModule, setShowModule] = useState(false);

  const [video, setVideo] = useState([
    { id: 0, title: "Project Video 1 " },
    { id: 1, title: "Project Video 2 " },
    { id: 2, title: "Project Video 3 " },
  ]);

  const [document, setDocument] = useState([
    { id: 0, title: "Project Document 1 " },
    { id: 1, title: "Project Document 2 " },
    { id: 2, title: "Project Document 3 " },
  ]);

  const [audio, setAudio] = useState([
    { id: 0, title: "Project Audio 1 " },
    { id: 1, title: "Project Audio 2 " },
    { id: 2, title: "Project Audio 3 " },
  ]);

  const handleDelete = (id) => {
    setVideo(video.filter((card) => card.id !== id));
  };
  const handleDocumentDelete = (id) => {
    setDocument(document.filter((card) => card.id !== id));
  };
  const handleAudioDelete = (id) => {
    setAudio(audio.filter((card) => card.id !== id));
  };
  const handleEdit = (id) => {
    console.log(`Editing card with id: ${id}`);
  };

  return (
    <>
      <div className="objective">
        <div className="objective-container">
          <div className="objectiveTab">
            {tabs.map((tab, index) => (
              <button
                key={tab.index}
                className={activeTab === tab.id ? "active" : ""}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {activeTab === 0 && (
            <>
              <div className="outlineCard-container">
                {video.map((card, index) => (
                  <Link to="#" style={{ textDecoration: "none" }}>
                    <InstructorCard
                      key={card.index}
                      
                      icon={
                        <FontAwesomeIcon
                          icon={faPlay}
                          style={{ color: "#000000" }}
                        />
                      }
                      title={card.title}
                      onDelete={() => handleDelete(card.id)}
                      setShowModule={setShowModule}
                    />
                  </Link>
                ))}
              </div>
              {showModule && 
             <Module setShowModule={setShowModule}/>}
            </>
          )}
          {activeTab === 1 && (
            <>
              <div className="outlineCard-container">
                {document.map((card, index) => (
                  <Link to="#" style={{ textDecoration: "none" }}>
                    <InstructorCard
                      key={card.index}
                      icon={
                        <FontAwesomeIcon
                          icon={faFile}
                          style={{ color: "#000000" }}
                        />
                      }
                      title={card.title}
                      onDelete={() => handleDocumentDelete(card.id)}
                      setShowModule={setShowModule}
                    />
                  </Link>
                ))}
              </div>
              {showModule && 
             <Module setShowModule={setShowModule}/>}
            </>
          )}
          {activeTab === 2 && (
            <>
              <div className="outlineCard-container">
                {audio.map((card, index) => (
                  <Link to="#" style={{ textDecoration: "none" }}>
                    <InstructorCard
                      key={card.id}
                      icon={
                        <FontAwesomeIcon
                          icon={faFileAudio}
                          style={{ color: "#000000" }}
                        />
                      }
                      title={card.title}
                      onDelete={() => handleAudioDelete(card.id)}
                      onEdit={() => handleEdit(card.id)}
                    />
                  </Link>
                ))}
              </div>
              {showModule && 
             <Module />}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default InstructorMedia;
