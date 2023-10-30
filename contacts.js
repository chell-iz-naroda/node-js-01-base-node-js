const fs = require("node:fs/promises");
const path = require("node:path");

const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
    // ...твій код. Повертає масив контактів.
    const contacts = await fs.readFile(contactsPath, { encoding: "UTF-8" });

    return JSON.parse(contacts);
}

async function getContactById(contactId) {
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await listContacts();

    const contact = contacts.find((contact) => contact.id === contactId);

    return contact === undefined ? null : contact;
}

async function removeContact(contactId) {
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await listContacts();;

    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
        return '\x1B[31mNon-existent id!\n' + null;
    }

    const newContacts = [...contacts.slice(0, index), ...contacts.slice(index + 1)];

    fs.writeFile(contactsPath, JSON.stringify(newContacts, undefined, 2));

    return contacts[index];
}

async function addContact(name, email, phone) {
    // ...твій код. Повертає об'єкт доданого контакту. 
    const contacts = await listContacts();

    const newBook = { id: crypto.randomUUID(), name, email, phone };

    contacts.push(newBook);

    fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));

    return newBook;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};