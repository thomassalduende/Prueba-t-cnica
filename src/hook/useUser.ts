import { fetchUsers } from "../service/Users";
import { useInfiniteQuery } from "@tanstack/react-query";
import { type User } from "../types.d";

export const useUser = () => {
    const { isError, isLoading, data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<{nextCursor?: number, users: User[]}>(
        ['users'],
        fetchUsers,
        {
          getNextPageParam: (lastPage) => lastPage.nextCursor,
          refetchOnWindowFocus: false
        }
    )

    return {isError, 
            isLoading, 
            users: data?.pages?.flatMap(page => page.users) ?? [],
            refetch, 
            fetchNextPage, 
            hasNextPage
        }
}








