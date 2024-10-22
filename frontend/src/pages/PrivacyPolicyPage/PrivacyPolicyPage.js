import React from 'react'

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto px-6 py-12 text-white">
      <h1 className="mb-6 text-center text-4xl font-bold">Privacy Policy</h1>

      {/* Introduction */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold text-slate-200">
          Introduction
        </h2>
        <p className="text-lg text-slate-300">
          At Highest Waves, we value your privacy and are committed to
          protecting your personal data. This Privacy Policy explains how we
          collect, use, and protect your information when you use our platform.
        </p>
      </section>

      {/* Data Collection */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold text-slate-200">
          Data We Collect
        </h2>
        <p className="text-lg text-slate-300">
          We collect the following types of data to provide our services:
        </p>
        <ul className="mt-4 list-disc pl-5 text-slate-300">
          <li className="mb-2">
            Personal Information: Name, email address, and contact details you
            provide during account registration or newsletter subscription.
          </li>
          <li className="mb-2">
            Usage Data: Information on how you use our platform, such as your
            interactions with our website, the pages you visit, and your
            preferences.
          </li>
          <li className="mb-2">
            Payment Data: Financial information necessary to process
            transactions, securely handled by third-party payment processors.
          </li>
        </ul>
      </section>

      {/* How We Use Your Data */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold text-slate-200">
          How We Use Your Data
        </h2>
        <p className="text-lg text-slate-300">We use your personal data to:</p>
        <ul className="mt-4 list-disc pl-5 text-slate-300">
          <li className="mb-2">
            Provide and improve our services, including managing your account
            and delivering customer support.
          </li>
          <li className="mb-2">
            Process transactions and ensure secure payments.
          </li>
          <li className="mb-2">
            Send updates, promotional materials, and other relevant
            communications, with your consent.
          </li>
        </ul>
      </section>

      {/* Data Sharing */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold text-slate-200">
          Data Sharing and Third-Party Services
        </h2>
        <p className="text-lg text-slate-300">
          We do not sell or rent your personal information to third parties.
          However, we may share your data with trusted third parties to provide
          services, including:
        </p>
        <ul className="mt-4 list-disc pl-5 text-slate-300">
          <li className="mb-2">
            Payment processors to handle transactions securely.
          </li>
          <li className="mb-2">
            Email service providers to send you updates and newsletters.
          </li>
          <li className="mb-2">
            Analytics providers to help us understand how users interact with
            our platform.
          </li>
        </ul>
        <p className="mt-4 text-lg text-slate-300">
          These third parties are bound by data protection regulations and may
          only use your information to perform the services agreed upon with us.
        </p>
      </section>

      {/* Data Security */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold text-slate-200">
          Data Security
        </h2>
        <p className="text-lg text-slate-300">
          We implement strict security measures to protect your data. This
          includes encryption, secure servers, and data access controls to
          ensure your personal information is safe from unauthorized access.
        </p>
      </section>

      {/* Your Rights */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold text-slate-200">
          Your Rights
        </h2>
        <p className="text-lg text-slate-300">
          You have the following rights concerning your personal data:
        </p>
        <ul className="mt-4 list-disc pl-5 text-slate-300">
          <li className="mb-2">
            Access: You can request to view the personal data we have on file
            for you.
          </li>
          <li className="mb-2">
            Correction: You can request corrections to any inaccurate or
            incomplete data.
          </li>
          <li className="mb-2">
            Deletion: You can request the deletion of your personal data in
            certain circumstances.
          </li>
          <li className="mb-2">
            Withdrawal of Consent: You may withdraw your consent for us to use
            your data at any time.
          </li>
        </ul>
        <p className="mt-4 text-lg text-slate-300">
          To exercise any of these rights, please contact us at{' '}
          <a
            href="mailto:support@highestwaves.com"
            className="text-cyan-400 underline hover:text-cyan-300"
          >
            support@highestwaves.com
          </a>
          .
        </p>
      </section>

      {/* Cookies */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold text-slate-200">Cookies</h2>
        <p className="text-lg text-slate-300">
          We use cookies to enhance your experience on our website. Cookies help
          us track your usage and preferences. You can manage your cookie
          preferences through your browser settings.
        </p>
      </section>

      {/* Changes to Policy */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold text-slate-200">
          Changes to This Privacy Policy
        </h2>
        <p className="text-lg text-slate-300">
          We may update this Privacy Policy periodically to reflect changes in
          our practices or legal requirements. You will be notified of any
          significant changes, and continued use of the platform implies your
          acceptance of the updated policy.
        </p>
      </section>

      {/* Contact Information */}
      <section className="mt-12 text-center">
        <p className="text-lg text-slate-300">
          If you have any questions or concerns about this Privacy Policy,
          please contact us at{' '}
          <a
            href="mailto:support@highestwaves.com"
            className="text-cyan-400 underline hover:text-cyan-300"
          >
            support@highestwaves.com
          </a>
          .
        </p>
      </section>
    </div>
  )
}

export default PrivacyPolicyPage
