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
  <TouchableOpacity>
    <Text style={styles.li}>{item}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontWeight: "bold",
    fontSize: 20,
    marginHorizontal: 30,
    padding: 10,
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
