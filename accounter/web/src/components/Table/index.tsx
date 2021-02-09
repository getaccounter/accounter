import { ReactNode } from "react";

type HeadName<Value extends string = string> = {
  value: Value;
  label: ReactNode;
  hidden?: boolean;
};

type Entry<HeadValue extends string = string> = {
  [K in HeadValue]: ReactNode;
};

const Head = (props: { values: Array<HeadName> }) => (
  <thead className="bg-gray-50">
    <tr>
      {props.values.map(({ label, hidden, value }) =>
        hidden ? (
          <th key={value} scope="col" className="relative px-6 py-3">
            <span className="sr-only">{label}</span>
          </th>
        ) : (
          <th
            key={value}
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {label}
          </th>
        )
      )}
    </tr>
  </thead>
);

type Props<HeadValue extends string> = {
  title: string;
  head: Array<HeadName<HeadValue>>;
  entries: Array<Entry<HeadValue>>;
};
const Table = <HeadValue extends string>(props: Props<HeadValue>) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table
              title={props.title}
              className="min-w-full divide-y divide-gray-200"
            >
              <Head values={props.head} />
              <tbody className="bg-white divide-y divide-gray-200">
                {props.entries.map((entry, idx) => {
                  const sortedEntryCol = props.head.map(
                    ({ value }) => entry[value]
                  );
                  return <tr key={idx}>{sortedEntryCol}</tr>;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
