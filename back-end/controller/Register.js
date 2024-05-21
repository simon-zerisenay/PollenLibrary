const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../Database/db');
const jwt = require('jsonwebtoken');

const RegisterUser = async (req, res) => {
    const { username, email, password, phone_num } = req.body;

    try {
        // Check if the user already exists
        const [existingUser] = await db.query("SELECT * FROM tbl_user WHERE email = ?", [email]);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const password_hash = await bcrypt.hash(password, 10);
        const isAdmin = false;

        // Insert user data into the database
        const user_result = await db.query(
            "INSERT INTO tbl_user (username, email, password_hash, isadmin, phone_num) VALUES (?, ?, ?, ?, ?)",
            [username, email, password_hash, isAdmin, phone_num]
        );

        // Generate JWT token
        const token = jwt.sign(
            { id: user_result.insertId, name: username, email: email },
            process.env.jwt_secret
        );

        // Send success response
        res.status(201).json({ message: 'User registered successfully', user: token });
        console.log("User registered successfully");
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
};

module.exports = RegisterUser;
