// "use client";

// import { useState, useMemo } from "react";
// import { FaUserTie } from "react-icons/fa";
// import { TeamDataResponse, TeamMember } from "@/components/types/team/team";
// import { useGetData } from "@/lib/fetch/axiosConfig/FetchData";
// import Image from "next/image";

// const MAX_LEVEL = 2;

// const TeamTree = () => {
//   const { data: team } = useGetData<TeamDataResponse>(["team"], `/team`);
//   const rootUser = useMemo(() => team?.user, [team]);
//   const allTeam = useMemo(() => team?.team || [], [team]);
//   const [focusMember, setFocusMember] = useState<TeamMember | null>(null);
//   const [history, setHistory] = useState<TeamMember[]>([]);

//   if (!team)
//     return <div className="text-center py-10 text-white">Loading...</div>;

//   const currentRoot: TeamMember = focusMember || {
//     name: rootUser?.name || "Root",
//     email: rootUser?.email || "",
//     is_active: rootUser?.is_active || "0",
//     created_at: rootUser?.created_at || "",
//     image: rootUser?.image || null,
//     investment: 0,
//     level: 0,
//     team: allTeam,
//     total_earned: team?.my_earnings || "0",
//     teamInvest: team?.my_team_invest || "0",
//   };

//   const handleNodeClick = (member: TeamMember) => {
//     setHistory((prev) => [...prev, currentRoot]);
//     setFocusMember(member);
//   };

//   const handleBack = () => {
//     const lastRoot = history[history.length - 1];
//     setHistory((prev) => prev.slice(0, prev.length - 1));
//     setFocusMember(lastRoot || null);
//   };

//   return (
//     <div className="text-white min-h-screen w-full">
//       <div className="flex flex-col items-center">
//         {history.length > 0 && (
//           <button
//             onClick={handleBack}
//             className="mb-4 sm:mb-6 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-sm sm:text-base"
//           >
//             ← Back
//           </button>
//         )}

//         <TreeNode
//           name={currentRoot.name}
//           investment={currentRoot.investment}
//           totalEarnings={Number(currentRoot.total_earned)}
//           teamInvest={Number(currentRoot.teamInvest)}
//           image={currentRoot?.image ?? undefined}
//           isRoot
//           hasChildren={currentRoot.team.length > 0}
//           showChildren={currentRoot.team.length > 0}
//         />

//         <div className="overflow-x-auto mt-6 sm:mt-8 w-full pb-5">
//           <div className="flex w-fit justify-center px-4 gap-8 relative pb-10">
//             {currentRoot.team.length > 0 ? (
//               currentRoot.team.map((member, i) => (
//                 <TeamBranch
//                   key={member.email}
//                   member={member}
//                   siblings={currentRoot.team}
//                   index={i}
//                   onClickNode={handleNodeClick}
//                   level={1}
//                 />
//               ))
//             ) : (
//               <p className="text-gray-400 text-sm sm:text-base">
//                 No downline found
//               </p>
//             )}
//             {/* Horizontal line for root's children */}
//             {currentRoot.team.length > 1 && (
//               <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-500 z-10 mx-auto"></div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const TeamBranch = ({
//   member,
//   siblings,
//   index,
//   onClickNode,
//   level,
// }: {
//   member: TeamMember;
//   siblings?: TeamMember[];
//   index?: number;
//   onClickNode: (m: TeamMember) => void;
//   level: number;
// }) => {
//   const isFirstSibling = index === 0;
//   const isLastSibling = siblings ? index === siblings.length - 1 : false;
//   const hasChildren = member.team && member.team.length > 0;
//   const showChildren = hasChildren && level < MAX_LEVEL;

