import React from 'react';

const SectionTitle = ({title, description}) => {
    return (
        <div>
          <div className="w-full py-4 px-4">
  <div className="max-w-6xl mx-auto text-center">
    <h2 
      className="text-4xl md:text-5xl font-bold mb-4"
      style={{
        color: '#041E2B',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
      }}
    >
      {title}
    </h2>
    
    <p className="text-[#041E2B] max-w-2xl pb-4 mx-auto text-lg">
      {description}
    </p>
    <hr className="  h-1 mx-auto bg-[#6f6f6f]" />
  </div>
</div>  
        </div>
    );
};

export default SectionTitle;