const inquirer = require('inquirer');
const ContactController = require('./ContactController');

module.exports = class Menucontroller {
    constructor() {
        this.mainMenuQuestions = [
            {
                type: 'list',
                name: 'mainMenuchoice',
                message: 'Please choose from an option below: ',
                choices: [
                    'Add new contact',
                    'Exit',
                    'Get the date',
                    'remind me'
                ]
            }
        ];
        this.book = new ContactController();
    }

    main() {
        console.log('Welcome to AdressBloc!');
        inquirer.prompt(this.mainMenuQuestions).then((response) => {
            switch(response.mainMenuchoice) {
                case "Add new contact":
                    this.addContact();
                    break;
                case "Exit":
                    this.exit();
                    break;
                case "Get the date":
                    this.getDate();
                case "remind me":
                    this.remindMe();
                    break;
                default:
                    console.log('invalid input');
                    this.main();
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    clear() {
        console.log('\x1Bc');
    }

    addContact() {
        inquirer.prompt(this.book.addContactQuestions).then((answers) => {
            this.book.addContact(answers.name, answers.phone).then((contact) => {
                console.log('contact added successfully!');
                this.main();
            }).catch((err) => {
                this.main();
            });
        });
    }

    exit() {
        console.log('thanks for using AddressBloc!');
        process.exit();
    }

    getDate() {
        var date = new Date().toString();
        console.log(date);
    }

    getContactCount() {
        return this.contacts.length;
    }

    remindMe() {
        return 'Learning is a life-long pursuit';
    }
}