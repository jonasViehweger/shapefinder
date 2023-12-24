import { Suspense } from "react";

const appOrigin = "*"; //"https://d8qn3zfqpd0bq.cloudfront.net"

export default async function Results({ params }: { params: { id: string } }) {
  const response = await fetch(
    `https://xmtkdgvi2b.execute-api.eu-central-1.amazonaws.com/Prod/adm0/${params.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": appOrigin,
      },
    }
  );
  const message = await response.text();
  return (
    <Suspense>
      {" "}
      <h1>{message}</h1>
    </Suspense>
  );
}
