import { gql } from "@apollo/client";

export const ADD_FAVORITE = gql`
  mutation addFavorite($id: ID!, $favorites: FavoriteInput!) {
    addFavorite(id: $id, favorites: $favorites) {
      id
      favorites {
        agency
      }
    }
  }
`;

export const DELETE_FAVORITE = gql`
  mutation deleteFavorite($id: ID!, $favorite: DeleteFavorite!) {
    deleteFavorite(id: $id, favorite: $favorite) {
      id
      favorites {
        agency
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($email: String!) {
    addUser(email: $email) {
      id
      email
    }
  }
`;
