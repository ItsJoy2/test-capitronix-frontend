import { cn } from "@/lib/utils";

const Status = ({ title }: { title: string }) => {
  return (
    <button
      className={cn(
        "w-[120px] py-2 rounded font-medium cursor-default",
        title === "Running" || (title === "Active" && "text-[#21a439]  w-fit"),
        title === "Pending" ||
          (title === "In Active" && "text-[#FFA800]   w-fit"),
        title === "Completed" && " border-[#7EDAC5] text-[#21a439] w-fit",
        title === "Paid" && "text-[#21a439] w-fit",
        title === "Pending" && "text-[#FFA800] w-fit",
        title === "Expired" && "text-[#f62d2d] w-fit",
        title === "Canceled" && "text-[#f62d2d] w-fit",
        title === "Inactive" && "text-[#f62d2d] w-fit",
        title === "Rejected" && "text-[#f62d2d] w-fit",
        title === "Success" && "text-[#21a439] w-fit",
        title === "Completed" && "text-[#dcf900] w-fit"
      )}
    >
      {title}
    </button>
  );
};
export default Status;
