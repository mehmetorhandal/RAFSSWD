import React from "react";
import CTA from "../styled/CTA";
import { Accent, StlyedTitle } from "../styled/Random";

export default function Home() {
  return (
    <div>
      <StlyedTitle>Ready to type?</StlyedTitle>
      <CTA to="/game">
        Click or type <Accent>'s'</Accent> to start playing
      </CTA>
    </div>
  );
}
