import Link from "next/link"
export default function SuccessPage(){
    return(
    
        <div>
            <div>Order Complete!</div>
            <div className="text-decoration-line: underline"><Link href="https://ecommerce-app-peach-ten.vercel.app/"><span className="font-weight: 700;">Click here</span> to go back home</Link></div>
        </div>
    )
}