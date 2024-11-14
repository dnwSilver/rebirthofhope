import { IStep } from "@/db/domain";
import Progress from "./progress";
import Timer from "./timer";
import { panel } from "@/styles/panel";

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
}: {
  position: number;
  country: string;
  name: string;
  start: Date;
  progress: IStep[];
}) => {
  return (
    <article style={panel}>
      <h4>
        {country} {getPosition(position)} <b>{name}</b>
      </h4>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ marginLeft: "2rem" }}>
          <Progress start={start} progress={progress} />
        </p>
        <p style={{ alignContent: "flex-end" }}>
          <Timer start={start} />
        </p>
      </div>
    </article>
  );
};

export default SaviorCard;
