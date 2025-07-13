import mongoose, { Schema, Document } from 'mongoose';

export interface TMessage extends Document {
    content: string
    createdAt: Date
}

const MessageSchema = new Schema<TMessage>({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})


export interface TUser extends Document {
    userName: string
    email: string
    password: string
    isAcceptingMessage: boolean
    message: TMessage[]
}


const userSchema = new Schema<TUser>({
    userName: {
        type: String,
        required: [true, 'User Name is Required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'User Name is Required'],
        trim: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/, 'please use a valid Email']
    },
    password: {
        type: String,
        required: [true, "Password is Required"]
    },
    isAcceptingMessage: {
        type: Boolean,
        required: [true, "verify Code  is Required"]
    },
    message: {
        type: [MessageSchema],
    },
})

const User = (mongoose.models.User as mongoose.Model<TUser>) || mongoose.model<TUser>('User', userSchema)

export default User