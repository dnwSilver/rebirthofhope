"use client";

import Example from "../example";

const K9sTutorial = () => {
  return (
    <>
      <h1>
        <img src="/k9s.png" width="32" height="20" /> k9s
      </h1>
      <h2>Основы</h2>
      <p>
        Команды в <b>k9s</b> можно вводить после нажатия символа <mark>SHIFT + ;</mark>.
      </p>
      <p>
        Фильтры в <b>k9s</b> можно вводить после нажатия символа <mark>/</mark>.
      </p>
      <p>
        Для применения команды или фильтра используем <mark>ENTER</mark>.
      </p>
      <p>
        Для отмены команды или фильтра используем <mark>ESC</mark>.
      </p>

      <h2 id="namespace">Namespace</h2>
      <p>
        В кубах сервисы живут в <b>namespace</b>'ах. Проверить перечень <b>Namespace</b>'ов можно использовав команду{" "}
        <mark>namespace</mark>/<mark>ns</mark>.
      </p>
      <Example theme="k9s-namespace" />
      <h2>Deployment</h2>
      <p>
        Представление приложения в кластере. Собственно конфиг, который мы собираем, и является <b>deployment</b>'ом.
      </p>
      <p>
        В первую очередь нас волнуют его настройки. Добраться до них можно через команду <mark>deploy</mark> и hotkey{" "}
        <mark>d</mark>
      </p>
      <Example theme="k9s-deploy" />
      <h2 id="ingress">Ingress</h2>
      <p>
        Список <b>ingress</b>'ов доступен по команде <mark>ingress</mark>/<mark>ing</mark>.
      </p>
      <Example theme="k9s-ingress-solo" />
      <h2 id="logs">Logs</h2>
      <p>
        Для просмотра логов нужно зайти в <b>POD</b> и использовать горячую клавишу <mark>L</mark>. Доступные фильтры по
        времени:
        <ul>
          <li>
            <p>
              hotkey <mark>0</mark> - Окончание файлов с логами
            </p>
          </li>
          <li>
            <p>
              hotkey <mark>1</mark> - Начало файла с логами
            </p>
          </li>
          <li>
            <p>
              hotkey <mark>2</mark> - 1 минута
            </p>
          </li>
          <li>
            <p>
              hotkey <mark>3</mark> - 5 минута
            </p>
          </li>
          <li>
            <p>
              hotkey <mark>4</mark> - 15 минута
            </p>
          </li>
          <li>
            <p>
              hotkey <mark>5</mark> - 30 минута
            </p>
          </li>
          <li>
            <p>
              hotkey <mark>6</mark> - 60 минута
            </p>
          </li>
        </ul>
      </p>
      <Example theme="k9s-logs" />
      <h2>POD</h2>
      <Example theme="k9s-pods" />
    </>
  );
};

export default K9sTutorial;
