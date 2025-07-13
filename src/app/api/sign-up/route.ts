import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import bcrypt from "bcryptjs";


export async function POST(request: Request) {
    await dbConnect()
    try {
        const { email, password, username } = await request.json()

        const userExist = await User.findOne({ email })
        if (userExist) {
            return Response.json({
                success: false,
                message: "Email is Already taken"
            }, { status: 400 })
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 12)
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                isAcceptingMessage: true,
                message: []
            })
            newUser.save()
        }

    } catch (error) {
        console.error('Error', error);
        return Response.json({
            success: false,
            message: "Error Registering user"
        }, { status: 500 })
    }
}