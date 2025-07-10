import React from 'react';

const PrivacyPolicyPreview = ({ data }) => {
  return (
    <div className="bg-gradient-to-b from-black to-[#0A0E15] text-white p-8 rounded-lg">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="sm:text-4xl text-xl font-bold mb-6 text-white">{data?.privacyPolicyTitle || "Policy Revisions & Notices"}</h1>
        <p className="sm:text-lg text-lg font-bold mb-6 text-white">{data?.privacyPolicyDescription}</p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPreview;