import DeepDiveManual from "@/components/manuals/01-deep-dive";
import ResearchManual from "@/components/manuals/02-research";
import { StepName } from "@/db/domain";
import { panel } from "@/styles/panel";

const ManualPage = async ({ params }: { params: Promise<{ step: StepName }> }) => {
  const { step } = await params;

  return (
    <section
      style={{ ...panel, marginTop: "1rem", paddingBottom: "3rem", height: "calc(100vh - 7rem)", overflowY: "scroll" }}
    >
      {step === "deep-dive" && <DeepDiveManual />}
      {step === "research" && <ResearchManual />}
    </section>
  );
};

export default ManualPage;
