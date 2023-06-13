import React from 'react';

type StyledButtonProps = {
  onClick: (data?:any) => void;
  title?: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const StyledButton: React.FC<StyledButtonProps> = ({ onClick, title, children, className, disabled }) => {
  return (
    <button className={`${className}`} onClick={onClick} disabled={disabled}>
      {title}
      {children}
    </button>
  )
}

StyledButton.defaultProps = {
  onClick: () => {},
  title: '',
  className: '',
  disabled: false
}

export default StyledButton;