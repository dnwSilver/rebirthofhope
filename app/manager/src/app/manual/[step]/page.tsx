import DeepDiveManual from "@/components/manuals/01-deep-dive";
import { panel } from "@/styles/panel";

const ManualPage = async ({ params }) => {
  const { step } = params;

  return <section style={{ ...panel, marginTop: "1rem" }}>{step === "deep-dive" && <DeepDiveManual />}</section>;
};

export default ManualPage;
