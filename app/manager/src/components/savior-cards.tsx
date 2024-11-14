import { ISavior } from "@/db/domain";
import SaviorCard from "@/components/savior-card";

const SaviorCards = ({ saviors }: { saviors: ISavior[] }) => {
  if (saviors.length === 0) {
    return <p style={{ color: "whitesmoke" }}>Никто не хочет спасать этот мир.</p>;
  }

  return (
    <section style={{ height: "calc(100vh - 2rem)", overflow: "scroll", margin: "1rem" }}>
      {saviors.map((savior, idx) => (
        <SaviorCard
          key={savior.name}
          start={savior.joining}
          position={idx + 1}
          name={savior.name}
          country={savior.country}
          progress={savior.progress}
        />
      ))}
    </section>
  );
};

export default SaviorCards;
