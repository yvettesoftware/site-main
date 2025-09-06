const User = require('../models/User');
const UserIDSequence = require('../models/UserIDSequence');
const bcrypt = require('bcrypt');

function getTodayYYMMDD() {
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    return yy + mm + dd;
}

async function getNextUserID() {
    const today = getTodayYYMMDD();
    const seqDoc = await UserIDSequence.findOneAndUpdate(
        { date: today },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    const seqStr = String(seqDoc.seq).padStart(10, '0');
    return today + seqStr;
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        res.json({ message: "Login successful", userID: user.userID });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.register = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }
        // Only increment the sequence and generate userID when email is unique
        else {
            const userID = await getNextUserID();
            const password_hash = await bcrypt.hash(password, 10);
            const user = new User({ userID, email, password_hash });
            await user.save();
            res.status(201).json({ message: 'User registered successfully' });
        }
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};