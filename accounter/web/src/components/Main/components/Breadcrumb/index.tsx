import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/solid';

type Props = {
  title: ReactNode;
  to: string;
};
const Breadcrumb = ({ title, to }: Props) => {
  return (
    <nav className="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden" aria-label="Breadcrumb">
      <Link to={to} className="inline-flex items-center space-x-3 text-sm font-medium text-gray-900">
        <ChevronLeftIcon className="-mAppl-2 h-5 w-5 text-gray-400" />
        <span>{title}</span>
      </Link>
    </nav>
  );
};

export default Breadcrumb;
