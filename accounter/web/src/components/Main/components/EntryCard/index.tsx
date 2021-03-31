import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  to: string;
  imgSrc: string;
  secondary?: ReactNode;
  children: ReactNode;
  rightSide?: ReactNode;
};

const EntryCard = ({ imgSrc, to, secondary, children, rightSide }: Props) => {
  return (
    <div className="flex items-center space-x-3 justify-between">
      <div className="flex-shrink-0">
        <img className="h-10 w-10 rounded-full" src={imgSrc} alt="" />
      </div>
      <div className="flex-1 min-w-0">
        <Link to={to} className="focus:outline-none">
          {/* Extend touch target to entire panel */}
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-900">{children}</p>
          {secondary && <p className="text-sm text-gray-500 truncate">{secondary}</p>}
        </Link>
      </div>
      {rightSide}
    </div>
  );
};

export default EntryCard;
