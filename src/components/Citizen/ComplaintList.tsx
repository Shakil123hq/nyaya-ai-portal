import React from 'react';

interface Complaint {
  id: string;
  type: string;
  subject: string;
  status: string;
  date: string;
}

interface ComplaintListProps {
  complaints: Complaint[];
}

const ComplaintList: React.FC<ComplaintListProps> = ({ complaints }) => {
  if (complaints.length === 0) {
    return (
      <div className="bg-card p-6 rounded-lg shadow-sm">
        <p className="text-muted-foreground">No complaints filed yet. File a new complaint to see it here.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {complaints.map((complaint) => (
        <div key={complaint.id} className="bg-card p-4 rounded-lg shadow-sm flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-lg">{complaint.subject}</h3>
            <p className="text-sm text-muted-foreground">Type: {complaint.type} | Status: {complaint.status}</p>
            <p className="text-xs text-muted-foreground">Filed on: {complaint.date}</p>
          </div>
          <button className="text-primary hover:underline">View Details</button>
        </div>
      ))}
    </div>
  );
};

export default ComplaintList;
