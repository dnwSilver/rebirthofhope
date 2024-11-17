const NeedMoreGoldManual = () => {
  return (
    <>
      <br />
      <h2>Публикация приложений</h2>
      <p>
        Наша конфигурация отправляется в кластер всего одной командой. Туда улетает сразу <b>API</b> и <b>UIX</b>.
      </p>
      <Command text={`helmfile --environment production-app apply`} />
    </>
  );
};

export default NeedMoreGoldManual
