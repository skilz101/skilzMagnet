import { NextResponse } from "next/server";
import { format } from "fast-csv";
import { Readable } from "stream";
import { getLeads } from "@/server/admin/getLeads";

// Helper function to convert a readable stream to a buffer
const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
};

// Server action to export leads
export async function POST(request: Request) {
  try {
    // Retrieve user ID from the request (modify based on your authentication logic)
    const { userId } = await request.json();

    // Fetch the leads from the database
    const leads = await getLeads(userId);

    // Transform leads into the required CSV format
    const csvData = leads.map((lead) => ({
      id: lead.id,
      name: lead.name ?? "",
      email: lead.email ?? "",
      phoneNumber: lead.phoneNumber ?? "",
    }));

    // Create a readable stream for the CSV
    const csvStream = format({ headers: true });
    csvData.forEach((row) => csvStream.write(row));
    csvStream.end();

    // Convert the stream to a buffer
    const buffer = await streamToBuffer(Readable.from(csvStream));

    // Return the CSV as a response
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="leads.csv"`,
      },
    });
  } catch (error) {
    console.error("Error exporting leads:", error);
    return new NextResponse("Failed to export leads.", { status: 500 });
  }
}
