const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const { get } = require('http')


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
           
          
        }else if(action === 'Depositar'){
            console.log('Depositando na sua conta!')
            
        }else if(action === 'Consultar Saldo'){
           
            
        } else if(action === 'Sacar'){
           
            
        } else if(action === 'Sair'){
            console.log(chalk.bgBlue.black('Obrigado por usar o Accounts App!'))
            process.exit()
        }

    })
        .catch(err => console.log(err))
}

function createAccount()
{
    console.log(chalk.bgGreen.white('Obrigado por utilizar o Accounts Bank!'))
    console.log(chalk.green('Vamos definicir as opções da sua conta?'))

    buildAccount()
}
function deposit(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual conta deseja depositar?'
        }
    ]).then((answer) => {
        const accountName = answer['accountName']

        if(!checkAccount(accountName))
        {
            return deposit()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto deseja depositar: '
            }
        ]).then((answer) => {
            const amount = answer['amount']

            addAmount(accountName, amount)
            operation()
        })
    })
}

function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.error(chalk.bgRed.black(`A conta ${accountName} não existe! Tente outro nome`))
        return false
    }
    return true
}

function addAmount(accountName, amount){
    const accountData = getAccount(accountName)

    if(!amount){
        console.error(chalk.bgRed.black('Valor Inválido'))
        deposit()
    }
    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        
        function (err){
            console.error(err)
        }
    )

    console.info(chalk.bgGreen.white(`O valor: ${amount}, foi depositado.`))
}

function getAccount(accountName){
    const accountJson = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf-8',
        flag: 'r'
    })
    return JSON.parse(accountJson)
}

function buildAccount()
{
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Forneça o nome para sua conta no Accounts Bank.'
        }
    
   
    ]).then((answer) => {
        const accountName = answer['accountName']
        
        
        if(!fs.existsSync('accounts'))
        {
          
            fs.mkdirSync('accounts')
        }

        
        if(fs.existsSync(`accounts/${accountName}.json`))
        {
            console.info(chalk.bgRed.black(`A conta: ${accountName} já existe.`))
            console.info(chalk.bgRed.black(`Escolha outro nome: `))

            
            buildAccount(accountName)
        }
        
        fs.writeFileSync(
            `accounts/${accountName}.json`,
            `{"balance": 0}`,
            function(err){
                console.error(err)
            }
        )
            console.info(chalk.bgGreen.white('Bem vindo(a) ao Accounts Bank: ' + accountName))
            console.info(chalk.green('Obrigado pela preferência!'))

        operation()
    }) 
}
function withdraw() {
    inquirer.prompt([
        {
        name: 'accountName',
        message: ' De qual conta deseja realizar o saque: '
        }
    ]).then((answer) =>{
        const accountName = answer['accountName']

        if(!checkAccount(accountName)){
            console.err(chalk.bgRed.white('Esta conta não existe!'))
            return whitdraw()
        }
        inquirer.prompt([
            {
                name: 'amount',
                message: 'Qual valor deseja sacar da conta?'
            }
        ]).then((answer) =>{
            const amount = answer['amount']

            removeAmount(accountName, amount)
            operation()
        })
    } )
}
function removeAmount(accountName, amount){
    const accountData = getAccount(accountName)

    if(!amount){
        console.log(chalk.bgRed.white('Ocorreu um erro tente mais tarde.'))
        return withdraw()
    }

    if((accountData.balance + accountData.limit) < amount){
        console.error(chalk.bgRed.white('Valor não está disponivel!'))
        return whitdraw()
    }
    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err){
            console.error(err)
        }
    )

        console.info(chalk.bgBlueBright.blue(`O valor:  ${amount} foi retirado da conta: ${accountName} `))

}

function getAccountBalance(){
    inquirer.prompt([
       {
         name: 'accountName',
         message: 'Qual conta deseja validar o saldo:'

       }

    ]).then((answer) =>{
        const accountName = answer['accountName']
             if(!checkAccount(accountName)){
                 return getAccountBalance()
         }

         const accountData = getAccount(accountName)
         if(accountData.balance < 0) {
            console.info(chalk.bgGreen.white(`A conta: ${accountName}, Limite especial de: ${accountData.balance + accountData.balance.limit}`))
        console.info(chalk.bgBlue.white(`Limite especial de: ${accountData.limit}`))
    }else
    console.info(chalk.bgBlue.white(`Limite especial de: ${accountData.limit}`))
        
         operation()
           })
    

}