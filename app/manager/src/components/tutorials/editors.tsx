"use client";

import { FC } from "react";
import Command from "../command";
import Example from "../example";

const EditorsTutorial: FC = () => {
  return (
    <>
      <h1>Текстовые редакторы</h1>
      <h2 id="vim">Vim</h2>
      <p>
        В рамках данной практики нам не нужен весь набор инструментов предоставленным <b>Vim</b>'ом. Нам хватит
        буквально пары функций.
      </p>
      <p>Открываем файл через команду:</p>
      <Command text="vim ~/rebirthofhope/environments/production-app/uix.yaml.gotmpl" />
      <p>
        Редактируем через <b>режим редактирования</b> (внезапно). Изначально в <b>Vim</b> включен <b>обычный режим</b>,
        он то и вызывает проблемы у людей.
      </p>
      <p>
        Для входа в режим редактирования нажмите <mark>i</mark> или <mark>a</mark>. Теперь можно спокойно вводить
        символы, удалять их как обычно.
      </p>
      <p>
        Для выхода из режима редактирования нажмите <mark>ESC</mark>.
      </p>
      <p>
        Сохранение происходит через команду. Для набора команд в <b>обычный режиме</b> надо нажать комбинацию клавиш{" "}
        <mark>SHIFT + ;</mark>. Команды:
        <ul>
          <li>
            <mark>wq</mark> сохранить и выйти (write, quit);
          </li>
          <li>
            <mark>!q</mark> выйти без сохранения.
          </li>
        </ul>
      </p>
      <Example theme="vim-edit" />
      <h2 id="nano">Nano</h2>
      <p>
        Если <b>Vim</b> победил, тогда используем <b>Nano</b>.
      </p>
      <p>Открываем файл через команду:</p>
      <Command text="nano ~/rebirthofhope/environments/production-app/uix.yaml.gotmpl" />
      <p>Правим сразу без всяких режимов 😉.</p>
      <p>
        Команды (полный список доступных можно найти внизу экрана):
        <ul>
          <li>
            <mark>CTRL + O</mark> сохранить;
          </li>
          <li>
            <mark>CTRL + X</mark> выйти.
          </li>
        </ul>
      </p>
      <br/>
      <Example theme="nano-edit" />
    </>
  );
};

export default EditorsTutorial;
