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

export async function GET(request: Request) {
  try {
    // const apiKey = process.env.Ocp_Apim_Subscription_Key || '';
    //     const externalRes = await fetch('https://api.apprenticeships.education.gov.uk/vacancies', {
    //   headers: { 'Ocp-Apim-Subscription-Key': apiKey },
    // });

    const postcode = 'BA1 1AA';
    // https://api.postcodes.io/postcodes/:postcode
    const externalRes = await fetch(`https://api.postcodes.io/postcodes/${postcode}`, {
      // headers: { 'Ocp-Apim-Subscription-Key': apiKey },
    });

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
