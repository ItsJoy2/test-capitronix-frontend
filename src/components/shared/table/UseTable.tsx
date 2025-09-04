import { cn } from "@/lib/utils";

interface THeadProps {
  item: string;
  className?: string;
}
const THead = ({ item, className }: THeadProps) => (
  <th className={cn("px-4 py-2 text-start whitespace-nowrap bg-green-300", className)}>
    {item}
  </th>
);

interface TDataProps {
  children: React.ReactNode;
  className?: string;
}
export const TData = ({ children, className }: TDataProps) => (
  <td
    className={cn(
      "px-4 py-2 text-start text-[14px] border-b border-[#ABADB5] font-light text-[#ffffff] whitespace-nowrap",
      className
    )}
  >
    {children}
  </td>
);

interface PaymentLogProps {
  headers: string[];
  className?: string;
  children: React.ReactNode;
  theadClass?: string;
}

const UseTable = ({
  headers,
  children,
  className,
  theadClass,
}: PaymentLogProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <table
        className={cn(
          "min-w-full whitespace-nowrap border-gray-900 text-sm",
          className
        )}
      >
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <THead
                key={idx}
                item={header}
                className={cn("py-3 bg-[#7d5cff2a] text-[#ffffff]", theadClass)}
              />
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default UseTable;
