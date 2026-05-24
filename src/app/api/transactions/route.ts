
import dbConnect from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
    try {
        await dbConnect();

        const transactions = await Transaction.find({});
        return NextResponse.json({ success: true, data: transactions }, { status: 200 })
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch the transactions"
        return NextResponse.json({ success: false, message: errorMessage }, { status: 400 });
    }
};

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const body = await req.json();
        const transaction = await Transaction.create(body);
        return NextResponse.json({ success: true, data: transaction }, { status: 201 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to create the transaction"
        return NextResponse.json({ success: false, message: errorMessage }, { status: 400 });
    }
};

