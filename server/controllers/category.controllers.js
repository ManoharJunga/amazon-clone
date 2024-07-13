import Category from '../models/category.models.js';

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createCategory = async (req, res) => {
    const { categoryName, urlSlug, parentCatId, status } = req.body;
    try {
        const category = new Category({
            categoryName,
            urlSlug,
            parentCatId,
            status
        });

        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { categoryName, urlSlug, parentCatId, status } = req.body;
    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.categoryName = categoryName || category.categoryName;
        category.urlSlug = urlSlug || category.urlSlug;
        category.parentCatId = parentCatId || category.parentCatId;
        category.status = status || category.status;

        const updatedCategory = await category.save();
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
