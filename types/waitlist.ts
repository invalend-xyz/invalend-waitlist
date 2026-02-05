export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface WaitlistData {
  total: number;
  users: User[];
}

export interface ImageData {
  id: string;
  src: string;
  alt: string;
}
