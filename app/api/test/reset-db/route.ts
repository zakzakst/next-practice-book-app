import { NextResponse } from "next/server";

import { resetDummyDb } from "@/dummy-db/reset";

export const POST = async () => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  resetDummyDb();
  return NextResponse.json({ message: "Database reset successful" });
};
