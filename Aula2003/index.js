const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')


console.log("-- // Iniciamos o Accounts //--")

operation()

function operation() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que você deseja fazer?',
            choices: ['Criar Conta', 'Consultar Saldo', 'Depositar', 'Sacar', 'Sair']
        }
    ]).then((answer) => {
        const action = answer['action']

        if( action === 'Criar Conta' ){
            console.log("Criando a Conta")
            //createAccount()
        }else if(action === 'Depositar'){
            console.log('Depositando na sua conta!')
            //deposit()
        }else if(action === 'Consultar Saldo'){
            console.log('Consultando saldo!')
            //getAccountBalance()
        } else if(action === 'Sacar'){
            console.log('Sacando da conta')
            //withdraw()
        } else if(action === 'Sair'){
            console.log(chalk.bgBlue.black('Obrigado por usar o Accounts App!'))
            process.exit()
        }

    })
        .catch(err => console.log(err))
}

function createAccount() {
    console.log(chalk.bgGreen.white('Obrigado por utilizar o Accounts Bank'))
    console.log(chalk.green('Vamos definir as opções da sua conta?'))

    builAccount()

}

function builAccount() {
    inquirer.prompt(
        {
            name: 'accountName',
            message: 'Forneça o nome para sua conta no banco Accounts.'

        }
    ).then((answer) => {
        const accountName = answer['accountName']

        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }
        if(fs.existsSync(`account/${accountName}.json`)){
            console.info(chalk.bgRed.black(`A conta: ${accountName} já existe.`))
            console.info(chalk.bgRed.black(`Escolha outro nome:`))
            builAccount(accountName)
        }
        fs.writeFileSync(
            `account/${accountName}.json`,
            `{"balance":0}`,
            function(err){
                console.error(err)
            }
        )
        console.info(chalk.bgGreen.white(`Bem Vindo ao Accounts Bank: ${accountName}`))
        console.info(chalk.green(`Obrigado pela preferência!`))

        operation()
    })
}

