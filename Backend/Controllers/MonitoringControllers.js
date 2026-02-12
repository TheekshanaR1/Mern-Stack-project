// Controllers/MonitoringControllers.js
const Monitoring = require("../Model/MonitoringModel");
// Add this to your controller error handlers
  
const getAllMonitoringRecords = async (req, res) => {
    try {
        const records = await Monitoring.find().sort({ Monitoring_Date: -1 });
        return res.status(200).json(records); // Simplified response
    } catch (err) {
        console.error(err);
        return res.status(500).json({ 
            message: "Server error",
            error: err.message 
        });
    }
};

const addMonitoringRecord = async (req, res) => {
    try {
        const requiredFields = [
            'Project_Name', 'Location',
            'Monitoring_Date', 'Weather_Conditions', 'Workers_Present'
        ];

        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({
                message: "Missing required fields",
                missingFields
            });
        }

        // Convert date string to Date object
        const recordData = {
            ...req.body,
            Monitoring_Date: new Date(req.body.Monitoring_Date)
        };

        const record = new Monitoring(recordData);
        await record.save();

        return res.status(201).json(record); // Simplified response

    } catch (err) {
        console.error(err);
        
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(el => el.message);
            return res.status(400).json({
                message: "Validation failed",
                errors
            });
        }

        return res.status(500).json({
            message: "Unable to add monitoring record",
            error: err.message
        });
    }
};


const getMonitoringRecordById = async (req, res) => {
    try {
        const record = await Monitoring.findById(req.params.id);
        
        if (!record) {
            return res.status(404).json({ 
                success: false,
                message: "Monitoring record not found" 
            });
        }

        return res.status(200).json({ 
            success: true,
            record 
        });

    } catch (err) {
        console.error(err);
        
        if (err.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: "Invalid Monitoring Record ID format"
            });
        }

        return res.status(500).json({ 
            success: false,
            message: "Server error",
            error: err.message 
        });
    }
};

const updateMonitoringRecord = async (req, res) => {
    try {
        const record = await Monitoring.findByIdAndUpdate(
            req.params.id,
            req.body,
            { 
                new: true,
                runValidators: true 
            }
        );

        if (!record) {
            return res.status(404).json({ 
                success: false,
                message: "Monitoring record not found" 
            });
        }

        return res.status(200).json({ 
            success: true,
            message: "Monitoring record updated successfully",
            record 
        });

    } catch (err) {
        console.error(err);
        
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(el => el.message);
            return res.status(400).json({
                success: false,
                message: "Validation failed during update",
                errors
            });
        }

        return res.status(500).json({ 
            success: false,
            message: "Unable to update monitoring record",
            error: err.message 
        });
    }
};

const deleteMonitoringRecord = async (req, res) => {
    try {
        const record = await Monitoring.findByIdAndDelete(req.params.id);

        if (!record) {
            return res.status(404).json({ 
                success: false,
                message: "Monitoring record not found" 
            });
        }

        return res.status(200).json({ 
            success: true,
            message: "Monitoring record deleted successfully" 
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ 
            success: false,
            message: "Server error",
            error: err.message 
        });
        
    }
    
};
const getDashboardCounts = async (req, res) => {
    try {
      const records = await Monitoring.find();
      
      const uniqueProjects = new Set(records.map(record => record.Project_ID));
      const totalWorkers = records.reduce((sum, record) => sum + (record.Workers_Present || 0), 0);
      const recordsWithIssues = records.filter(record => 
        record.Issues_Found && record.Issues_Found.trim() !== ""
      ).length;
  
      res.status(200).json({
        projects: uniqueProjects.size,
        workers: totalWorkers,
        issues: recordsWithIssues
      });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  const getDashDoardCounts = async (req, res) => {
    try {
      const records = await Monitoring.find();
      
      const uniqueProjects = new Set(records.map(record => record.Project_ID));
      const totalWorkers = records.reduce((sum, record) => sum + (record.Workers_Present || 0), 0);
      const recordsWithIssues = records.filter(record => 
        record.Issues_Found && record.Issues_Found.trim() !== ""
      ).length;
  
      res.status(200).json({
        projects: uniqueProjects.size,
        workers: totalWorkers,
        issues: recordsWithIssues
      });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };

  // Get next Project ID
  const getNextProjectId = async (req, res) => {
    try {
      // Find the last project to get the highest number
      const lastProject = await Monitoring.findOne(
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
      const nextProjectId = `PROJ-${String(newIdNumber).padStart(3, '0')}`;

      return res.status(200).json({
        success: true,
        nextProjectId
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Unable to generate Project ID",
        error: err.message
      });
    }
  };

  module.exports = {
    getAllMonitoringRecords,
    addMonitoringRecord,
    getMonitoringRecordById,
    updateMonitoringRecord,
    deleteMonitoringRecord,
    getDashboardCounts,
    getNextProjectId
};