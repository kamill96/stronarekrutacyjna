'use client';

import './add-job.css'; 

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="add-job-layout">
      {children} 
    </div>
  );
}
