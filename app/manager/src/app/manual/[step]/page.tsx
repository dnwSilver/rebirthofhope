import DeepDiveManual from "@/components/manuals/01-deep-dive";
import ResearchManual from "@/components/manuals/02-research";
import NeedMoreGoldManual from "@/components/manuals/03-need-more-gold";
import SortWheatFromChaffManual from "@/components/manuals/04-sort-wheat-from-chaff";
import SecretMaterialManual from "@/components/manuals/05-secret-materials";
import AttackOfTheClonesManual from "@/components/manuals/06-attack-of-the-clones";
import { StepName } from "@/db/domain";
import { panel } from "@/styles/panel";

const ManualPage = async ({ params }: { params: Promise<{ step: StepName }> }) => {
  const { step } = await params;

  return (
    <section
      style={{ ...panel, marginTop: "1rem", paddingBottom: "3rem", height: "calc(100vh - 4rem)", overflowY: "scroll" }}
    >
      {step === "deep-dive" && <DeepDiveManual />}
      {step === "research" && <ResearchManual />}
      {step === "need-more-gold" && <NeedMoreGoldManual />}
      {step === "sort-wheat-from-chaff" && <SortWheatFromChaffManual />}
      {step === "secret-materials" && <SecretMaterialManual />}
      {step === "attack-of-the-clones" && <AttackOfTheClonesManual />}
    </section>
  );
};

export default ManualPage;
