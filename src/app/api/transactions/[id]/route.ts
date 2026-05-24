
import dbConnect from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(req: NextRequest, { params }: RouteParams) {
    try {
        await dbConnect();

        const { id } = await params;

        const transaction = await Transaction.findById(id);
        if (!transaction) {
            return NextResponse.json(
                { success: false, data: "Couldn't find transaction with this ID" },
                { status: 400 })
        }
        return NextResponse.json({ success: true, data: transaction }, { status: 200 })
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch the transaction"
        return NextResponse.json({ success: false, message: errorMessage }, { status: 400 });
    }
};

export async function PATCH(req: NextRequest, { params }: RouteParams) {
    try {
        await dbConnect();

        const { id } = await params;

        const body = await req.json();
        const transaction = await Transaction.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true
        });
        if (!transaction) {
            return NextResponse.json({ success: false, data: "Couldn't update transaction with this ID" }, { status: 400 })
        }
        return NextResponse.json({ success: true, data: transaction }, { status: 200 })
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to update the transaction"
        return NextResponse.json({ success: false, message: errorMessage }, { status: 400 });
    }
};

export async function DELETE(req: NextRequest, { params }: RouteParams) {
    try {
        await dbConnect();

        const { id } = await params;

        const isDeleted = await Transaction.deleteOne({ _id: id });
        if (!isDeleted) {
            return NextResponse.json({ success: false, data: "Couldn't delete transaction with this ID" }, { status: 400 })
        }
        return NextResponse.json({ success: true, data: {} }, { status: 200 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to delete the transaction"
        return NextResponse.json({ success: false, message: errorMessage }, { status: 400 });
    }
};
