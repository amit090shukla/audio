import GoBackSvg from "./svg-comp/GoBackSvg";
import PauseAudioSvg from "./svg-comp/PauseAudioSvg";
import PlayAudioSvg from "./svg-comp/PlayAudioSvg";
import GoForwardSvg from "./svg-comp/GoForwardSvg";

const AudioPlayer = ({
  isPlaying,
  handleAudioJump,
  handleAudioPlayerStatusChange,
  changePlaybackSpeed,
  playbackSpeed,
}) => {
  return (
    <div className="flex items-center">
      <div className="flex justify-center items-center">
        <GoBackSvg onClick={() => handleAudioJump("back")} />
        <div onClick={handleAudioPlayerStatusChange} className="mx-6">
          {isPlaying ? <PauseAudioSvg /> : <PlayAudioSvg />}
        </div>
        <GoForwardSvg onClick={() => handleAudioJump("ahead")} />
      </div>
      <div
        className="ml-10 rounded-full bg-white px-4 py-0 cursor-pointer"
        onClick={changePlaybackSpeed}
      >
        {playbackSpeed}x
      </div>
    </div>
  );
};

export default AudioPlayer;
