const mongoose = require('mongoose');

const onboardingSchema = new mongoose.Schema({
    userID: { type: String, required: true, unique: true, ref: 'User' }, // Foreign key reference

    // Step 1: Terms & Conditions
    accept_terms: { type: Boolean, default: null },      // Whether user accepted Terms & Conditions
    accept_roi: { type: Boolean, default: null },        // Whether user accepted ROI Agreement
    accept_status: { type: Boolean, default: null },     // Overall acceptance status
    accept_timestamp: { type: Date, default: null },     // Date and time of acceptance
    ip_address: { type: String, default: null },         // IP address of acceptance

    // Step 2: Personal Information
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    phone_number: { type: String, default: null },
    current_address: { type: String, default: null },
    date_of_birth: { type: Date, default: null },
    race_ethnicity: {
        type: String, default: null,
        enum: [
            'White',
            'Black',
            'American Indian/Alaskan',
            'Latino/Hispanic',
            'Asian',
            'Pacific Islander/Hawaiian',
            'Other'
        ]
    },
    gender: {
        type: String, default: null,
        enum: ['Male', 'Female', 'Other']
    },
    marital_status: {
        type: String, default: null,
        enum: ['Single', 'Married', 'Separated', 'Divorced']
    },
    college_graduate: { type: Boolean, default: null },
    school_name: { type: String, default: null },
    degree: { type: String, default: null },
    currently_employed: { type: Boolean, default: null },
    employer_name: { type: String, default: null },
    position_title: { type: String, default: null },

    // Step 3: Security Questions
    first_pet_name: { type: String, default: null },
    favorite_superhero: { type: String, default: null },
    first_car_model: { type: String, default: null },

    // Step 4: Financial & Risk Assessment
    financial_satisfaction_score: { type: Number, min: 1, max: 10, default: null },
    current_finances_score: { type: Number, min: 1, max: 10, default: null },
    worry_monthly_expenses: { type: Boolean, default: null },
    financial_stress_today_score: { type: Number, min: 1, max: 10, default: null },
    general_financial_stress_score: { type: Number, min: 1, max: 10, default: null },
    emergency_fund_confidence_score: { type: Number, min: 1, max: 10, default: null },
    social_activity_limitation: { type: Boolean, default: null },
    paycheck_to_paycheck: { type: Boolean, default: null },
    monthly_expenses: { type: Number, default: null },
    monthly_income: { type: Number, default: null },
    income_debt_percentage: { type: Number, default: null }, // Calculated field
    viability_reason: {
        type: String, default: null,
        enum: [
            'Income low',
            'Cost of living high',
            'Credit card debt',
            'No help from family/friends',
            'Student Loan Debt'
        ]
    },

    // Step 5: Predatory Lending & Financial Hardship Assessment
    predatory_lending_experience: { type: Boolean, default: null },
    predatory_lending_description: { type: String, default: null },
    fear_predatory_lending_self: { type: Boolean, default: null },
    fear_predatory_lending_others: { type: Boolean, default: null },
    experienced_predatory_practices: [{
        type: String, default: null,
        enum: [
        'Excessive Security Deposits',
        'Non-Refundable Fees',
        'Bait-and-Switch Advertising',
        'Hidden Charges',
        'Withholding Deposits Unfairly',
        'Retaliatory Rent Increases',
        'Unlawful Evictions',
        'Lease Traps',
        'Failure to Disclose Hazards',
        'Overcharging Late Fees',
        'Renoviction Practices',
        'Utility Billing Fraud',
        'Inaccessible or Nonexistent Maintenance',
        'None of the Above'
    ]
    }],
    health_conditions_affecting_income: { type: Boolean, default: null },
    loan_default_due_to_marital_divorce: { type: Boolean, default: null },
    loan_default_due_to_job_loss: { type: Boolean, default: null },
    default_explanation: { type: String, default: null },

    // Step 6: Uploading Documentation for Income
    paystubs: [{
        filename: { type: String },
        url: { type: String }
    }],
    bank_statements: [{
        filename: { type: String },
        url: { type: String }
    }],

    // Step 7: Background Screening
    rent_to_income_ratio: { type: Number, default: null }, // Calculated field
    employment_stability_score: { type: Number, default: null },
    rental_history_score: { type: Number, default: null },
    occupancy_type: {
        type: String, default: null,
        enum: ['Home-based', 'Voucher']
    },
    criminal_history_score: { type: Number, default: null },

    // Step 8: Score Calculation & Classification Assignment
    user_acceptance: { type: Boolean, default: null },
    total_score: { type: Number, min: 0, max: 15, default: null },
    classification: {
        type: String, default: null,
        enum: ['Class A', 'Class B', 'Class C']
    },
    monthly_risk_fee: { type: Number, default: null },

    // Step 9: Screening Summary & Acceptance
    screening_score: { type: Number, default: null },
    risk_level: {
        type: String, default: null,
        enum: ['Low', 'Medium', 'High']
    },
    screening_summary: { type: String, default: null },
    accept_screening: { type: Boolean, default: null },
    accept_screening_timestamp: { type: Date, default: null },
    screening_status: {
        type: String, default: null,
        enum: ['Accepted', 'Pending', 'Declined']
    },
    onboarding_progress: {
        type: String, default: null,
        enum: ['Step1', 'Step2', 'Step3', 'Step4', 'Step5', 'Step6', 'Step7', 'Step8', 'Step9', 'Complete']
    },
}, { timestamps: true });

module.exports = mongoose.model('Onboarding', onboardingSchema);