import * as Linking from "expo-linking";

export const alphaSort = (a, b) => {
  const nameA = a.agency.toUpperCase();
  const nameB = b.agency.toUpperCase();
  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
};

export const openMaps = (street, city, state, zip) => {
  street = street.split(" ").join("+");
  if (city.split(" ").length > 1) {
    city = city.split(" ").join("%2C");
  }
  let url = `https://www.google.com/maps/search/?api=1&query=${street}%2C${city}%2C${state}%2C${zip}`;
  Linking.openURL(url);
};
export const openPhone = (num) => {
  const url = `tel:${num}`;
  return Linking.openURL(url).catch((error) => console.log(error));
};

export const formatPhoneNum = (n) => {
  return `(${n[0]}${n[1]}${n[2]}) ${n[3]}${n[4]}${n[5]}-${n[6]}${n[7]}${n[8]}${n[9]}`;
};
