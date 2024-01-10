
interface User {
  id: string;
  email: string;
  // Add other relevant user fields
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
