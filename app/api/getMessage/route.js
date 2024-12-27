import dbConnect from "@/lib/dbConnect";
import Message from "@/models/Message";

export const dynamic = 'force-dynamic';

export async function GET() {


    await dbConnect();
  
    try {
      // Connect to the database
      
  
      // Fetch all Messages
      const messages = await Message.find({});
  
  
      // Return the fetched products
      return new Response(JSON.stringify({ success: true, data: messages }),
      
       {
        status: 200,
       });
  
  
    } catch (error) {
      console.error("Error fetching products:", error.message);
  
      // Return an error response
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        status: 400,
      });
    }
  }