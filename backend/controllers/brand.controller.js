import Brand from '../models/brand.model.js';

// Get all brands
export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific brand
export const getBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ message: 'Brand not found' });
    res.json(brand);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new brand
export const createBrand = async (req, res) => {
  const brand = new Brand({
    name: req.body.name,
    description: req.body.description,
    logo_url: req.body.logo_url
  });
  try {
    const newBrand = await brand.save();
    res.status(201).json(newBrand);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a brand
export const updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ message: 'Brand not found' });

    brand.name = req.body.name || brand.name;
    brand.description = req.body.description || brand.description;
    brand.logo_url = req.body.logo_url || brand.logo_url;

    const updatedBrand = await brand.save();
    res.json(updatedBrand);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a brand
export const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ message: 'Brand not found' });

    await brand.remove();
    res.json({ message: 'Brand deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
