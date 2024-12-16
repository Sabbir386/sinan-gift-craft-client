import React from "react";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  return (
    <div className="px-6 py-10 lg:px-24 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
        Terms and Conditions
      </h1>

      <section className="mb-8">
        <h2 className="text-xl text-buttonBackground font-semibold mb-3">1. General Terms</h2>
        <p className="text-xs text-white">
          By accessing Cashooz, you agree to comply with these terms. Cashooz
          reserves the right to update these terms at any time, so please review
          them regularly. If you disagree with any part of the terms, please do
          not use our platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-buttonBackground">2. Eligibility</h2>
        <p className="text-xs text-white">
          To use Cashooz, you must be at least 18 years old. Users are
          responsible for ensuring that participation in our rewards and
          affiliate programs complies with local laws.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-buttonBackground">
          3. Account Responsibilities
        </h2>
        <p className="text-xs text-white">
          Users are responsible for maintaining the confidentiality of their
          account credentials. Any activity under your account is considered
          authorized by you, and you are responsible for securing your account.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-buttonBackground">4. Rewards and Earnings</h2>
        <p className="text-xs text-white">
          Cashooz offers rewards for completing offers and participating in
          affiliate programs. Reward points are subject to verification and may
          vary based on specific offers and eligibility requirements.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-buttonBackground">5. Payments</h2>
        <p className="text-xs text-white">
          Payments are processed via PayPal or Stripe, with an option for
          instant payouts. Users must ensure that their payment details are
          correct. Cashooz reserves the right to withhold or suspend payments if
          fraudulent activity is detected.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-buttonBackground">6. User Conduct</h2>
        <p className="text-xs text-white">
          Users agree to refrain from exploiting, abusing, or attempting to
          manipulate Cashooz’s offers, rewards, or payment systems. Violations
          may result in account suspension or termination.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-buttonBackground">
          7. Disclaimer and Liability
        </h2>
        <p className="text-xs text-white">
          Cashooz provides services as-is without warranties of any kind. We are
          not liable for any loss or damages arising from the use of our
          platform. Our liability is limited to the extent permitted by law.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-buttonBackground">8. Amendments</h2>
        <p className="text-xs text-white">
          Cashooz reserves the right to modify these terms at any time. Changes
          will be effective upon posting. Continued use of Cashooz implies
          acceptance of the updated terms.
        </p>
      </section>

      <section className="mt-10 text-center">
        <p className="text-sm text-white">
          For any questions or concerns regarding these Terms and Conditions,
          please contact us at support@cashooz.com.
        </p>
        <Link to={'/'} className="underline py-3 mt-3 inline-block text-buttonBackground">Back to Home</Link>
      </section>
    </div>
  );
};

export default TermsAndConditions;
