import bcrypt from 'bcrypt';
import pool from '../db.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json({
        message: "all fields are required"
      });
    }

    const [existinguser] = await pool.query('select * from users Where email = ?', [email]);

    if (existinguser.length > 0) {
      return res.status(400).json({
        message: "email already exists"
      });
    }
    
    const hashedpassword = await bcrypt.hash(password, 10);
    const initials = name.trim().split(" ").map((word) => word[0]).join("").toUpperCase();

    const [result] = await pool.query(`INSERT INTO users(username,name,email,password_hash,initials,is_active) VALUES
        (?,?,?,?,?,?)`, [username, name, email, hashedpassword, initials, 1]);

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: {
        id: result.insertId,
        name,
        username,
        email,
        initials,
      },
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const login = async (req,res)=>{
  try{

    const{email,password}=req.body;
    if(!email || !password){
      return res.status(400).json({
      message:"email password not found"
      })
    } 

    const [users]= await pool.query("Select * from users where email = ?",[email]);

    if(users.length === 0){
      return res.status(400).json({
        message:"Email not found"
      })
    }
    const user= users[0]
    const isPasswordvalid = await bcrypt.compare(password,user.password_hash);

    if(!isPasswordvalid){
       return res.status(401).json({
        message:"Invalid email or password"
      })
    }
  const accesstoken = jwt.sign(
  {
    id:user.id,
    email:user.email
  },
  process.env.JWT_SECRET,
  {
    expiresIn:"15m"
  }
);
    const refreshtoken=jwt.sign({
    id:user.id
    },process.env.REFRESH_SECRET,{
      expiresIn:"7d"
    })

    res.cookie("refreshtoken",refreshtoken,{
      httpOnly:true,
      secure:false,
      sameSite:"strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.status(200).json({
      message:"login successful",
      accesstoken:accesstoken,
      user:{
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        initials: user.initials,
      }
    })
  }catch(error){
  console.error(error);

  return res.status(500).json({
    message: "Internal Server Error"
  });
}

}