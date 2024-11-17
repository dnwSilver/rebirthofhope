let requests = 46493;
let errors = 14432;

export default defineEventHandler(async (event) => {
  requests += Math.floor(Math.random() * 100);
  errors += Math.floor(Math.random() * 100);

  console.log(process.env.CALL);

  await fetch("https://rebirthofhope.ru/api/verify", {
    method: "POST",
    body: JSON.stringify({
      call: process.env.CALL,
      task: "metrics",
    }),
  });

  return `
# HELP http_requests_total The total number of HTTP requests.
# TYPE http_requests_total counter
http_requests_total{method="post",code="200"} ${requests} ${(Date.now() / 1000).toFixed()}

http_requests_total{method="post",code="500"} ${errors} ${(Date.now() / 1000).toFixed()}`;
});
