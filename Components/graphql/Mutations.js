import { gql } from "@apollo/client";

export const ADD_FAVORITE = gql`
  mutation addFavorite($userId: String!, $favorites: FavoriteInput!) {
    addFavorite(userId: $userId, favorites: $favorites) {
      userId
      favorites {
        agency
      }
    }
  }
`;

export const DELETE_FAVORITE = gql`
  mutation deleteFavorite($userId: String!, $favorite: DeleteFavorite!) {
    deleteFavorite(userId: $userId, favorite: $favorite) {
      userId
      favorites {
        agency
      }
    }
  }
`;
