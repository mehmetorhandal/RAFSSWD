import React from "react";
import {
  StyledGame,
  StyledScore,
  StyledTimer,
  StyledCharacter,
} from "../styled/Game";
import { Strong } from "../styled/Random";

export default function Game() {
  return (
    <StyledGame>
      <StyledScore>
        Score:<Strong>0</Strong>
      </StyledScore>
      <StyledCharacter>A</StyledCharacter>
      <StyledTimer>
        Time:<Strong>02.03</Strong>
      </StyledTimer>
    </StyledGame>
  );
}
