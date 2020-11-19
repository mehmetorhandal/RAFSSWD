import React, { useEffect, useState, useCallback } from "react";
import { useScore } from "../context/ScoreContext";
import {
  StyledGame,
  StyledScore,
  StyledTimer,
  StyledCharacter,
} from "../styled/Game";
import { Strong } from "../styled/Random";

export default function Game({ history }) {
  const MAX_SECONDS = 5;
  const characters = "abcdefghijklmnoprstuvwxyz0123456789";
  const [currentCharacter, setCurrentCharacter] = useState("");
  const [score, setScore] = useScore();
  const [ms, setMs] = useState(0);
  const [seconds, setSeconds] = useState(MAX_SECONDS);

  useEffect(() => {
    setRandomCharacter();
    setScore(0);
    const currentTime = new Date();
    const interval = setInterval(() => updateTime(currentTime), 1);
    return () => clearInterval(interval);
  }, []);

  const updateTime = (startTime) => {
    const endTime = new Date();
    const msPassedStr = (endTime.getTime() - startTime.getTime()).toString();
    const formattedMsStr = ("0000" + msPassedStr).slice(-5);
    //00000 - first 2 are the seconds, last 3 are the ms that have passed
    const updatedSeconds =
      MAX_SECONDS - parseInt(formattedMsStr.substring(0, 2)) - 1;
    const updatedMs =
      1000 - parseInt(formattedMsStr.substring(formattedMsStr.length - 3));
    setSeconds(addLeadingZeros(updatedSeconds, 2));
    setMs(addLeadingZeros(updatedMs, 3));
  };

  useEffect(() => {
    if (seconds <= -1) {
      //To do: save the score
      history.push("/gameOver");
    }
  }, [seconds, ms, history]);

  const keyUpHandler = useCallback(
    (e) => {
      console.log(e.key, currentCharacter);
      if (e.key == currentCharacter) {
        setScore((prevScore) => prevScore + 1);
      } else {
        if (score > 0) {
          setScore((prevScore) => prevScore - 1);
        }
      }
      setRandomCharacter();
    },
    [currentCharacter]
  );

  useEffect(() => {
    document.addEventListener("keyup", keyUpHandler);
    return () => {
      document.removeEventListener("keyup", keyUpHandler);
    };
  }, [keyUpHandler]);

  const addLeadingZeros = (num, length) => {
    let zeros = "";
    for (let i = 0; i < length; i++) {
      zeros += "0";
    }
    return (zeros + num).slice(-length);
  };

  const setRandomCharacter = () => {
    const randomInt = Math.floor(Math.random() * 36);
    setCurrentCharacter(characters[randomInt]);
  };

  return (
    <StyledGame>
      <StyledScore>
        Score:<Strong>{score}</Strong>
      </StyledScore>
      <StyledCharacter>{currentCharacter}</StyledCharacter>
      <StyledTimer>
        Time:
        <Strong>
          {seconds}:{ms}
        </Strong>
      </StyledTimer>
    </StyledGame>
  );
}
