import BatTutorial from "@/components/tutorials/bat";
import EditorsTutorial from "@/components/tutorials/editors";
import GitTutorial from "@/components/tutorials/git";
import Helmfile from "@/components/tutorials/helmfile";
import HttpieTutorial from "@/components/tutorials/httpie";
import K9sTutorial from "@/components/tutorials/k9s";
import { Tutorial } from "@/components/tutorials/tutorial";
import { panel } from "@/styles/panel";

const ManualPage = async ({ params }: { params: Promise<{ theme: Tutorial }> }) => {
  const { theme } = await params;

  return (
    <section
      style={{ ...panel, marginTop: "1rem", paddingBottom: "3rem", height: "calc(100vh - 7rem)", overflowY: "scroll" }}
    >
      {theme === "k9s" && <K9sTutorial />}
      {theme === "git" && <GitTutorial />}
      {theme === "editors" && <EditorsTutorial />}
      {theme === "helmfile" && <Helmfile />}
      {theme === "httpie" && <HttpieTutorial />}
      {theme === "bat" && <BatTutorial />}
    </section>
  );
};

export default ManualPage;
