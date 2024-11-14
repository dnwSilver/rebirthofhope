import { getCookie } from "@/helpers/cookies";
import { panel } from "@/styles/panel";

const EntryPoint = () => {
  const call = getCookie("call");

  return (
    <section style={panel}>
      Мы рады что ты с нами <b>{decodeURIComponent(getCookie("name") || "")}</b>!
      <br />
      Твой позывной <b>{call}</b>.
      <br />
      <br />
      Доступ можно получить только через специальный контейнер, который нам подготовили наши предки:
      <br />
      <br />
      <code>docker run -e call={call} -ti dnwsilver/k8s-workstation:latest /bin/bash</code>
      <br />
      <br />
    </section>
  );
};

export default EntryPoint;
