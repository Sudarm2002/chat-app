import React from 'react';

const SharedMediaGrid = ({ media }) => {
  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Shared Media</h4>
        <button className="text-xs text-blue-500 font-medium hover:underline">View All</button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {media.map((url, i) => (
          <div key={i} className="aspect-square rounded-lg overflow-hidden">
            <img src={url} alt={`media-${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SharedMediaGrid;
