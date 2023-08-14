import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "./viewProjectStyle.css";

export default function ViewProject() {
  const location = useLocation();
  const initialSlidesList = location.state;
  const [currSlideId, setCurrSlideId] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(initialSlidesList[currSlideId-1].frames)
    const enterFullScreen = () => {
      const element = document.documentElement;

      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    };

    const handleKeyPress = (event) => {
      if (event.key === "ArrowLeft") {
        if (currSlideId > 1) {
          setCurrSlideId(currSlideId - 1);
        } 
      } else if (event.key === "ArrowRight") {
        if (currSlideId < initialSlidesList.length) {
          setCurrSlideId(currSlideId + 1);
        } 
      }
    };

    enterFullScreen();
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [currSlideId, initialSlidesList.length]);

  useEffect(() => {
    const handleExitFullScreen = () => {
      if (!document.fullscreenElement && document.exitFullscreen) {
        navigate(-1, { replace: true });
      }
    };

    document.addEventListener("fullscreenchange", handleExitFullScreen);

    return () => {
      document.removeEventListener("fullscreenchange", handleExitFullScreen);
    };
  }, [navigate]);

  return (
    <>
      <div
        className="viewSlide"
        style={{
          background: initialSlidesList[currSlideId - 1].background,
          transform: `scale(${window.innerWidth / 960})`,
          transformOrigin: "0% 0%",
        }}
      >
        {initialSlidesList[currSlideId - 1].frames.map((frame) => {
          if (frame.type === 1 && frame.content!==null) {
            return (
              <div
                className="frameImg"
                style={{
                  left: frame.x,
                  top: frame.y,
                  width: frame.width,
                  height: frame.height,
                }}
              >
                <ReactQuill
                  readOnly
                  value={frame.content}
                  modules={{ toolbar: false }}
                />
              </div>
            );
          }

          return (
            <div
              className="frameImg"
              style={{
                left: frame.x,
                top: frame.y,
                width: frame.width,
                height: frame.height,
                backgroundImage: `url(${frame.content})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          );
        })}
      </div>
    </>
  );
}
