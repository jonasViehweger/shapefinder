import { Suspense } from "react";



export default async function Results({ params }: { params: { id: string } }) {
  await new Promise((r) => setTimeout(r, 2000));
  return (
    <Suspense>
      {" "}
      <h1>{params.id}</h1>
    </Suspense>
  );
}
