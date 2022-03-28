import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

export default function RenderPortal({ children }) {
  const [portalNode, setPortalNode] = useState(null);

  useEffect(() => {
    const divElement = document.createElement('div');
    document.body.appendChild(divElement);

    setPortalNode(divElement);

    return () => {
      document.body.removeChild(divElement);
    };
  }, []);

  if (!portalNode) {
    return null;
  }

  return createPortal(children, portalNode);
}
