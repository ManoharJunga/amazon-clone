import Revenue from '../models/revenue.model.js';

// Get all revenue records

export const getRevenues = async (req, res) => {
    const { filter } = req.query;
    let startDate;
    const endDate = new Date();
  
    // Determine the startDate based on the filter
    switch (filter) {
      case 'Day':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 1);
        break;
      case 'Month':
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case 'Year':
        startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
    }
  
    try {
      const revenues = await Revenue.find({
        period_start: { $gte: startDate },
        period_end: { $lte: endDate }
      });
      res.json(revenues);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching revenue records', error });
    }
  };
// Get a specific revenue record by ID
export const getRevenue = async (req, res) => {
  try {
    const revenue = await Revenue.findById(req.params.id);
    if (revenue) {
      res.json(revenue);
    } else {
      res.status(404).json({ message: 'Revenue record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching revenue record', error });
  }
};

// Create a new revenue record
export const createRevenue = async (req, res) => {
  try {
    const { total_revenue, period_start, period_end, notes } = req.body;
    const revenue = new Revenue({
      total_revenue,
      period_start,
      period_end,
      notes,
      status: 'Calculated' // Set the status as per your logic
    });
    await revenue.save();
    res.status(201).json(revenue);
  } catch (error) {
    res.status(500).json({ message: 'Error creating revenue record', error });
  }
};

// Update a revenue record
export const updateRevenue = async (req, res) => {
  try {
    const { total_revenue, period_start, period_end, notes, status } = req.body;
    const revenue = await Revenue.findByIdAndUpdate(
      req.params.id,
      { total_revenue, period_start, period_end, notes, status },
      { new: true }
    );
    if (revenue) {
      res.json(revenue);
    } else {
      res.status(404).json({ message: 'Revenue record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating revenue record', error });
  }
};

// Delete a revenue record
export const deleteRevenue = async (req, res) => {
  try {
    const revenue = await Revenue.findByIdAndDelete(req.params.id);
    if (revenue) {
      res.json({ message: 'Revenue record deleted' });
    } else {
      res.status(404).json({ message: 'Revenue record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting revenue record', error });
  }
};
