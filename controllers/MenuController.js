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
                    'remind me',
                    'view all contacts',
                    'search for a contact'
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
                    break;
                case "remind me":
                    this.remindMe();
                    break;
                case 'view all contacts':
                    this.getContacts();
                    break;
                case 'search for a contact':
                    this.search();
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
            this.book.addContact(answers.name, answers.phone, answers.email).then((contact) => {
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

    getContacts(){
        this.clear();
  
        this.book.getContacts().then((contacts) => {
          for (let contact of contacts) {
            console.log(`
            name: ${contact.name}
            phone number: ${contact.phone}
            email: ${contact.email}
            ---------------`
            );
          }
          this.main();
        }).catch((err) => {
          console.log(err);
          this.main();
        });
    }

    search() {
        inquirer.prompt(this.book.searchQuestions)
        .then((target) => {
            this.book.search(target.name)
            .then((contact) => {
                if(contact === null) {
                    this.clear();
                    console.log('contact not found');
                    this.search();
                } else {
                    this.showContact(contact);
                }
            });
        })
        .catch((err) => {
            console.log(err);
            this.main();
        });
    }

    showContact(contact) {
        this._printContact(contact);
        inquirer.prompt(this.book.showContactQuestions)
        .then((answer) => {
            switch(answer.selected) {
                case 'Delete contact':
                    this.delete(contact);
                    break;
                case 'Main menu':
                    this.main();
                    break;
                default:
                    console.log('something went wrong.');
                    this.showContact(contact);
            }
        })
        .catch((err) => {
            console.log(err);
            this.showContact(contact);
        });
    }

    _printContact(contact) {
        console.log(`
            name: ${contact.name}
            phone number: ${contact.phone}
            email: ${contact.email}
            ---------------`
        );
    }

    delete(contact) {
        inquirer.prompt(this.book.deleteConfirmQuestions)
        .then((answer) => {
            if(answer.confirmation) {
                this.book.delete(contact.id);
                console.log('contact deleted!');
                this.main();
            } else {
                console.log('contact not deleted');
                this.showContact(contact);
            }
        })
        .catch((err) => {
            console.log(err);
            this.main();
        });
    }
}