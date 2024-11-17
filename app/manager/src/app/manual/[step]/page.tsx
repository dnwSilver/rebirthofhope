import DeepDiveManual from "@/components/manuals/01-deep-dive";
import { panel } from "@/styles/panel";

const ManualPage = async ({ params }) => {
  const { step } = params;

  return (
    <section
      style={{ ...panel, marginTop: "1rem", paddingBottom: "3rem", height: "calc(100vh - 7rem)", overflowY: "scroll" }}
    >
      {step === "deep-dive" && <DeepDiveManual />}
    </section>
  );
};

export default ManualPage;
