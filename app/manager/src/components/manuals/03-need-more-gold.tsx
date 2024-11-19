"use client";

import Tutorial from "../tutorials/tutorial";
import Command from "../command";
import Manual from "./manual";
import Helper from "../helper";
import DeployHint from "../deploy-hint";
import CommitHint from "../commit-hint";
import Example from "../example";

const NeedMoreGoldManual = () => {
  return (
    <Manual stepName={"need-more-gold"} title={"💰 Нужно больше золота"} error={"Ресурсы так и не зарезервированы..."}>
      <h2>Что имеем?</h2>
      <p>
        Ходит легенда, о минимальных требованиях к ресурсам у <b>API</b> и <b>UIX</b>. Их создатели заявляли следующее:
        <ul>
          <li>
            <b>UIX</b> требует <mark>32Mi RAM</mark> <mark>10m CPU</mark>
          </li>
          <li>
            <b>API</b> требует <mark>8Mi RAM</mark> <mark>10m CPU</mark>
          </li>
        </ul>
        Теперь ты знаешь требования.
      </p>
      <p>
        Текущие запросы можешь найти в репозитории в файлах <mark>/charts/uix/values.yaml</mark> и{" "}
        <mark>/charts/api/values.yaml</mark> неплохо было бы их{" "}
        <Tutorial theme={"bat"} chapter={"read"}>
          прочитать
        </Tutorial>
        .
      </p>
      <Helper>
        <Command text="bat ~/rebirthofhope/charts/api/values.yaml" />
        <br />
        <Command text="bat ~/rebirthofhope/charts/uix/values.yaml" />
      </Helper>
      <p>
        Определённо <b>API</b> явно обделили.
      </p>
      <h2>Конфигурирование ресурсов</h2>
      <p>Самое время внести первые правки в конфигурацию.</p>
      <p>
        <Tutorial theme="editors" chapter="vim">
          Внеси правки
        </Tutorial>{" "}
        в файл <mark>environments/production-app/api.yaml.gotmpl</mark>.
      </p>
      <p>
        Правки нужно вставить в новый раздел resources, расширим память для <b>API</b> до <mark>8Mi</mark>.
      </p>
      <Command
        text={`resources:
  limits:
    memory: 8Mi`}
      />
      <br />
      <Example theme="vim-edit" />
      <br />
      <DeployHint />

      <h2>Публикация приложений</h2>
      <p>
        После обновления находим наш{" "}
        <Tutorial theme="k9s" chapter="namespace">
          namespace
        </Tutorial>{" "}
        в k9s. Похоже что это помогло <b>API</b>🩹.
      </p>
      <Example theme="k9s-pods" />
      <br />
      <CommitHint action="Отправляем" result="нашу победу" />
    </Manual>
  );
};

export default NeedMoreGoldManual;
