import React from 'react';
import { ChevronDown, ChevronUp, Edit2, Eye, Plus } from 'lucide-react';

const SectionCard = ({
  title,
  description,
  itemCount,
  onEdit,
  onPreview,
  children,
  openAddModal,
  isExpanded = false,
  onToggle
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm mb-3">{description}</p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-blue-600 font-medium">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onPreview}
              className="p-2 cursor-pointer text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Preview"
            >
              <Eye size={16} />
            </button>
            {openAddModal && (
              <button
                onClick={openAddModal}
                className="p-2 cursor-pointer text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="add"
              >
                <Plus size={16} />
              </button>
            )}
            {onEdit && (
              <button
                onClick={onEdit}
                className="p-2 cursor-pointer text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="add"
              >
                <Edit2 size={16} />
              </button>
            )}
            {onToggle && (
              <button
                onClick={onToggle}
                className="p-2 cursor-pointer text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            )}
          </div>
        </div>
      </div>

      {isExpanded && children && (
        <div className="border-t bg-gray-50 p-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default SectionCard;