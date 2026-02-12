// Model/MonitoringModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MonitoringSchema = new Schema({
    Project_ID: {
        type: String,
        trim: true,
        unique: true
    },
    Project_Name: {
        type: String,
        required: [true, "Project Name is required"],
        trim: true
    },
    Location: {
        type: String,
        required: [true, "Location is required"],
        trim: true
    },
    Monitoring_Date: {
        type: Date,
        required: [true, "Monitoring Date is required"],
        default: Date.now
    },
    
    Issues_Found: {
        type: String,
        required: false,
        trim: true
    },

    Weather_Conditions: {
        type: String,
        required: [true, "Weather Conditions are required"],
        enum: ["sunny", "cloudy", "rainy", "stormy", "windy"],
        trim: true
    },
    
    Workers_Present: {
        type: Number,
        required: [true, "Number of workers present is required"],
        min: [0, "Workers present cannot be negative"]
    },
    
    
}, { 
    timestamps: true,
    toJSON: { 
        virtuals: true,
        transform: function(doc, ret) {
            ret.Monitoring_ID = ret._id;
            delete ret.id;
            return ret;
        }
    },
    toObject: { virtuals: true }
});

// Auto-generate Project_ID before saving
MonitoringSchema.pre('save', async function(next) {
    if (!this.Project_ID) {
        try {
            // Find the last project to get the highest number
            const lastProject = await this.constructor.findOne(
                {}, 
                { Project_ID: 1 },
                { sort: { createdAt: -1 } }
            );

            let newIdNumber = 1;
            if (lastProject && lastProject.Project_ID) {
                // Extract number from format PROJ-001
                const match = lastProject.Project_ID.match(/PROJ-(\d+)/);
                if (match) {
                    newIdNumber = parseInt(match[1]) + 1;
                }
            }

            // Generate new Project_ID with leading zeros (e.g., PROJ-001)
            this.Project_ID = `PROJ-${String(newIdNumber).padStart(3, '0')}`;
        } catch (error) {
            return next(error);
        }
    }
    next();
});

// Index for better query performance
MonitoringSchema.index({ Monitoring_Date: 1 });
MonitoringSchema.index({ Site_Supervisor_ID: 1 });

module.exports = mongoose.model("Monitoring", MonitoringSchema);