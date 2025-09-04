// "use client";

// import React, { useState } from "react";
// import "./tree.css";
// import Image from "next/image";
// import { TeamDataResponse, TeamMember } from "@/components/types/team/team";
// import { useGetData } from "@/lib/fetch/axiosConfig/FetchData";
// import { FaUser } from "react-icons/fa"; // 👈 Added
// const teamdata = {
//   status: true,
//   user: {
//     email: "mainuser@example.com",
//     name: "Main User",
//     is_active: "1",
//     created_at: "2024-09-01T10:00:00Z",
//     image:
//       "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//   },
//   my_earnings: "3500.00",
//   my_team_invest: "35000.00",
//   team: [
//     {
//       level: 1,
//       email: "level1_member1@example.com",
//       name: "Level 1 Member One",
//       image:
//         "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//       total_earned: "1500.00",
//       teamInvest: "15000.00",
//       is_active: "1",
//       created_at: "2024-08-15T12:00:00Z",
//       investment: 3000,
//       team: [
//         {
//           level: 2,
//           email: "level2_member1@example.com",
//           name: "L2 Member One",
//           image: null,
//           total_earned: "500.00",
//           teamInvest: "5000.00",
//           is_active: "1",
//           created_at: "2024-08-20T14:00:00Z",
//           investment: 1000,
//           team: [],
//         },
//         {
//           level: 2,
//           email: "level2_member2@example.com",
//           name: "L2 Member Two",
//           image:
//             "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//           total_earned: "300.00",
//           teamInvest: "3000.00",
//           is_active: "1",
//           created_at: "2024-08-21T15:00:00Z",
//           investment: 600,
//           team: [],
//         },
//         {
//           level: 2,
//           email: "level2_member3@example.com",
//           name: "L2 Member Three",
//           image: null,
//           total_earned: "200.00",
//           teamInvest: "2000.00",
//           is_active: "1",
//           created_at: "2024-08-22T16:00:00Z",
//           investment: 400,
//           team: [],
//         },
//       ],
//     },
//     {
//       level: 1,
//       email: "level1_member2@example.com",
//       name: "Level 1 Member Two",
//       image:
//         "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//       total_earned: "1000.00",
//       teamInvest: "10000.00",
//       is_active: "1",
//       created_at: "2024-08-10T11:00:00Z",
//       investment: 2000,
//       team: [
//         {
//           level: 2,
//           email: "level2_member4@example.com",
//           name: "L2 Member Four",
//           image: null,
//           total_earned: "400.00",
//           teamInvest: "4000.00",
//           is_active: "1",
//           created_at: "2024-08-25T18:00:00Z",
//           investment: 800,
//           team: [],
//         },
//         {
//           level: 2,
//           email: "level2_member5@example.com",
//           name: "L2 Member Five",
//           image:
//             "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//           total_earned: "100.00",
//           teamInvest: "1000.00",
//           is_active: "1",
//           created_at: "2024-08-26T19:00:00Z",
//           investment: 200,
//           team: [],
//         },
//       ],
//     },
//   ],
// };

// const renderTree = (
//   nodes: TeamMember[],
//   depth: number,
//   onNodeClick: (node: TeamMember) => void
// ) => {
//   if (depth > 1) return null;

//   return (
//     <ul>
//       {nodes.map((node, index) => (
//         <li key={index}>
//           <div
//             className="node-content shadow-md p-2 rounded-lg border relative border-gray-400 flex flex-col items-center text-center w-[150px] cursor-pointer hover:bg-gray-50 pt-6"
//             onClick={() => onNodeClick(node)}
//           >
//             {node.image ? (
//               <Image
//                 className="w-12 h-12 rounded-full object-cover mb-2 absolute -top-6 right-0 left-0 mx-auto z-10"
//                 src={node.image}
//                 alt={node.name}
//                 width={80}
//                 height={80}
//               />
//             ) : (
//               <FaUser className="w-12 h-12 text-gray-400 rounded-full mb-2 absolute -top-6 right-0 left-0 mx-auto z-10 bg-gray-200 p-2" />
//             )}

//             <span className="block w-full truncate text-[14px] font-semibold text-blue-700">
//               {node.name}
//             </span>
//             <span className="text-[13px] text-gray-600 mt-1">
//               Investment: ${parseFloat(node.investment as any) || 0}
//             </span>
//             <span className="text-[13px] text-gray-600 mt-1">
//               Earnings: ${parseFloat(node.total_earned) || 0}
//             </span>
//             <span className="text-[13px] text-gray-600 mt-1">
//               Team Invest: ${parseFloat(node.teamInvest) || 0}
//             </span>
//           </div>
//           {node.team &&
//             node.team.length > 0 &&
//             renderTree(node.team, depth + 1, onNodeClick)}
//         </li>
//       ))}
//     </ul>
//   );
// };

