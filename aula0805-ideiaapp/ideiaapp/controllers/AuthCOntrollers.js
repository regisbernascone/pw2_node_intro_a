const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class UserController {
    static login(req, res){
        res.render('auth/login')
    }

    static async loginPost(req, res){
        const { email,password } = req.body

        const user = await User.findOne({ where:{email: email}})

        if(!user){
            res.render('auth/login', {
                message:'Now Sashay Away'
            })
            return
        }

        const passwordMatch = bcrypt.compareSync(password,user.password)

        if(!passwordMatch){
            res.render('auth/login',{
                message: 'Informações invalidas'
            })
            return
        }
    
     req.session.userid = user.id

     req.flash('message', 'Shantay, you stay!')

     req.session.save(()  =>{
        res.redirect('/')
     })
    }
 
    static register(req,res){
        res.render('auth/registrar')
    }

    static async registerPost(req, res){
        const {name, email, password, confirmpassword} = req.body

        if(password != confirmpassword){
            req.flash('message', 'Now Sashay Away')
            res.render('auth/register')
            return
        }
        
        const checkIfUserExists = await User.findOne({ where: {email: email}})

        if(checkIfUserExists){
            req.flash('message', 'Shantay, you stay')
            res.render('auth/login')
            return
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedPassoword = bcrypt.hashSync(password, salt)

        const user ={
            name,
            email,
            password: hashedPassoword,
        }

        User.create(user).then((user)=> {
            req.flash('message', ' Cadastrado realizado com sucesso')

            req.session.save(() =>{
                res.redirect('/')
            })
        })
        .catch((err) => console.error(err))

    }
}