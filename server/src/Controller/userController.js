const bcrypt = require('bcryptjs');
const User = require('../Model/userModel');
const { generateToken } = require('../Utils/jwtUtils');
const jwt = require('jsonwebtoken');
async function UserRegister(req, res) {
    const { username, email, password, contact } = req.body;
    try {
      const existingUser = await User.findOne({ where: { email} });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
      // Create new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({username, email, password: hashedPassword, contact});
  
      return res.status(201).json({ status: 'success'});
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

  async function UserLogin(req, res) {
    const { email, password } = req.body;
    console.log(email, password);
    
    try {
      const user = await User.findOne({ email });
      console.log("user=",user);
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const token = jwt.sign(
        { name: user.username, email: user.email, contact: user.contact, profile: user.profile, user: user._id }, 
        process.env.SECRET_KEY, 
        { expiresIn: '1h' }
      );
      // res.cookie('token', token, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === 'production',
      //   sameSite: 'Strict',
      //   maxAge: 3600000, // 1 hour
      // });
      // res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' , sameSite: 'Strict', maxAge: 3600000 });
      res.json({ data: token });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
  

async function UserUpdate(req, res) {
    const { username, contact } = req.body;
    const profilePictureUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    try {
        console.log('User ID:', req.user.user); 
        const user = await User.findById(req.user.user);
        console.log('User:', user); // Log the user object

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (username) user.username = username;
        if (contact) user.contact = contact;
        if (profilePictureUrl) user.profile = profilePictureUrl;

        await user.save();

        res.json({ 
            message: 'User details updated successfully', 
            user: { 
                username: user.username, 
                email: user.email, 
                contact: user.contact, 
                profile: user.profile 
            } 
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}


module.exports = {UserRegister, UserLogin, UserUpdate}