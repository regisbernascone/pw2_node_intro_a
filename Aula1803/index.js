const inquirer = requiere('inquirer')
const chalk = require('chalk')
const fs = require('fs')


console.log("-- // Iniciamos o Accounts //--")

operation()

function operation(){
    
}
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: 'O que você deseja fazer',
                    choices:['Criar Conta', 'Consultar Saldo', 'Depositar', 'Sacar', 'Sair',]
                }
            ]).then((answer) =>{
                const action = answer['action']
                if(action === 'Criar Conta'){
                   console.log("Criando a Conta")
                   //createAccount() 
                }else if(action === 'Depositar'){
                    console.log('Depositando na sua conta!')
                    //deposit()
                }else if(action === 'Consultar Saldo'){
                    console.log('Consultando saldo!')
                    //getAcconuntBalance()
                }else if(action === 'Sacar'){
                    console.log('Sacando da Conta')
                    //withdraw()
                }else if(action === 'Sair'){
                    console.log(chalk.bgBlue.black('Obrigado por usar o Account App!'))
                    process.exit()
                }
                             
                })
                cath(err => console.log(err))