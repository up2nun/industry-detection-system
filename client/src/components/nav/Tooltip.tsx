import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface TooltipProps {
  content: string;
  isVisible: boolean;
  position: { top: number; left: number } | null;
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({ content, isVisible, position, delay = 600 }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isVisible) {
      timeoutId = setTimeout(() => {
        setShowTooltip(true);
      }, delay);
    } else {
      setShowTooltip(false);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isVisible, delay]);

  if (!showTooltip || !position) return null;

  const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    top: position.top,
    left: position.left,
    zIndex: 9999,
    visibility: 'visible',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    backgroundColor: '#414052',
    color: '#fff',
    boxShadow: '0 10px 50px rgba(0, 0, 0, 0.1)',
    fontSize: '14px',
    fontWeight: '500',
  };

  return ReactDOM.createPortal(
    <div id="tooltip" role="tooltip" style={tooltipStyle}>
      {content}
    </div>,
    document.body
  );
};

export default Tooltip;
