import React, { useEffect } from "react";

interface Props {
  children: React.ReactNode
  title?: string
}


export function Layout({ children, title }: Props) {
  useEffect(() => {
    document.title = title ? `${title} | NextJS App` : 'NextJS App';
  }, []);


  return (
    <div style={{ height: '100%' }}>
      <div className="layout__main-content">
        { children }
      </div>
    </div>
  );
}
