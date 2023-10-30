const { Command } = require('commander');
const Contacts = require("./contacts");


const program = new Command();
program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const contacts = await Contacts.listContacts();
            console.table(contacts);
            break;

        case 'get':
            const contact = await Contacts.getContactById(id);
            console.log(contact);
            break;

        case 'add':
            // ... name email phone
            const createContact = await Contacts.addContact(name, email, phone);
            console.log(createContact);
            break;

        case 'remove':
            // ... id
            const removeContact = await Contacts.removeContact(id);
            console.log(removeContact);
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);



// async function getById(id) {
//     const allContacts = await Contacts.getContactById(id);
//     // console.log(allContacts)
// }

// async function getAll() {
//     const allContacts = await Contacts.listContacts();
//     console.log(allContacts)
// }

// function addContacts({name, email, phone}) {
//     Contacts.addContact(name, email, phone);
//     // console.log(name)
// }

// function deleteContacts (id) {
//     Contacts.removeContact(id);
// }