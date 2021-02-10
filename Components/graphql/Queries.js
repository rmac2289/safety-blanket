import { gql } from "@apollo/client";

export const ALL_DEPTS = gql`
  query agencies {
    agencies {
      agency
      phone
      street
      city
      state
      zip
    }
  }
`;

export const DEPTS_BY_STATE = gql`
  query agencies_by_state($state: String!) {
    agencies_by_state(state: $state) {
      agency
      phone
      street
      city
      state
      zip
    }
  }
`;

export const DEPTS_BY_CITY = gql`
  query agencies_by_city($city: String!, $county: String!, $state: String!) {
    agencies_by_city(city: $city, county: $county, state: $state) {
      agency
      phone
      street
      city
      state
      zip
    }
  }
`;
