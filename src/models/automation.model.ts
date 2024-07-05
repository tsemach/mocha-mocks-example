import mongoose, { Schema } from "mongoose";

const AutomationSchema = new mongoose.Schema({
  squadronName: { type: String },
  testId: { type: "UUID" },
  test: { type: String },
  parameters: { type: Schema.Types.Mixed },
  status: {
      type: String,
      enum: ["schedule", "running", "failed", "success"],
      require: true,
  },
  createdAt: { type: Date, index: { expires: "7d" } },
  updatedAt: { type: Date, default: Date.now },
});

export const Automation = mongoose.model("Automation", AutomationSchema);