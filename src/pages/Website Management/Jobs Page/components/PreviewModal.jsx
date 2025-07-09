import React from 'react';
import { X } from 'lucide-react';

const PreviewModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-2 border-b">
          <h2 className="text-xl font-semibold text-gray-800">{title} Preview</h2>
          <button
            onClick={onClose}
            className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;