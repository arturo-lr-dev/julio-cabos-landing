import { updateInquiry } from "@/lib/services/inquiries-service";
import { isServiceError } from "@/lib/services/service-error";

export const runtime = "nodejs";

export async function PATCH(request: Request) {
  const payload = (await request.json()) as {
    id?: string;
    status?: string;
    notes?: string;
  };

  try {
    const inquiry = await updateInquiry(payload);
    return Response.json({ ok: true, inquiry });
  } catch (error) {
    if (isServiceError(error)) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }
}
