const { Command } = require("commander")
const program = new Command()

const contacts = require("./db/contacts")

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const allContacts = await contacts.listContacts()
            return console.table(allContacts)
        case "get":
            const oneContact = await contacts.getContactById(id)
            return console.table(oneContact)
        case "add":
            const newContact = await contacts.addContact({ name, email, phone })
            return console.table(newContact)
        case "remove":
            const deleteBook = await contacts.removeContact(id)
            return console.table(deleteBook)

        default:
            console.warn("\x1B[31m Unknown action type!")
    }
}

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone")

program.parse(process.argv)

const argv = program.opts()

invokeAction(argv)

// ----------------------------------------------------------------------

// # Получаем и выводим весь список контактов в виде таблицы (console.table)
// node index.js --action list

// # Получаем контакт по id
// node index.js --action get --id 5

// # Добавялем контакт
// node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

// # Удаляем контакт
// node index.js --action remove --id=3

// ----------------------------------------------------------------------
