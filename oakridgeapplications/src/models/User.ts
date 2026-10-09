import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  discordId: string;
  username: string;
  avatar?: string;
  email?: string;
  role: 'user' | 'reviewer' | 'admin' | 'super_admin';
  departmentAccess: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    discordId: { type: String, required: true, unique: true, index: true },
    username: { type: String, required: true },
    avatar: { type: String },
    email: { type: String },
    role: {
      type: String,
      enum: ['user', 'reviewer', 'admin', 'super_admin'],
      default: 'user',
    },
    departmentAccess: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
