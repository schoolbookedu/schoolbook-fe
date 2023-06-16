import { React, useState } from "react";
import { Link } from "react-router-dom";
import VideoCard from "../Video Card/VideoCard";
import "../Course Objective Tab/CourseObjective.css";
import "./MediaContent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFileAudio, faPlay } from "@fortawesome/free-solid-svg-icons";
import audio from '../../utils/audio.png'
import banner from '../../utils/banner.png'

const tabs = [
  { id: 0, label: "Video" },
  { id: 1, label: "Document" },
  { id: 2, label: "Audio" },
];

const videoLink = [
  { id: 0, title: "Project Video 1 " },
  { id: 1, title: "Project Video 2 " },
  { id: 2, title: "Project Video 3 " },
];

const DocumentLink = [
  { id: 0, title: "Project Document 1 " },
  { id: 1, title: "Project Document 2 " },
  { id: 2, title: "Project Document 3 " },
];

const AudioLink = [
  { id: 0, title: "Project Audio 1 " },
  { id: 1, title: "Project Audio 2 " },
  { id: 2, title: "Project Audio 3 " },
];

const MediaContent = ({cards}) => {
  const [activeTab, setActiveTab] = useState(0);
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
              <div className="mediaaudio">
              <img src={banner} alt="audiobanner" />
            </div>
            <div className="outlineCardList">
              {videoLink.map((cards, index) => (
                <Link to="#" style={{ textDecoration: "none" }}>
                  <VideoCard
                    key={cards.index}
                    icon={
                      <FontAwesomeIcon
                        icon={faPlay}
                        style={{ color: "#000000" }}
                      />
                    }
                    title={cards.title}
                  />
                </Link>
              ))}
            </div>
            </>
          )}
          {activeTab === 1 && (
            <>
            <div className="mediadocument">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.Ut et
                  massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                  sapien fringilla, mattis ligula consectetur, ultrices mauris.
                  Maecenas vitae mattis tellus. Nullam quis imperdiet augue.
                  Vestibulum auctor ornare leo, non suscipit magna interdum eu.
                  Curabitur pellentesque nibh nibh, at maximus ante fermentum
                  sit amet. Pellentesque commodo lacus at sodales sodales.
                  Quisque sagittis orci ut diam condimentum,vel euismod erat
                  placerat. In iaculis arcu eros, eget tempus orci facilisis
                  id.
                </p>
              </div>
              <div className="outlineCardList">
              {DocumentLink.map((card, index) => (
                <Link to="#" style={{ textDecoration: "none" }}>
                  <VideoCard
                    key={card.index}
                    icon={
                      <FontAwesomeIcon
                        icon={faFile}
                        style={{ color: "#000000" }}
                      />
                    }
                    title={card.title}
                  />
                </Link>
              ))}
            </div>
            </>
          
          )}
          {activeTab === 2 && (
            <>
            <div className="mediaaudio">
              <img src={audio} alt="audiobanner" />
            </div>
            <div className="outlineCardList">
              {AudioLink.map((card, index) => (
                <Link to="#" style={{ textDecoration: "none" }}>
                  <VideoCard
                    key={card.id}
                    icon={
                      <FontAwesomeIcon
                        icon={faFileAudio}
                        style={{ color: "#000000" }}
                      />
                    }
                    title={card.title}
                  />
                </Link>
              ))}
            </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MediaContent;
