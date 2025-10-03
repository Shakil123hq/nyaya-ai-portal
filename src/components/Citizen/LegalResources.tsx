import React from 'react';

interface LegalResource {
  id: string;
  title: string;
  description: string;
  link: string;
}

interface LegalResourcesProps {
  resources: LegalResource[];
}

const LegalResources: React.FC<LegalResourcesProps> = ({ resources }) => {
  if (resources.length === 0) {
    return (
      <div className="bg-card p-6 rounded-lg shadow-sm">
        <p className="text-muted-foreground">No legal resources available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {resources.map((resource) => (
        <div key={resource.id} className="bg-card p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-lg">{resource.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
          <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Read More
          </a>
        </div>
      ))}
    </div>
  );
};

export default LegalResources;
