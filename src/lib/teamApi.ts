import { apiPatch, apiPost } from "./api";
import { getUserId } from "./userApi";

interface CreateTeamRequest {
  userId: number;
  teamName: string;
}

interface CreateTeamData {
  teamId: number;
  teamName: string;
  inviteCode: string;
}

interface ActiveTeamRequest {
  teamId: number;
}

export function createTeam(teamName: string) {
  const userId = getUserId();

  if (userId === null) {
    throw new Error("로그인이 필요합니다.");
  }

  return apiPost<CreateTeamData, CreateTeamRequest>(
    "/api/teams",
    {
      userId,
      teamName,
    }
  );
}

export function updateActiveTeam(teamId: number) {
  const userId = getUserId();

  if (userId === null) {
    throw new Error("로그인이 필요합니다.");
  }

  return apiPatch<string, ActiveTeamRequest>(
    `/api/users/${userId}/active-team`,
    {
      teamId,
    }
  );
}