//   return (
//     <div
//       className={`relative flex flex-col items-center
//       ${!isFirstSibling && !isLastSibling ? "branch-middle" : ""}
//       ${isFirstSibling ? "branch-first" : ""}
//       ${isLastSibling ? "branch-last" : ""}`}
//     >
//       <TreeNode
//         name={member.name}
//         investment={member.investment}
//         totalEarnings={Number(member.total_earned)}
//         teamInvest={Number(member.teamInvest)}
//         image={member?.image ?? undefined}
//         hasChildren={hasChildren}
//         showChildren={showChildren}
//         onClick={() => onClickNode(member)}
//       />

//       {showChildren && (
//         <div className="overflow-x-auto mt-4 sm:mt-6 w-full">
//           <div className="flex w-fit gap-8 relative pb-10">
//             {member.team.map((child, i) => (
//               <TeamBranch
//                 key={child.email}
//                 member={child}
//                 siblings={member.team}
//                 index={i}
//                 onClickNode={onClickNode}
//                 level={level + 1}
//               />
//             ))}
//             {/* Horizontal line for children */}
//             {member.team.length > 1 && (
//               <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-500 z-10 mx-auto"></div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const TreeNode = ({
//   name,
//   investment,
//   totalEarnings,
//   teamInvest,
//   onClick,
//   isRoot,
//   image,
//   hasChildren,
//   showChildren,
// }: {
//   name: string;
//   investment: number;
//   totalEarnings?: number;
//   teamInvest?: number;
//   image?: string;
//   onClick?: () => void;
//   isRoot?: boolean;
//   hasChildren?: boolean;
//   showChildren?: boolean;
// }) => {
//   return (
//     <div className={`relative flex flex-col items-center mt-0 node-container`}>
//       {!isRoot && (
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gray-500"></div>
//       )}
//       <button
//         onClick={onClick}
//         className={`flex flex-col items-start p-2 pt-6 mt-6 justify-center rounded-xl sm:rounded-2xl shadow-lg transition-all duration-200 text-left w-[150px] ${
//           isRoot ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"
//         }`}
//       >
//         <span className="size-10 bg-gray-500 rounded-full flex justify-center items-center absolute -top-0 z-20 right-0 left-0 mx-auto">
//           {!image ? (
//             <FaUserTie className="size-5 text-gray-300" />
//           ) : (
//             <Image
//               className="rounded-full"
//               src={image}
//               alt="img"
//               width={40}
//               height={40}
//             />
//           )}
//         </span>
        // <span className="block w-full truncate text-[14px]">{name}</span>
        // <span className=" text-[14px] text-white mt-1 font-medium">
        //   Investment: ${investment}
        // </span>
        // {totalEarnings !== undefined && (
        //   <span className="text-xs sm:text-sm text-white mt-1 font-medium text-[14px]">
        //     Total Earnings: ${totalEarnings}
        //   </span>
        // )}
        // {teamInvest !== undefined && (
        //   <span className="text-xs sm:text-sm text-white mt-1 font-medium text-[14px]">
        //     Team Invest: ${teamInvest}
        //   </span>
        // )}
//       </button>
//       {showChildren && (
//         <div className="absolute top-[calc(100%+0px)] left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gray-500 z-10"></div>
//       )}
//     </div>
//   );
// };

// export default TeamTree;

import React from "react";
import Flow from "./Network";



