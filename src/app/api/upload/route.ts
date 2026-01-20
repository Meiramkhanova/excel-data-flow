import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "file missing" }, { status: 400 });
    }

    const n8nForm = new FormData();
    n8nForm.append("file", file, file.name);

    const res = await fetch(
      "https://n8n.contractpro.kz/webhook/6a0b284e-7a53-457e-b28b-3709487e7ed4",
      {
        method: "POST",
        body: n8nForm,
      },
    );

    if (!res.ok) {
      return NextResponse.json({ error: "n8n upload failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "unexpected error" }, { status: 500 });
  }
}
