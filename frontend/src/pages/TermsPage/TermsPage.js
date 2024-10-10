import React from 'react';

const TermsPage = () => {
  return (
    <div className="container mx-auto px-6 py-12 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Terms of Service</h1>

      {/* Introduction */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-slate-200">Introduction</h2>
        <p className="text-lg text-slate-300">
          Welcome to Highest Waves! By accessing or using our platform, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
        </p>
      </section>

      {/* User Responsibilities */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-slate-200">User Responsibilities</h2>
        <p className="text-lg text-slate-300">
          As a user of Highest Waves, you agree not to engage in any activity that could harm the platform or its users. This includes, but is not limited to, the following:
        </p>
        <ul className="list-disc pl-5 mt-4 text-slate-300">
          <li className="mb-2">Misuse of any provided content, including beats, media, or intellectual property.</li>
          <li className="mb-2">Unauthorized access to or tampering with our services or accounts.</li>
          <li className="mb-2">Violating any applicable laws or regulations while using the platform.</li>
        </ul>
      </section>

      {/* Intellectual Property */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-slate-200">Intellectual Property</h2>
        <p className="text-lg text-slate-300">
          All content on the Highest Waves platform, including beats, images, logos, and text, are protected by intellectual property laws. You may not use any content without proper authorization or unless it is provided for your personal use under these terms.
        </p>
      </section>

      {/* Payments and Refunds */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-slate-200">Payments and Refunds</h2>
        <p className="text-lg text-slate-300">
          All payments for beats and services are processed through secure third-party payment gateways. Refunds are subject to our discretion and based on specific terms outlined for each purchase.
        </p>
        <p className="text-lg text-slate-300 mt-4">
          Please contact our support team if you encounter any payment issues or require assistance with refunds.
        </p>
      </section>

      {/* Data Protection */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-slate-200">Privacy and Data Protection</h2>
        <p className="text-lg text-slate-300">
          We take the privacy of our users seriously. By using our platform, you agree to our <a href="/privacy-policy" className="underline text-cyan-400 hover:text-cyan-300">Privacy Policy</a>, which outlines how we collect, use, and protect your data.
        </p>
      </section>

      {/* Termination */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-slate-200">Termination</h2>
        <p className="text-lg text-slate-300">
          We reserve the right to terminate or suspend your account if you violate any of the terms outlined in this agreement or engage in behavior detrimental to the platform or its users.
        </p>
      </section>

      {/* Changes to Terms */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-slate-200">Changes to Terms</h2>
        <p className="text-lg text-slate-300">
          We may update these terms from time to time. You will be notified of any significant changes, and continued use of the platform after such changes implies your agreement to the updated terms.
        </p>
      </section>

      {/* Contact Information */}
      <section className="text-center mt-12">
        <p className="text-lg text-slate-300">
          If you have any questions or concerns about these terms, please contact us at <a href="mailto:support@highestwaves.com" className="underline text-cyan-400 hover:text-cyan-300">support@highestwaves.com</a>.
        </p>
      </section>
    </div>
  );
};

export default TermsPage;
