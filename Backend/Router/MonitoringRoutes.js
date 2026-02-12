// Routes/MonitoringRoutes.js
const express = require("express");
const router = express.Router();
const MonitoringController = require("../Controllers/MonitoringControllers");

router.get("/", MonitoringController.getAllMonitoringRecords);
router.post("/", MonitoringController.addMonitoringRecord);
router.get("/dashboard/counts", MonitoringController.getDashboardCounts);
router.get("/next-project-id", MonitoringController.getNextProjectId);
router.get("/:id", MonitoringController.getMonitoringRecordById);
router.put("/:id", MonitoringController.updateMonitoringRecord);
router.delete("/:id", MonitoringController.deleteMonitoringRecord);

module.exports = router;