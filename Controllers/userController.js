
const User = require('../Modals/User')

const bcrypt = require('bcryptjs');


const generateToken = require('../utils/generateToken')


// register user
const registerUser = async (request, response) => {
   try{
      
      const {username, password} = request.body;
      
      // Validation: Check if required fields are missing
      if(!username || !password ){
        return response.status(400).json({error_msg: 'Please provide all required fields...'})
      } 

      const user = await User.findOne({username})
      
      // Validation: Check if email is already registered
      if(user){
        return response.status(400).json({error_msg: "user already exists..."})
      }
      
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10)
     
      const userDetails = {
        username,
        password: hashedPassword,
      }

      // create new user instance
      const newUser = new User(userDetails)
      
      // Save user to database
      await newUser.save()
      response.status(201).json({message: 'User created successfully', user })

   }catch(error){
      console.log(error)
      return response.status(500).json({error_msg: 'Internal Server Error..'})
   }
}


// login user
const LoginUser = async (request, response) => {

    try{
        const {username, password } = request.body
        if(!username || !password ){
            return response.status(400).json({error_msg: 'Please enter required username and password'})
        }

        const user = await User.findOne({username})

        if(!user){
            return response.status(401).json({error_msg: "Invalid username"})
        }

        const dbPassword = user.password

        const isPasswordMatched = await bcrypt.compare(password, dbPassword)
        if(isPasswordMatched){
            const token = generateToken(user)
            return response.status(200).json({message: "Login Success", token})
        }else{
            return response.status(401).json({error_msg: "Invalid Password"})
        }
    }catch(err){
        console.log(err)
        return response.status(500).json({error_msg: "Internal Server Error!"})
    }
    
}

module.exports = {registerUser, LoginUser}