// const Flow: React.FC = () => {
//   // const { data: teamdata } = useGetData<TeamDataResponse>(["team"], `/team`);

//   const [currentRoot, setCurrentRoot] = useState<TeamMember | null>(null);
//   const [history, setHistory] = useState<TeamMember[]>([]);

//   const handleNodeClick = (node: TeamMember) => {
//     setHistory((prev) => [...prev, currentRoot!].filter(Boolean));
//     setCurrentRoot(node);
//   };

//   const handleBack = () => {
//     if (history.length > 0) {
//       const prev = history[history.length - 1];
//       setHistory((h) => h.slice(0, -1));
//       setCurrentRoot(prev);
//     } else {
//       setCurrentRoot(null);
//     }
//   };

//   // root node data
//   const rootNode = currentRoot
//     ? {
//         name: currentRoot.name,
//         image: currentRoot.image,
//         investment: currentRoot.investment,
//         total_earned: currentRoot.total_earned,
//         teamInvest: currentRoot.teamInvest,
//         children: currentRoot.team,
//       }
//     : {
//         name: teamdata?.user.name,
//         image: teamdata?.user.image,
//         investment: "0", // string দিলাম
//         total_earned: teamdata?.my_earnings,
//         teamInvest: teamdata?.my_team_invest,
//         children: teamdata?.team,
//       };

//   return (
//     <div className="tree py-6 overflow-x-auto">
//       {currentRoot && (
//         <div className="flex justify-center mb-4">
//           <button
//             onClick={handleBack}
//             className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
//           >
//             ← Back
//           </button>
//         </div>
//       )}

//       <ul>
//         <li>
//           <div className="node-content bg-white shadow-lg p-4 rounded-lg border text-center w-[220px] relative">
//             {rootNode.image ? (
//               <Image
//                 className="w-12 h-12 rounded-full object-cover mb-2 absolute -top-6 right-0 left-0 mx-auto"
//                 src={rootNode.image}
//                 alt="img"
//                 width={80}
//                 height={80}
//               />
//             ) : (
//               <FaUser className="w-12 h-12 text-gray-400 rounded-full mb-2 absolute -top-6 right-0 left-0 mx-auto bg-gray-200 p-2" />
//             )}
//             <p className="font-bold text-lg text-blue-600 mt-1 truncate">
//               {rootNode.name}
//             </p>
//             <p className="text-[13px] text-gray-600 mt-1">
//               Investment: ${parseFloat(rootNode.investment as any) || 0}
//             </p>
//             <p className="text-[13px] text-gray-600 mt-1">
//               Earnings: ${parseFloat(rootNode?.total_earned ?? "0") || 0}
//             </p>
//             <p className="text-[13px] text-gray-600 mt-1">
//               Team Invest: ${parseFloat(rootNode?.teamInvest ?? "0") || 0}
//             </p>
//           </div>

//           {rootNode.children &&
//             renderTree(rootNode.children, 1, handleNodeClick)}
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Flow;

"use client";

import React, { useState } from "react";
import "./tree.css";
import Image from "next/image";
import { TeamDataResponse, TeamMember } from "@/components/types/team/team";
import { useGetData } from "@/lib/fetch/axiosConfig/FetchData";
import { FaUser } from "react-icons/fa";
import { cn } from "@/lib/utils";

