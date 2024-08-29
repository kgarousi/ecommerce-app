import { NextResponse } from "next/server";
import Stripe from "stripe"

export async function POST(request){


   // if(request.method != 'POST'){return res.sendStatustatus(405)}
    const body = await request.json()
    
    if(body.lineItems.length === 0){
       return new Response("Error", {
        status: 405
       });
    }


        try{
            const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
                apiVersion: '2024-06-20'
            })
            const session = await stripe.checkout.sessions.create({
                success_url: 'http://localhost:3000/success',
                cancel_url: 'http://localhost:3000/cancel',
                line_items: body.lineItems,
                mode: "payment"
            })

            return NextResponse.json({session})
        }
        catch(err) {
            console.log("broke")
            console.log(err)
            return new Response("Error", {
                status: 405
               });
        }
}