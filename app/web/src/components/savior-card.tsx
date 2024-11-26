import { IStep } from "@/db/domain";
import Progress from "./progress";
import Timer from "./timer";
import { panel } from "@/styles/panel";
import { getCookie } from "@/helpers/cookies";

const getPosition = (position: number) => {
  if (position == 1) {
    return "🥇";
  }
  if (position == 2) {
    return "🥈";
  }
  if (position == 3) {
    return "🥉";
  }
  return position.toString().padStart(3, " ");
};

const SaviorCard = ({
  position,
  country,
  name,
  progress,
  start,
  score,
}: {
  position?: number;
  country: string;
  name: string;
  start: Date;
  progress: IStep[];
  score?: number | null;
}) => {
  const currentName = decodeURIComponent(getCookie("name") || "");

  return (
    <article style={{ ...panel, minWidth: "310px", backgroundColor: currentName === name ? "#ADD8E6" : panel.background }}>
      <h4>
        {country} {position && getPosition(position) + " "}
        <b>{name}</b>
      </h4>
      {score && <span style={{ position: "absolute", right: "0.2rem", top: "0rem" }}>🎬</span>}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>
          <Progress start={start} progress={progress} />
        </p>
        <p style={{ alignContent: "flex-end" }}>
          {!!score && new Date(score).toISOString().slice(11, 19)}
          {!score && <Timer start={start} />}
        </p>
      </div>
    </article>
  );
};

export default SaviorCard;
