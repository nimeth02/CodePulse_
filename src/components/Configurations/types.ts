export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Team {
  id: string;
  name: string;
  projectId: string;
}

export interface TeamMember {
  userId: string;
  teamId: string;
  user: User;
}
