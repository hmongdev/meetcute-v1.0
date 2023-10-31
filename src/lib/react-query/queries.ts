// appwrite
import { createUserAccount, signInAccount } from '@/lib/appwrite/api';
import { INewUser } from '@/types';
// react query
import {
  // useQuery,
  useMutation,
  // useQueryClient,
  // useInfiniteQuery,
} from "@tanstack/react-query";

// ============================================================
// AUTH QUERIES
// ============================================================

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};