import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const signup = async (req,res)=>{
    console.log("Signup Called")
    const {username,email,password}= req.body;

    const existing = await User.findOne({email});
    if (existing){
        return res.status(400).json({ message: 'Email already registereed' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true, sameSite: 'Lax' });
    res.json({ message: 'User registered sucess..', user: { username, email } }); 

}

export const login = async (req, res) => {

  console.log("Login Called")

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  console.log("User got",user)

  if (!user || !(await bcrypt.compare(password, user.password))){
    console.log('Invalid credentials or User not Found')
    return res.status(400).json({ message: 'Invalid credentials or User not Found' });
    
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie('token', token, { httpOnly: true, sameSite: 'Lax' });
  res.json({ message: 'Login successful', user: { username: user.username, email } });
};

export const logout = (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out' });
};