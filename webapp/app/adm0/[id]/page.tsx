import { Suspense } from "react";
import { Metadata } from "next";
import CopyButton from "../../../components/copyButton";
import DownloadButton from "../../../components/donwloadButton";
import { getCountryData } from "countries-list";
import countries3to2 from "countries-list/minimal/countries.3to2.min.json";

const appOrigin = "*"; //"https://d8qn3zfqpd0bq.cloudfront.net"

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // read route params
  const countryData = getCountryData(countries3to2[params.id]);
  const title = `${countryData.name} Border Shapefile | ${countryData.native} GeoJSON Geometry Vector File for GIS | ShapeFinder`;
  return {
    title: title,
  };
}

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
      <div className="sticky top-0 float-right space-x-4 p-5">
        <CopyButton message={message} />
        <DownloadButton message={message} />
      </div>
      <p className="clear-left m-5">{message}</p>
      <div className="sticky bottom-0 bg-gradient-to-t from-white via h-20 w-full overflow-visible"></div>
    </Suspense>
  );
}
