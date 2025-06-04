import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { User } from "@/features/users/types/User";
import type { AppDispatch, RootState } from "@/store";
import { fetchUsers } from "@/store/thunks/userThunk";

export function useUserList(initialUser: User | undefined) {
  const [selectedUser, setSelectedUser] = useState<User | undefined>(
    initialUser,
  );

  const [usersPage, setUsersPage] = useState(1);
  const [usersPageSize, setUsersPageSize] = useState(20);
  const [usersSort, setUsersSort] = useState<{
    id: string;
    desc: boolean;
  } | null>({
    id: "",
    desc: false,
  });
  const [usersSearchTerm, setUsersSearchTerm] = useState<string>("");

  const [userInputOpened, setUserInputOpened] = useState(false);

  const usersOrderBy = usersSort
    ? `${usersSort.id}${usersSort.desc ? "desc" : "asc"}`.toLowerCase()
    : "fullnameasc";

  const isUserInputOpened = userInputOpened === true;

  const dispatch = useDispatch<AppDispatch>();
  const {
    users,
    total: totalUsers,
    loading: usersLoading,
    error: usersError,
  } = useSelector((state: RootState) => state.users);

  const fetchUsersData = useCallback(async () => {
    try {
      const response = await dispatch(
        fetchUsers({
          page: usersPage,
          pageSize: usersPageSize,
          searchTerm: usersSearchTerm,
          orderBy: usersOrderBy,
        }),
      ).unwrap();
      console.info("Users fetched successfully", response);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  }, [dispatch, usersOrderBy, usersPage, usersPageSize, usersSearchTerm]);

  useEffect(() => {
    if (isUserInputOpened) {
      fetchUsersData();
    }
  }, [fetchUsersData, isUserInputOpened]);

  useEffect(() => {
    setSelectedUser(initialUser);
  }, [initialUser]);

  return {
    selectedUser,
    setSelectedUser,
    usersPage,
    setUsersPage,
    usersPageSize,
    setUsersPageSize,
    usersSort,
    setUsersSort,
    usersSearchTerm,
    setUsersSearchTerm,
    userInputOpened,
    setUserInputOpened,
    usersOrderBy,
    isUserInputOpened,
    users,
    totalUsers,
    usersLoading,
    usersError,
    fetchUsersData,
  };
}
