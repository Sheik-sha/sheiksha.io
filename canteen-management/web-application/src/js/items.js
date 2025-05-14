// This file contains functions for managing items, such as adding and removing items from the admin dashboard.

const items = [];

// Function to add an item
function addItem(item) {
    items.push(item);
    console.log(`Item added: ${item}`);
}

// Function to remove an item by name
function removeItem(itemName) {
    const index = items.findIndex(item => item.name === itemName);
    if (index !== -1) {
        items.splice(index, 1);
        console.log(`Item removed: ${itemName}`);
    } else {
        console.log(`Item not found: ${itemName}`);
    }
}

// Function to list all items
function listItems() {
    return items;
}

// Exporting functions for use in other modules
export { addItem, removeItem, listItems };