const renderTree = (
  nodes: TeamMember[],
  depth: number,
  onNodeClick: (node: TeamMember) => void
) => {
  if (depth > 1) return null;

  return (
    <ul>
      {nodes.map((node, index) => (
        <li key={index}>
          <div
            className="node-content shadow-md px-5 mt-5 py-3 rounded-lg border relative border-gray-400 flex flex-col items-center text-center w-[200px] pt-6 !bg-gradient-to-r cursor-pointer from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            onClick={() => onNodeClick(node)}
          >
            {node.image ? (
              <Image
                className="w-12 h-12 rounded-full object-cover mb-2 absolute -top-6 right-0 left-0 mx-auto z-10"
                src={node.image}
                alt={node.name}
                width={80}
                height={80}
              />
            ) : (
              <FaUser className="w-12 h-12 text-gray-400 rounded-full mb-2 absolute -top-6 right-0 left-0 mx-auto z-10 bg-gray-200 p-2" />
            )}

            <span className="block w-full truncate text-[14px] font-semibold text-white">
              {node.name}
            </span>
            <span className="text-[13px] text-white mt-1">
              Investment: ${parseFloat(node.investment as any) || 0}
            </span>
            <span className="text-[13px] text-white mt-1">
              Earnings: ${parseFloat(node.total_earned) || 0}
            </span>
            <span className="text-[13px] text-white mt-1">
              Team Invest: ${parseFloat(node.teamInvest) || 0}
            </span>

            {node.team && node.team.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-gray-50 text-blue-500 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow">
                {node.team.length}
              </span>
            )}
          </div>

          {node.team &&
            node.team.length > 0 &&
            renderTree(node.team, depth + 1, onNodeClick)}
        </li>
      ))}
    </ul>
  );
};

const Flow: React.FC = () => {
  const { data: teamdata } = useGetData<TeamDataResponse>(["team"], `/team`);
  const [currentRoot, setCurrentRoot] = useState<TeamMember | null>(null);
  const [history, setHistory] = useState<TeamMember[]>([]);
  const handleNodeClick = (node: TeamMember) => {
    setHistory((prev) => [...prev, currentRoot!].filter(Boolean));
    setCurrentRoot(node);
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory((h) => h.slice(0, -1));
      setCurrentRoot(prev);
    }
  };

  const handleRoot = () => {
    setHistory([]);
    setCurrentRoot(null);
  };

  const rootNode = currentRoot
    ? {
        name: currentRoot.name,
        image: currentRoot.image,
        investment: currentRoot.investment,
        total_earned: currentRoot.total_earned,
        teamInvest: currentRoot.teamInvest,
        children: currentRoot.team,
      }
    : {
        name: teamdata?.user.name,
        image: teamdata?.user.image,
        investment: "0",
        total_earned: teamdata?.my_earnings,
        teamInvest: teamdata?.my_team_invest,
        children: teamdata?.team,
      };

  return (
    <div>
      {/* 👉 Top Controls */}
      <div className="flex justify-between items-center mb-6 px-4  py-3 rounded-md">
        <h2 className="text-white truncate">{rootNode.name}</h2>
        <div className="space-x-2">
          <button
            onClick={handleRoot}
            className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600"
          >
            Root
          </button>
          <button
            onClick={handleBack}
            disabled={history.length === 0}
            className={`px-4 py-2 rounded-md shadow ${
              history.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Back
          </button>
        </div>
      </div>

      <div className="flex justify-center mb-6 ">
        <div className="node-content shadow-lg p-4 rounded-lg border text-center w-[220px] relative !bg-gradient-to-r cursor-pointer from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
          <div
            className={cn(
              "w-[45px] bg-gray-50 h-0.5 absolute -bottom-[24px] rotate-90 right-0 left-0 mx-auto -z-10",
              teamdata?.team.length === 0 && "hidden"
            )}
          />
          {rootNode.image ? (
            <Image
              className="w-12 h-12 rounded-full object-cover mb-2 absolute -top-6 right-0 left-0 mx-auto"
              src={rootNode.image}
              alt="img"
              width={80}
              height={80}
            />
          ) : (
            <FaUser className="w-12 h-12 text-gray-400 rounded-full mb-2 absolute -top-6 right-0 left-0 mx-auto bg-gray-200 p-2" />
          )}
          <p className="font-bold text-lg text-blue-50 mt-1 truncate">
            {rootNode.name}
          </p>
          <p className="text-[13px] text-gray-50 mt-1">
            Investment: ${parseFloat(rootNode.investment as any) || 0}
          </p>
          <p className="text-[13px] text-gray-50 mt-1">
            Earnings: ${parseFloat(rootNode?.total_earned ?? "0") || 0}
          </p>
          <p className="text-[13px] text-gray-50 mt-1">
            Team Invest: ${parseFloat(rootNode?.teamInvest ?? "0") || 0}
          </p>

          {rootNode.children && rootNode.children.length > 0 && (
            <span className="absolute -top-2 -right-2 text-blue-500 bg-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center shadow">
              {rootNode.children.length}
            </span>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <ul className="tree py-6 min-w-max">
          <li>
            {rootNode.children &&
              renderTree(rootNode.children, 1, handleNodeClick)}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Flow;
