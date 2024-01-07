import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import colors from "../../colors";

const regions = [
  "Auvergne-Rhône-Alpes",
  "Bourgogne-Franche-Comté",
  "Bretagne",
  "Centre-Val de Loire",
  "Corse",
  "Grand Est",
  "Guadeloupe",
  "Guyane",
  "Hauts-de-France",
  "Île-de-France",
  "Martinique",
  "Normandie",
  "Nouvelle-Aquitaine",
  "Occitanie",
  "Pays de la Loire",
  "Provence-Alpes-Côte d'Azur",
  "Réunion",
];

const renderRegionItem = ({ item }: { item: string }) => (
  <TouchableOpacity style={styles.container}>
    <Text style={styles.li}>{item}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  li: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    padding: 10,
    borderWidth: 1,
  },
});

export default function Home() {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Sélectionnez une région</Text>
        <FlatList data={regions} renderItem={renderRegionItem} />
      </View>
    </>
  );
}
