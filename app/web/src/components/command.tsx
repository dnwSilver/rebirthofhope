import { CopyBlock, dracula } from "react-code-blocks";

const Command = ({ text }: { text: string }) => {
  if (typeof window === "undefined") {
    return false;
  }

  return <CopyBlock showLineNumbers theme={dracula} codeBlock language={"bash"} text={text} />;
};

export default Command;
