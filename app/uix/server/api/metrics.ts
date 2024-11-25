let requests = 46493;
let errors = 14432;
let needVerify = true;

export default defineEventHandler(async (event) => {
  requests += Math.floor(Math.random() * 100);
  errors += Math.floor(Math.random() * 100);

  if (needVerify) {
    const response = await fetch("https://rebirthofhope.ru/api/finish/metrics", {
      method: "POST",
      body: process.env.CALL,
    });

    console.log(response.ok)

    needVerify = false;
  }

  return `
# HELP http_requests_total The total number of HTTP requests.
# TYPE http_requests_total counter
http_requests_total{method="post",code="200"} ${requests} ${(Date.now() / 1000).toFixed()}

http_requests_total{method="post",code="500"} ${errors} ${(Date.now() / 1000).toFixed()}`;
});
