import type { NextApiRequest, NextApiResponse } from "next";

// NOTE: The front-end validation modal currently posts directly to the
// https://getform.io/f/azyqwekb endpoint. This API route is kept as a
// placeholder for future first-party integrations (email service, DB, etc.).

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Method Not Allowed");
  }

  const { email, organization, message, pageContext } = req.body ?? {};

  if (!email || !organization || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // TODO: Integrate with email service, DB, or webhook.
  console.log("Validation request received", {
    email,
    organization,
    message,
    pageContext,
  });

  return res.status(200).json({ ok: true });
}
