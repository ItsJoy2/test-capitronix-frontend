import { Star } from "lucide-react";
import React from "react";
import {
  Card as CardComponent,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/components/types/profile/profile";

export default function UserRank({ profile }: { profile: User | undefined }) {
  const isActivated = true;
  return (
    <CardComponent className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white">Your Rank</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg">
            <Star className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="font-semibold text-white text-lg">Member</p>
            <p className="text-sm text-slate-400">
              {isActivated ? "User Status" : "Activate to unlock ranking"}
            </p>
          </div>
        </div>
        {isActivated && (
          <div className="mt-4 p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
            <p className="text-sm text-purple-300 font-medium">
              {profile?.name}
            </p>
            <p className="text-xs text-slate-400 mt-1">{profile?.email}</p>
          </div>
        )}
      </CardContent>
    </CardComponent>
  );
}
