const Transcript = ({
  transcriptData,
  currentTime,
  searchValue,
  setPlayerPos,
}) => {
  const getConversationSnippetDuration = (timingData) => {
    return timingData[0]?.startTime ?? "-";
  };

  const isCurrentPlaying = ({ startTime, endTime }) => {
    const st = +startTime.slice(0, -1);
    const et = +endTime.slice(0, -1);
    if (currentTime < et && currentTime >= st) return true;
    return false;
  };

  const isMatchingSearch = ({ word }) => {
    return (
      !!searchValue && word.toLowerCase().includes(searchValue.toLowerCase())
    );
  };
  return (
    <>
      {transcriptData.map((timingData, i) => (
        <div
          style={{ marginLeft: i % 2 === 0 ? "0px" : "64px" }}
          className="flex"
        >
          <span
            style={{
              color: `${i % 2 === 0 ? "blue" : "red"}`,
            }}
            className="mr-4"
          >
            {getConversationSnippetDuration(timingData)}
          </span>
          <div
            key={i}
            className="mb-12 pl-2"
            style={{
              borderLeft: `4px solid ${i % 2 === 0 ? "blue" : "red"}`,
            }}
          >
            {timingData.map((wordData, j) => (
              <span
                className={`cursor-pointer 
              ${isCurrentPlaying(wordData) ? "bg-blue-400 " : "bg-none "} ${
                  isMatchingSearch(wordData) ? "bg-green-300" : "bg-none"
                }`}
                onClick={() => setPlayerPos(wordData)}
                key={j}
              >
                {" "}
                {wordData.word}
              </span>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Transcript;
