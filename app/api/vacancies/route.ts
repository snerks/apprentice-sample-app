// pages/api/proxy.ts

// import type { NextApiRequest, NextApiResponse } from 'next';

type SuccessResponse = { data: any };
type ErrorResponse = { error: string; details?: string };

export interface Vacancy {
  id: number;
  name: string;
}

// export async function GET(request: Request) {
//   // For example, fetch data from your DB here
//   const vacancies: Vacancy[] = [
//     { id: 1, name: 'Alice' },
//     { id: 2, name: 'Bob' },
//   ];
//   return new Response(JSON.stringify(vacancies), {
//     status: 200,
//     headers: { 'Content-Type': 'application/json' },
//   });
// }

// ~Accept: *application/json*
// Content-Type: *application/json*
// ~User-Agent: Thunder Client (https://www.thunderclient.com)
// Ocp-Apim-Subscription-Key: 79ea9296d41b431dbbb5dbe31e670fa1
// X-Version: 1

export async function GET(request: Request) {
  try {
    const apprenticeProxyUrl =
      'https://apprentice-api.netlify.app/.netlify/functions/vacancies?PageNumber=1&PageSize=25&Sort=DistanceAsc&Lat=51.184342&Lon=-1.857404&DistanceInMiles=5';

    const apprenticeUrl =
      'https://api.apprenticeships.education.gov.uk/vacancies/vacancy?PageNumber=1&PageSize=25';
    const apiKey = process.env.Ocp_Apim_Subscription_Key || '';
    //     const externalRes = await fetch('https://api.apprenticeships.education.gov.uk/vacancies', {
    //   headers: { 'Ocp-Apim-Subscription-Key': apiKey },
    // });
    const externalRes = await fetch(apprenticeUrl, {
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey,
        'Content-Type': 'application/json',
        'X-Version': '1',
      },
    });

    // const postcode = 'BA1 1AA';
    // // https://api.postcodes.io/postcodes/:postcode
    // const externalRes = await fetch(`https://api.postcodes.io/postcodes/${postcode}`, {
    //   // headers: { 'Ocp-Apim-Subscription-Key': apiKey },
    // });

    if (!externalRes.ok) {
      const errText = await externalRes.text();
      return new Response(
        JSON.stringify({
          error: 'External API returned an error',
          details: errText,
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const data = await externalRes.json();
    // return res.status(200).json({ data });
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected server failure';
    // return res.status(500).json({
    //   error: 'Internal Server Error',
    //   details: message,
    // });
    return new Response(
      JSON.stringify({
        error: 'Internal Server Error',
        details: message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
