"use client";

const K9sTutorial = () => {
  return (
    <>
      <h1>k9s. namespace</h1>
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

      <h2 id="ingress">
        Список <b>ingress</b>'ов доступен по команде <mark>ingress</mark>/<mark>ing</mark>.
      </h2>
    </>
  );
};

export default K9sTutorial;
