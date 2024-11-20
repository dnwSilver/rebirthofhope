import { FC, PropsWithChildren } from "react";

const Helper: FC<PropsWithChildren> = ({ children }) => (
  <details>
    <summary>Подсказка</summary>
    {children}
  </details>
);

export default Helper;
