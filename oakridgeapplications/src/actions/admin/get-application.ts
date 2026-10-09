"use server"

import { DEPARTMENT } from "@/config/config";
import { authOptions } from "@/lib/auth";
import { ExtentedUser } from "@/lib/utils";
import Applications from "@/schemas/applications";
import { getServerSession } from "next-auth";
import { createConnection } from "../database-connection";

export const getApplicationAction = async (id: string) => {
    const session = await getServerSession(authOptions) as ExtentedUser;
    if(!session || !session.user || session.user.id !== DEPARTMENT.OWNER) return null;

    await createConnection();

    const application = await Applications.findOne({ id }).lean();
    if(!application) return null;

    return application;
}