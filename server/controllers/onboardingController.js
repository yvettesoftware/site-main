const Onboarding = require('../models/Onboarding');

exports.checkOnboardingByUserID = async (req, res) => {
    const { userID } = req.body;
    try {
        const onboarding = await Onboarding.findOne({ userID });
        if (!onboarding) {
            return res.status(404).json({ error: "No onboarding record found" });
        }
        res.json(onboarding);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.newOnboarding = async (req, res) => {
    const { userID, ...rest } = req.body;

    try {
        // Create a new onboarding record
        const onboarding = new Onboarding({ ...req.body });
        await onboarding.save();
        res.status(201).json({ message: 'Onboarding record created successfully', onboarding });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};

exports.updateOnboarding = async (req, res) => {
    try {
        const { userID, ...rest } = req.body;
        const onboarding = await Onboarding.findOneAndUpdate(
            { userID },
            { $set: rest },
            { new: true, upsert: true }
        );
        res.status(200).json(onboarding);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};

exports.uploadDocs = async (req, res) => {
    try {
        const { userID, onboarding_progress } = req.body;
        const paystubs = (req.files['paystubs'] || []).map(file => ({
            filename: file.filename,
            url: `/uploads/${file.filename}`
        }));
        const bank_statements = (req.files['bank_statements'] || []).map(file => ({
            filename: file.filename,
            url: `/uploads/${file.filename}`
        }));
        const update = {
            $push: {
                paystubs: { $each: paystubs },
                bank_statements: { $each: bank_statements }
            },
            $set: onboarding_progress ? { onboarding_progress } : {}
        };

        const onboarding = await Onboarding.findOneAndUpdate(
            { userID },
            update,
            { new: true }
        );
        res.status(200).json(onboarding);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};