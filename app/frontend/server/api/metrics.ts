let requests = 46493;
let errors = 14432;
let needVerify = false;

export default defineEventHandler(async (event) => {
  requests += 123;
  errors += 321;

  if (needVerify) {
    await fetch("https://rebirthofhope.ru/api/verify", {
      method: "POST",
      body: JSON.stringify({
        call: "zanzibari-soymilk-soup", //process.env.CALL,
        task: "metrics",
      }),
    });
    needVerify = true;
  }

  return `
# HELP http_requests_total The total number of HTTP requests.
# TYPE http_requests_total counter
http_requests_total{method="post",code="200"} ${requests} ${(Date.now() / 1000).toFixed()}

http_requests_total{method="post",code="500"} ${errors} ${(Date.now() / 1000).toFixed()}`;
});
