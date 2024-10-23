import inquirer from "inquirer";

class userInterface {

    // Method to start up the app
    startInterface(): void {
        inquirer.prompt([
            {
                type: 'list',
                name: 'viewChoice',
                message: 'What would you like to do?',
                choices: ['View departments', 'View roles', 'View employees', 'Add department', 'Add role', 'Add employee', 'Update employee role', 'Exit']
            },
        ])
        .then((answers) => {
            console.log(answers.viewChoice);
        });
    }
}

export default userInterface;