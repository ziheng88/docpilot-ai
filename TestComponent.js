import { Button } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import SpeakTTS from "speak-tts";
import { splitSentences } from "speak-tts/lib/utils";


const TestComponent2 = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();


  return (
    <>
      <div>Browser Support: {String(browserSupportsSpeechRecognition)}</div>
      <div>Microphone Available: {String(isMicrophoneAvailable)}</div>
      <div>Transcript: {String(transcript)}</div>
      <div>Listening: {String(listening)}</div>
      <Button
        onClick={() => {
          SpeechRecognition.startListening();
        }}
      >
        Start Recording
      </Button>
      <Button
        onClick={() => {
          SpeechRecognition.stopListening();
        }}
      >
        Stop Recording
      </Button>
      <Button
        onClick={() => {
          resetTranscript();
        }}
      >
        Reset Transcript
      </Button>
    </>
  );
};


const speech = new SpeakTTS();
speech
  .init({
    volume: 1,
    lang: "en-US",
    rate: 1,
    pitch: 1,
    voice: "Google US English",
    splitSentences: true,
  })
  .then((data) => {
    console.log("data: ", data);
  });


const TestComponent = () => {
  const [textValue, setTextValue] = useState();
  const handlePlay = () => {
    speech.speak({
      text: textValue,
      queue: false,
      listeners: {
        onstart: () => {
          console.log("start");
        },
        onend: () => {
          console.log("end");
        },
      },
    });
  };


  return (
    <Search
      enterButton="Play"
      size="large"
      onSearch={handlePlay}
      value={textValue} // Control the value
      onChange={(e) => setTextValue(e.target.value)} // Update the value when changed
    />
  );
};


export default TestComponent;
