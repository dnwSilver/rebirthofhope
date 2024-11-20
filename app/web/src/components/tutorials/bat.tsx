"use client";

import { FC } from "react";
import Command from "../command";

const BatTutorial: FC = () => (
  <>
    <h1>bat</h1>
    <h2 id="#read">Просмотр файлов</h2>
    Данное ПО помогает нам удобно просматривать файлы в терминале. Не всегда нам требуется редактирование.
    <Command text="bat ~/rebirthofhope/environments/production-app/api.yaml.gotmpl" />
    {/* TODO ТУТ БУДЕТ GIF */}
  </>
);

export default BatTutorial;
