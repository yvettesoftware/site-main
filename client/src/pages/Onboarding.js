import { useState, useEffect } from "react";

const TOTAL_STEPS = 9;

function Onboarding() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1 variables
        accept_terms: false,
        accept_roi: false,
        // Step 2 variables
        first_name: "",
        last_name: "",
        phone_number: "",
        current_address: "",
        date_of_birth: "",
        race_ethnicity: "",
        gender: "",
        marital_status: "",
        college_graduate: false,
        school_name: "",
        degree: "",
        currently_employed: false,
        employer_name: "",
        position_title: "",
        // Step 3 variables
        first_pet_name: "",
        favorite_superhero: "",
        first_car_model: "",
        // Step 4 variables
        financial_satisfaction_score: 1,
        current_finances_score: 1,
        worry_monthly_expenses: false,
        financial_stress_today_score: 1,
        general_financial_stress_score: 1,
        emergency_fund_confidence_score: 1,
        social_activity_limitation: false,
        paycheck_to_paycheck: false,
        monthly_expenses: "",
        monthly_income: "",
        income_debt_percentage: "",
        viability_reason: "",
        // Step 5 variables
        predatory_lending_experience: false,
        predatory_lending_description: "",
        fear_predatory_lending_self: false,
        fear_predatory_lending_others: false,
        experienced_predatory_practices: [],
        health_conditions_affecting_income: false,
        loan_default_due_to_marital_divorce: false,
        loan_default_due_to_job_loss: false,
        default_explanation: "",
        // Step 6 variables
        paystubs: [],
        bank_statements: [],
        // Step 7 variables
        rent_to_income_ratio: "",
        employment_stability_score: 1,
        rental_history_score: 1,
        occupancy_type: "",
        criminal_history_score: 1,
        // Step 8 variables
        total_score: "",
        classification: "",
        monthly_risk_fee: "",
        user_acceptance: false,
        // Step 9 variables
        screening_score: "",
        screening_status: "",
        risk_level: "",
        screening_summary: "",
        accept_screening: false,
        accept_screening_timestamp: "",
    });

    // Hardcoded agreements
    const termsText = "These are the Terms & Conditions. Please read and accept to continue.";
    const roiText = "This is the Release of Information Agreement. Please read and accept to continue.";

    const [error, setError] = useState("");
    const userID = localStorage.getItem('userID');

    // Check if onboarding was already started and continue the progress
    useEffect(() => {
        async function fetchOnboardingStep() {
            if (!userID) {
                setStep(1);
                return;
            }
            try {
                const res = await fetch('http://localhost:5000/api/onboarding/check', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userID })
                });
                if (res.ok) {
                    const onboarding = await res.json();
                    const progress = onboarding.onboarding_progress;
                    setFormData(prev => ({ ...prev, ...onboarding }));
                    if (progress && progress.startsWith('Step')) {
                        const savedStep = parseInt(progress.replace('Step', ''), 10);
                        setStep(savedStep >= 1 && savedStep <= TOTAL_STEPS ? savedStep : 1);
                    } else if (progress === 'Complete') {
                        setTimeout(() => {
                            window.location.href = "/dashboard";
                        }, 1000);
                    } else {
                        setStep(1);
                    }
                } else {
                    setStep(1);
                }
            } catch (err) {
                console.error(err);
                setError("Could not load onboarding progress. Please try again.");
            }
        }
        fetchOnboardingStep();
    }, [userID]);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleNext = async () => {
        setError("");
        if (step === 1) {
            const accept_status = formData.accept_terms && formData.accept_roi;

            let ip = "";
            try {
                const ipRes = await fetch("https://api.ipify.org?format=json");
                if (ipRes.ok) {
                    const ipData = await ipRes.json();
                    ip = ipData.ip;
                }
            } catch (err) {
                console.error(err);
                setError("Could not fetch IP address.");
            }

            try {
                const payload = {
                    userID,
                    accept_terms: formData.accept_terms,
                    accept_roi: formData.accept_roi,
                    accept_status,
                    accept_timestamp: new Date(),
                    ip_address: ip,
                    onboarding_progress: `Step${step + 1}`
                }
                const res = await fetch('http://localhost:5000/api/onboarding/start', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (res.ok) {
                    setStep(2);
                } else {
                    const errData = await res.json();
                    setError("Failed to save. Please try again.");
                }
            } catch (err) {
                console.error(err);
                setError("Failed to save. Please try again.")
            }
        }
        else if (step === 6) {
            try {
                const uploadData = new FormData();
                uploadData.append('userID', userID);
                uploadData.append('onboarding_progress', `Step${step + 1}`);
                for (const file of formData.paystubs) {
                    uploadData.append('paystubs', file);
                }
                for (const file of formData.bank_statements) {
                    uploadData.append('bank_statements', file);
                }
                const res = await fetch('http://localhost:5000/api/onboarding/upload-docs', {
                    method: 'POST',
                    body: uploadData
                });
                if (res.ok) {
                    setStep(step + 1);
                } else {
                    setError("Failed to upload documents. Please try again.");
                }
            } catch (err) {
                console.error(err);
                setError("Server error. Try again later.")
            }
        }
        else if (step === 9) {
            try {
                const payload = {
                    ...formData,
                    userID,
                    onboarding_progress: "Complete"
                };
                const res = await fetch('http://localhost:5000/api/onboarding/continue', {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });
                if (res.ok) {
                    setTimeout(() => {
                        window.location.href = "/dashboard";
                    }, 1000);
                } else {
                    setError("Failed to save. Please try again later.");
                }
            } catch (err) {
                console.error(err);
                setError("Failed to save. Please try again.");
            }
        }
        else {
            try {
                const payload = {
                    ...formData,
                    userID,
                    onboarding_progress: `Step${step + 1}`
                };
                const res = await fetch('http://localhost:5000/api/onboarding/continue', {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });
                if (res.ok) {
                    setStep(step + 1);
                } else {
                    setError("Failed to save. Please try again later.");
                }
            } catch (err) {
                console.error(err);
                setError("Failed to save. Please try again.");
            }
        }
    };

    // Example content for each step (customize as needed)
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <h3 className="mb-4">Terms & Conditions</h3>
                        <div className="mb-3">
                            <label><b>Terms & Conditions</b></label>
                            <div className="border p-2" style={{ maxHeight: 120, overflowY: "auto" }}>{termsText}</div>
                        </div>
                        <div className="mb-3">
                            <label><b>Release of Information Agreement</b></label>
                            <div className="border p-2" style={{ maxHeight: 120, overflowY: "auto" }}>{roiText}</div>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                name="accept_terms"
                                checked={formData.accept_terms}
                                onChange={handleChange}
                                className="form-check-input"
                                id="accept_terms"
                            />
                            <label className="form-check-label" htmlFor="accept_terms">
                                I accept the Terms & Conditions
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                name="accept_roi"
                                checked={formData.accept_roi}
                                onChange={handleChange}
                                className="form-check-input"
                                id="accept_roi"
                            />
                            <label className="form-check-label" htmlFor="accept_roi">
                                I accept the Release of Information Agreement
                            </label>
                        </div>
                        {error && <div className="alert alert-danger mt-2">{error}</div>}
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h3 className="mb-4">Personal Information</h3>
                        <label>First Name:</label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="form-control"
                        />
                        <label>Last Name:</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="form-control"
                        />
                        <label>Phone Number:</label>
                        <input
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            className="form-control"
                        />
                        <label>Current Address:</label>
                        <input
                            type="text"
                            name="current_address"
                            value={formData.current_address}
                            onChange={handleChange}
                            className="form-control"
                        />
                        <label>Date of Birth:</label>
                        <input
                            type="date"
                            name="date_of_birth"
                            value={formData.date_of_birth}
                            onChange={handleChange}
                            className="form-control"
                        />
                        <label>Race/Ethnicity:</label>
                        <select
                            name="race_ethnicity"
                            value={formData.race_ethnicity}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="">Select</option>
                            <option value="White">White</option>
                            <option value="Black">Black</option>
                            <option value="American Indian/Alaskan">American Indian/Alaskan</option>
                            <option value="Latino/Hispanic">Latino/Hispanic</option>
                            <option value="Asian">Asian</option>
                            <option value="Pacific Islander/Hawaiian">Pacific Islander/Hawaiian</option>
                            <option value="Other">Other</option>
                        </select>
                        <label>Gender:</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <label>Marital Status:</label>
                        <select
                            name="marital_status"
                            value={formData.marital_status}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="">Select</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Separated">Separated</option>
                            <option value="Divorced">Divorced</option>
                        </select>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                name="college_graduate"
                                checked={formData.college_graduate}
                                onChange={handleChange}
                                className="form-check-input"
                                id="college_graduate"
                            />
                            <label className="form-check-label" htmlFor="college_graduate">
                                College Graduate
                            </label>
                        </div>
                        <label>School Name:</label>
                        <input
                            type="text"
                            name="school_name"
                            value={formData.school_name}
                            onChange={handleChange}
                            className="form-control"
                        />
                        <label>Degree:</label>
                        <input
                            type="text"
                            name="degree"
                            value={formData.degree}
                            onChange={handleChange}
                            className="form-control"
                        />
                        <div className="form-check">
                            <input
                                type="checkbox"
                                name="currently_employed"
                                checked={formData.currently_employed}
                                onChange={handleChange}
                                className="form-check-input"
                                id="currently_employed"
                            />
                            <label className="form-check-label" htmlFor="currently_employed">
                                Currently Employed
                            </label>
                        </div>
                        <label>Employer Name:</label>
                        <input
                            type="text"
                            name="employer_name"
                            value={formData.employer_name}
                            onChange={handleChange}
                            className="form-control"
                        />
                        <label>Position Title:</label>
                        <input
                            type="text"
                            name="position_title"
                            value={formData.position_title}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {error && <div className="alert alert-danger mt-2">{error}</div>}
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h3 className="mb-4">Security Questions</h3>
                        <label>First Pet's Name:</label>
                        <input
                            type="text"
                            name="first_pet_name"
                            value={formData.first_pet_name}
                            onChange={handleChange}
                            className="form-control"
                        />
                        <label>Favorite Superhero:</label>
                        <input
                            type="text"
                            name="favorite_superhero"
                            value={formData.favorite_superhero}
                            onChange={handleChange}
                            className="form-control"
                        />
                        <label>First Car Model:</label>
                        <input
                            type="text"
                            name="first_car_model"
                            value={formData.first_car_model}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {error && <div className="alert alert-danger mt-2">{error}</div>}
                    </div>
                );
            case 4:
                return (
                    <div>
                        <h2 className="mb-4">Financial Well-Being & Stress</h2>
                        <label>Satisfaction with current financial status (1-10):</label>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <input
                                type="range"
                                min={1}
                                max={10}
                                name="financial_satisfaction_score"
                                value={formData.financial_satisfaction_score || 1}
                                onChange={handleChange}
                                className="form-range"
                                style={{ width: "85%" }}
                            />
                            <span>
                                {formData.financial_satisfaction_score || 1} / 10
                            </span>
                        </div>

                        <label>Your current finances (1-10):</label>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <input
                                type="range"
                                min={1}
                                max={10}
                                name="current_finances_score"
                                value={formData.current_finances_score || 1}
                                onChange={handleChange}
                                className="form-range"
                                style={{ width: "85%" }}
                            />
                            <span>
                                {formData.current_finances_score || 1} / 10
                            </span>
                        </div>

                        <div className="form-check my-2">
                            <input
                                type="checkbox"
                                name="worry_monthly_expenses"
                                checked={!!formData.worry_monthly_expenses}
                                onChange={handleChange}
                                className="form-check-input"
                                id="worry_monthly_expenses"
                            />
                            <label className="form-check-label" htmlFor="worry_monthly_expenses">
                                I worry about paying monthly expenses
                            </label>
                        </div>

                        <label>Your level of financial stress today (1-10):</label>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <input
                                type="range"
                                min={1}
                                max={10}
                                name="financial_stress_today_score"
                                value={formData.financial_stress_today_score || 1}
                                onChange={handleChange}
                                className="form-range"
                                style={{ width: "85%" }}
                            />
                            <span>
                                {formData.financial_stress_today_score || 1} / 10
                            </span>
                        </div>

                        <label>Stress level for personal finances in general (1-10):</label>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <input
                                type="range"
                                min={1}
                                max={10}
                                name="general_financial_stress_score"
                                value={formData.general_financial_stress_score || 1}
                                onChange={handleChange}
                                className="form-range"
                                style={{ width: "85%" }}
                            />
                            <span>
                                {formData.general_financial_stress_score || 1} / 10
                            </span>
                        </div>

                        <label>Confidence to find money for a $1200 emergency fund (1-10):</label>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <input
                                type="range"
                                min={1}
                                max={10}
                                name="emergency_fund_confidence_score"
                                value={formData.emergency_fund_confidence_score || 1}
                                onChange={handleChange}
                                className="form-range"
                                style={{ width: "85%" }}
                            />
                            <span>
                                {formData.emergency_fund_confidence_score || 1} / 10
                            </span>
                        </div>

                        <div className="form-check my-2">
                            <input
                                type="checkbox"
                                name="social_activity_limitation"
                                checked={!!formData.social_activity_limitation}
                                onChange={handleChange}
                                className="form-check-input"
                                id="social_activity_limitation"
                            />
                            <label className="form-check-label" htmlFor="social_activity_limitation">
                                I want to do social activities, but can't due to my financial situation
                            </label>
                        </div>

                        <div className="form-check my-2">
                            <input
                                type="checkbox"
                                name="paycheck_to_paycheck"
                                checked={!!formData.paycheck_to_paycheck}
                                onChange={handleChange}
                                className="form-check-input"
                                id="paycheck_to_paycheck"
                            />
                            <label className="form-check-label" htmlFor="paycheck_to_paycheck">
                                I live paycheck to paycheck
                            </label>
                        </div>

                        <label>Total monthly expenses:</label>
                        <input
                            type="number"
                            name="monthly_expenses"
                            value={formData.monthly_expenses || ""}
                            onChange={handleChange}
                            className="form-control"
                        />

                        <label>Total monthly income:</label>
                        <input
                            type="number"
                            name="monthly_income"
                            value={formData.monthly_income || ""}
                            onChange={handleChange}
                            className="form-control"
                        />

                        {/* Calculate and display income_debt_percentage here */}

                        <label>If you are not financially viable, what is the main reason?</label>
                        <select
                            name="viability_reason"
                            value={formData.viability_reason || ""}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="">Select</option>
                            <option value="Income low">Income isn’t high enough</option>
                            <option value="Cost of living high">Cost of living is too high</option>
                            <option value="Credit card debt">Credit card debt</option>
                            <option value="No help from family/friends">Family/friends can’t help</option>
                            <option value="Student Loan Debt">Student loan debt</option>
                        </select>
                        {error && <div className="alert alert-danger mt-2">{error}</div>}
                    </div >
                );
            case 5:
                return (
                    <div>
                        <h3 className="mb-4">Predatory Lending & Financial Hardship Assessment</h3>
                        <div className="form-check mb-2">
                            <input
                                type="checkbox"
                                name="predatory_lending_experience"
                                checked={!!formData.predatory_lending_experience}
                                onChange={handleChange}
                                className="form-check-input"
                                id="predatory_lending_experience"
                            />
                            <label className="form-check-label" htmlFor="predatory_lending_experience">
                                Have you or anyone you know been involved in a Predatory Lending Practices case?
                            </label>
                        </div>
                        {formData.predatory_lending_experience && (
                            <div className="mb-2">
                                <label>If yes, please explain the situation:</label>
                                <textarea
                                    name="predatory_lending_description"
                                    value={formData.predatory_lending_description}
                                    onChange={handleChange}
                                    className="form-control"
                                    rows={2}
                                />
                            </div>
                        )}

                        <div className="form-check mb-2">
                            <input
                                type="checkbox"
                                name="fear_predatory_lending_self"
                                checked={!!formData.fear_predatory_lending_self}
                                onChange={handleChange}
                                className="form-check-input"
                                id="fear_predatory_lending_self"
                            />
                            <label className="form-check-label" htmlFor="fear_predatory_lending_self">
                                You fear this will happen to you?
                            </label>
                        </div>
                        <div className="form-check mb-2">
                            <input
                                type="checkbox"
                                name="fear_predatory_lending_others"
                                checked={!!formData.fear_predatory_lending_others}
                                onChange={handleChange}
                                className="form-check-input"
                                id="fear_predatory_lending_others"
                            />
                            <label className="form-check-label" htmlFor="fear_predatory_lending_others">
                                You fear this would happen to someone you know?
                            </label>
                        </div>

                        <label>Select experienced predatory rental practices:</label>
                        <select
                            name="experienced_predatory_practices"
                            value={formData.experienced_predatory_practices}
                            onChange={e =>
                                setFormData({
                                    ...formData,
                                    experienced_predatory_practices: Array.from(
                                        e.target.selectedOptions,
                                        option => option.value
                                    ),
                                })
                            }
                            className="form-control"
                            multiple
                        >
                            <option value="Excessive Security Deposits">Excessive Security Deposits</option>
                            <option value="Non-Refundable Fees">Non-Refundable Fees</option>
                            <option value="Bait-and-Switch Advertising">Bait-and-Switch Advertising</option>
                            <option value="Hidden Charges">Hidden Charges</option>
                            <option value="Withholding Deposits Unfairly">Withholding Deposits Unfairly</option>
                            <option value="Retaliatory Rent Increases">Retaliatory Rent Increases</option>
                            <option value="Unlawful Evictions">Unlawful Evictions</option>
                            <option value="Lease Traps">Lease Traps</option>
                            <option value="Failure to Disclose Hazards">Failure to Disclose Hazards</option>
                            <option value="Overcharging Late Fees">Overcharging Late Fees</option>
                            <option value="Renoviction Practices">"Renoviction" Practices</option>
                            <option value="Utility Billing Fraud">Utility Billing Fraud</option>
                            <option value="Inaccessible or Nonexistent Maintenance">Inaccessible or Nonexistent Maintenance</option>
                            <option value="None of the Above">None of the Above</option>
                        </select>

                        <div className="form-check my-2">
                            <input
                                type="checkbox"
                                name="health_conditions_affecting_income"
                                checked={!!formData.health_conditions_affecting_income}
                                onChange={handleChange}
                                className="form-check-input"
                                id="health_conditions_affecting_income"
                            />
                            <label className="form-check-label" htmlFor="health_conditions_affecting_income">
                                Any health conditions that impact ability to generate income over time?
                            </label>
                        </div>
                        <div className="form-check mb-2">
                            <input
                                type="checkbox"
                                name="loan_default_due_to_marital_divorce"
                                checked={!!formData.loan_default_due_to_marital_divorce}
                                onChange={handleChange}
                                className="form-check-input"
                                id="loan_default_due_to_marital_divorce"
                            />
                            <label className="form-check-label" htmlFor="loan_default_due_to_marital_divorce">
                                Ever defaulted on a loan due to marital/divorce-related circumstances?
                            </label>
                        </div>
                        <div className="form-check mb-2">
                            <input
                                type="checkbox"
                                name="loan_default_due_to_job_loss"
                                checked={!!formData.loan_default_due_to_job_loss}
                                onChange={handleChange}
                                className="form-check-input"
                                id="loan_default_due_to_job_loss"
                            />
                            <label className="form-check-label" htmlFor="loan_default_due_to_job_loss">
                                Ever defaulted on a loan due to job loss?
                            </label>
                        </div>
                        {(formData.loan_default_due_to_marital_divorce || formData.loan_default_due_to_job_loss) && (
                            <div className="mb-2">
                                <label>You answered "Yes" to either of the above loan default questions, please explain the situation:</label>
                                <textarea
                                    name="default_explanation"
                                    value={formData.default_explanation}
                                    onChange={handleChange}
                                    className="form-control"
                                    rows={2}
                                />
                            </div>
                        )}
                        {error && <div className="alert alert-danger mt-2">{error}</div>}
                    </div>
                );
            case 6:
                return (
                    <div>
                        <h3 className="mb-4">Upload Documentation for Income</h3>
                        <div className="mb-3">
                            <label>Upload Paystubs:</label>
                            <input
                                type="file"
                                multiple
                                accept="application/pdf,image/*"
                                onChange={e => setFormData({
                                    ...formData,
                                    paystubs: Array.from(e.target.files)
                                })}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label>Upload Bank Statements:</label>
                            <input
                                type="file"
                                multiple
                                accept="application/pdf,image/*"
                                onChange={e => setFormData({
                                    ...formData,
                                    bank_statements: Array.from(e.target.files)
                                })}
                                className="form-control"
                            />
                        </div>
                        {error && <div className="alert alert-danger mt-2">{error}</div>}
                    </div>
                );
            case 7:
                return (
                    <div>
                        <h3 className="mb-4">Background Screening</h3>

                        {/* Rent to income ratio to be calculated */}

                        <label>Employment Stability Score (1-10):</label>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <input
                                type="range"
                                name="employment_stability_score"
                                value={formData.employment_stability_score || 1}
                                onChange={handleChange}
                                className="form-range"
                                min={1}
                                max={10}
                                style={{ width: "85%" }}
                            />
                            <span>{formData.employment_stability_score || 1} / 10</span>
                        </div>

                        <label>Rental History Score (1-10):</label>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <input
                                type="range"
                                name="rental_history_score"
                                value={formData.rental_history_score || 1}
                                onChange={handleChange}
                                className="form-range"
                                min={1}
                                max={10}
                                style={{ width: "85%" }}
                            />
                            <span>{formData.rental_history_score || 1} / 10</span>
                        </div>

                        <label>Occupancy Type:</label>
                        <select
                            name="occupancy_type"
                            value={formData.occupancy_type}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="">Select</option>
                            <option value="Home-based">Home-based</option>
                            <option value="Voucher">Voucher</option>
                        </select>

                        <label>Criminal History Score (1-10):</label>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <input
                                type="range"
                                name="criminal_history_score"
                                value={formData.criminal_history_score || 1}
                                onChange={handleChange}
                                className="form-range"
                                min={1}
                                max={10}
                                style={{ width: "85%" }}
                            />
                            <span>{formData.criminal_history_score || 1} / 10</span>
                        </div>

                        {error && <div className="alert alert-danger mt-2">{error}</div>}
                    </div >
                );
            case 8:
                return (
                    <div>
                        <h3 className="mb-4">Score Calculation & Classification Assignment</h3>

                        <label>Total Score (0-15):</label>
                        <input
                            type="number"
                            name="total_score"
                            value={formData.total_score}
                            onChange={handleChange}
                            className="form-control"
                            min={0}
                            max={15}
                        />

                        <label>Classification:</label>
                        <select
                            name="classification"
                            value={formData.classification}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="">Select</option>
                            <option value="Class A">Class A</option>
                            <option value="Class B">Class B</option>
                            <option value="Class C">Class C</option>
                        </select>

                        <label>Monthly Risk Fee:</label>
                        <input
                            type="number"
                            name="monthly_risk_fee"
                            value={formData.monthly_risk_fee}
                            onChange={handleChange}
                            className="form-control"
                            min={0}
                        />

                        <div className="form-check mb-3">
                            <input
                                type="checkbox"
                                name="user_acceptance"
                                checked={!!formData.user_acceptance}
                                onChange={handleChange}
                                className="form-check-input"
                                id="user_acceptance"
                            />
                            <label className="form-check-label" htmlFor="user_acceptance">
                                I accept the calculated score and classification
                            </label>
                        </div>

                        {error && <div className="alert alert-danger mt-2">{error}</div>}
                    </div>
                );
            case 9:
                return (
                    <div>
                        <h3 className="mb-4">Screening Summary & Acceptance</h3>

                        <label>Screening Score:</label>
                        <input
                            type="number"
                            name="screening_score"
                            value={formData.screening_score}
                            onChange={handleChange}
                            className="form-control"
                            min={0}
                        />

                        <label>Screening Status:</label>
                        <select
                            name="screening_status"
                            value={formData.screening_status}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="">Select</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Pending">Pending</option>
                            <option value="Declined">Declined</option>
                        </select>

                        <label>Risk Level:</label>
                        <select
                            name="risk_level"
                            value={formData.risk_level}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="">Select</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>

                        <label>Screening Summary:</label>
                        <textarea
                            name="screening_summary"
                            value={formData.screening_summary}
                            onChange={handleChange}
                            className="form-control"
                            rows={3}
                        />

                        <div className="form-check my-3">
                            <input
                                type="checkbox"
                                name="accept_screening"
                                checked={!!formData.accept_screening}
                                onChange={e => setFormData({
                                    ...formData,
                                    accept_screening: e.target.checked,
                                    accept_screening_timestamp: e.target.checked ? new Date().toISOString() : ""
                                })}
                                className="form-check-input"
                                id="accept_screening"
                            />
                            <label className="form-check-label" htmlFor="accept_screening">
                                I accept the screening results
                            </label>
                        </div>

                        {error && <div className="alert alert-danger mt-2">{error}</div>}
                    </div>
                );

            default:
                return (
                    <div>
                        <h4>Onboarding Complete!</h4>
                    </div>
                );
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: 600, position: "relative" }}>
            {/* UserID on top right */}
            <div style={{
                position: "absolute",
                top: 10,
                right: 20,
                fontSize: "0.95rem",
                color: "#888"
            }}>
                UserID: {userID}
            </div>

            {/* Progress Bar */}
            <div className="progress mb-4">
                <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                    aria-valuenow={step}
                    aria-valuemin={1}
                    aria-valuemax={TOTAL_STEPS}
                >
                    Step {step} of {TOTAL_STEPS}
                </div>
            </div>

            {/* Step Content */}
            <form
                autoComplete="on"
                onSubmit={e => {
                    e.preventDefault();
                    handleNext();
                }}
            >
                {renderStep()}
                <div className="d-flex justify-content-end mt-4">
                    <button type="submit" className="btn btn-primary">
                        {step < TOTAL_STEPS ? "Save & Continue" : "Finish"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Onboarding;