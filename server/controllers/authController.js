import bcrypt from 'bcrypt';
import pool from '../db.js';

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
