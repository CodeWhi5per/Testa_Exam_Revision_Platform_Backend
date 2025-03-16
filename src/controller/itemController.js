const Item = require("../models/Item");

// Create an item
exports.createItem = async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read all items
exports.getAllItems = async (req, res) => {
    const items = await Item.find();
    res.json(items);
};

// Read single item
exports.getItemById = async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.json(item);
};

// Update an item
exports.updateItem = async (req, res) => {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
};

// Delete an item
exports.deleteItem = async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
};