const teamData = {
  "status": true,
  "user": {
    "email": "user@example.com",
    "name": "Muntasir",
    "is_active": "1",
    "created_at": "2024-09-02T10:00:00Z",
    "image": null
  },
  "my_earnings": "3250.50",
  "my_team_invest": "78500.00",
  "team": [
    {
      "level": 1,
      "email": "level1-alpha@example.com",
      "name": "Rahim Ahmed",
      "image": "https://randomuser.me/api/portraits/men/10.jpg",
      "total_earned": "1500.75",
      "teamInvest": "35000.00",
      "is_active": "1",
      "created_at": "2024-07-20T12:00:00Z",
      "investment": 5000,
      "team": [
        {
          "level": 2,
          "email": "level2-alpha@example.com",
          "name": "Sultana Begum",
          "image": "https://randomuser.me/api/portraits/women/11.jpg",
          "total_earned": "550.25",
          "teamInvest": "12000.00",
          "is_active": "1",
          "created_at": "2024-07-25T14:30:00Z",
          "investment": 1500,
          "team": [
            {
              "level": 3,
              "email": "level3-alpha@example.com",
              "name": "Khalid Islam",
              "image": "https://randomuser.me/api/portraits/men/12.jpg",
              "total_earned": "180.00",
              "teamInvest": "3000.00",
              "is_active": "1",
              "created_at": "2024-08-01T10:00:00Z",
              "investment": 500,
              "team": [
                {
                  "level": 4,
                  "email": "level4-alpha@example.com",
                  "name": "Tasnim Chowdhury",
                  "image": "https://randomuser.me/api/portraits/women/13.jpg",
                  "total_earned": "60.00",
                  "teamInvest": "1000.00",
                  "is_active": "1",
                  "created_at": "2024-08-05T09:00:00Z",
                  "investment": 200,
                  "team": []
                }
              ]
            }
          ]
        },
        {
          "level": 2,
          "email": "level2-beta@example.com",
          "name": "Jannat Akhter",
          "image": "https://randomuser.me/api/portraits/women/14.jpg",
          "total_earned": "320.00",
          "teamInvest": "8000.00",
          "is_active": "0",
          "created_at": "2024-07-28T16:00:00Z",
          "investment": 1000,
          "team": []
        },
        {
          "level": 2,
          "email": "level2-gamma@example.com",
          "name": "Arif Hossain",
          "image": "https://randomuser.me/api/portraits/men/15.jpg",
          "total_earned": "450.00",
          "teamInvest": "9500.00",
          "is_active": "1",
          "created_at": "2024-07-30T11:30:00Z",
          "investment": 1200,
          "team": [
            {
              "level": 3,
              "email": "level3-beta@example.com",
              "name": "Sadia Islam",
              "image": "https://randomuser.me/api/portraits/women/16.jpg",
              "total_earned": "90.00",
              "teamInvest": "2000.00",
              "is_active": "1",
              "created_at": "2024-08-05T15:00:00Z",
              "investment": 300,
              "team": [
                {
                  "level": 4,
                  "email": "level4-beta@example.com",
                  "name": "Naimur Rahman",
                  "image": null,
                  "total_earned": "25.00",
                  "teamInvest": "500.00",
                  "is_active": "1",
                  "created_at": "2024-08-10T11:00:00Z",
                  "investment": 100,
                  "team": [
                    {
                      "level": 5,
                      "email": "level5-alpha@example.com",
                      "name": "Fahim Bhuiyan",
                      "image": "https://randomuser.me/api/portraits/men/17.jpg",
                      "total_earned": "5.00",
                      "teamInvest": "100.00",
                      "is_active": "1",
                      "created_at": "2024-08-15T10:00:00Z",
                      "investment": 50,
                      "team": []
                    }
                  ]
                },
                {
                  "level": 4,
                  "email": "level4-gamma@example.com",
                  "name": "Mahfuza Khatun",
                  "image": "https://randomuser.me/api/portraits/women/18.jpg",
                  "total_earned": "15.00",
                  "teamInvest": "300.00",
                  "is_active": "0",
                  "created_at": "2024-08-12T16:00:00Z",
                  "investment": 80,
                  "team": []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "level": 1,
      "email": "level1-beta@example.com",
      "name": "Fahima Tasmin",
      "image": null,
      "total_earned": "850.50",
      "teamInvest": "20000.00",
      "is_active": "1",
      "created_at": "2024-08-01T09:00:00Z",
      "investment": 3000,
      "team": []
    }
  ]
}

export default async function page() {
  return (
    <div>
      <Flow />
    </div>
  );
}
