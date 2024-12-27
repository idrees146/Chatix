import dbConnect from "@/lib/dbConnect";
import Message from "@/models/Message";

export async function POST(req) {
    try {
        // Connect to the database
        await dbConnect();

        // Parse the request body
        const body = await req.json();
        const { message, email } = body;

        // Validate the incoming data
        if (!message || !email) {
            return new Response(JSON.stringify({
                success: false,
                error: "Message and email are required."
            }), { status: 400 });
        }

        // Log the received data (optional, for debugging)
        console.log("Received Data:", body);

        // Create and save the new message
        const newMessage = await Message.create({ message, email });

        // Return success response with the created message
        return new Response(JSON.stringify({
            success: true,
            data: newMessage
        }), { status: 201 });

    } catch (error) {
        console.error("Error saving message:", error);
        return new Response(JSON.stringify({
            success: false,
            error: "Failed to save message. Please try again later."
        }), { status: 500 });
    }
}
