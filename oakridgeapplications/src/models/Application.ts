import mongoose, { Schema, Document } from 'mongoose';

export interface IApplicationAnswer {
  questionId: string;
  answer: string | string[];
}

export interface IApplication extends Document {
  userId: string;
  departmentId: string;
  status: 'pending' | 'under_review' | 'approved' | 'denied';
  answers: IApplicationAnswer[];
  reviewedBy?: string;
  reviewNotes?: string;
  submittedAt: Date;
  reviewedAt?: Date;
}

const AnswerSchema = new Schema<IApplicationAnswer>(
  {
    questionId: { type: String, required: true },
    answer: { type: Schema.Types.Mixed, required: true },
  },
  { _id: false }
);

const ApplicationSchema = new Schema<IApplication>(
  {
    userId: { type: String, required: true, index: true },
    departmentId: { type: String, required: true, index: true },
    status: {
      type: String,
      enum: ['pending', 'under_review', 'approved', 'denied'],
      default: 'pending',
      index: true,
    },
    answers: [AnswerSchema],
    reviewedBy: { type: String },
    reviewNotes: { type: String },
    submittedAt: { type: Date, default: Date.now },
    reviewedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema);
