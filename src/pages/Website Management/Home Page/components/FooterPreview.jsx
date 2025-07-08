import React from 'react';

const FooterPreview = ({ data }) => {
  return (
    <div className="bg-gray-900 text-white p-8 rounded-lg">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">{data.footerBannerTitle}</h2>
        <div className="mb-6">
          <img
            src={data.footerBannerImage}
            alt="Footer Banner"
            className="w-full max-w-md mx-auto rounded-lg shadow-lg"
          />
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          {data.footerBannerButton}
        </button>
      </div>
    </div>
  );
};

export default FooterPreview;