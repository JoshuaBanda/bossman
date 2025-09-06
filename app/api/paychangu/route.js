export async function POST(req) {
  const body = await req.json();
  const response = await fetch("https://api.paychangu.com/payment", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.PAYCHANGU_SECRET}`
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  return new Response(JSON.stringify(data), { status: 200 });
}
