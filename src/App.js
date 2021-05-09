import React, { useEffect, useRef, useState } from "react";
import { PLAYBACK_SPEEDS } from "./constants";
import { MdShare } from "react-icons/md";
import { useSelector } from "react-redux";
import AudioPlayer from "./components/AudioPlayer";
import Transcript from "./components/Transcript";

function App() {
  const audio = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const { word_timings } = useSelector(
    (state) => state.audio?.transcriptData ?? {}
  );

  useEffect(() => {
    audio.current = new Audio("sample.wav");
  }, []);

  useEffect(() => {
    if (isPlaying) audio.current.play();
    else audio.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(audio.current.currentTime);
      if (audio.current.ended) setIsPlaying(false);
    }, 100);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    audio.current.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

  const handleAudioPlayerStatusChange = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleAudioJump = (dir) => {
    if (dir === "back") {
      audio.current.currentTime -= 10;
    } else {
      audio.current.currentTime += 10;
    }
  };

  const setPlayerPos = (wordData) => {
    audio.current.currentTime = +wordData.startTime.slice(0, -1);
    setIsPlaying(true);
  };

  const changePlaybackSpeed = () => {
    const id = PLAYBACK_SPEEDS.indexOf(playbackSpeed);
    setPlaybackSpeed(
      id + 1 > PLAYBACK_SPEEDS.length - 1
        ? PLAYBACK_SPEEDS[0]
        : PLAYBACK_SPEEDS[id + 1]
    );
  };

  const getBarPos = ({ startTime }) => {
    const totalLength = audio.current?.duration ?? 1;
    console.log(+startTime.slice(0, -1));
    return (+startTime.slice(0, -1) / totalLength) * 100;
  };

  return (
    <>
      <div className="flex p-6 w-100 bg-gray-100 justify-between">
        <AudioPlayer
          playbackSpeed={playbackSpeed}
          isPlaying={isPlaying}
          handleAudioJump={handleAudioJump}
          handleAudioPlayerStatusChange={handleAudioPlayerStatusChange}
          changePlaybackSpeed={changePlaybackSpeed}
        />
        <button className="px-4 py-2 rounded-md bg-white flex items-center">
          <MdShare className="mr-2" /> Share
        </button>
      </div>
      <div className="flex px-6 py-4 bg-gray-50 flex-col">
        <div className="bg-gray-100 py-1 px-2 rounded-sm text-xs mb-4">
          <span className="font-bold">
            {Math.floor(currentTime).toFixed(2)}{" "}
          </span>
          / {audio.current?.duration ?? "--"}
        </div>
        {/* {audio.current?.duration && (
          <div className="flex flex-col">
            <div className="flex">
              <div className="mr-4 font-bold w-60">54% You</div>
              <div className="flex">
                {word_timings[0].map((w, i) => (
                  <div
                    key={i}
                    className="h-8 w-1 bg-red-400"
                    style={{ marginLeft: `${getBarPos(w)}%` }}
                  ></div>
                ))}
              </div>
            </div>
            <div className="w-full h-1 bg-gray-300"></div>
            <div className="flex">
              <div className="mr-4 font-bold w-60">42% Micheal</div>
              <div className="flex">
                {word_timings[1].map((w, i) => (
                  <div
                    key={i}
                    className="h-8 w-1 bg-red-400"
                    style={{ marginLeft: `${getBarPos(w)}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        )} */}
      </div>
      <div className="flex px-6 py-4">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="py-2 px-4 border-gray-200 rounded-md border-solid border"
          placeholder="Search call transcript"
        ></input>
      </div>
      <div className="flex px-6 py-4 flex-col">
        <Transcript
          currentTime={currentTime}
          searchValue={searchValue}
          setPlayerPos={setPlayerPos}
          transcriptData={word_timings}
        />
      </div>
    </>
  );
}

export default App;
