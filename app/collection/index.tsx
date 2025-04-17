import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native"
import { Stack } from "expo-router"
import { useCallback, useContext, useEffect, useState } from "react"

import { Collection } from "../../types"
import { useCollections } from "../../data/hooks"
import { CollectionCard } from "../../components/common/card"
import { Text } from "../../components/common/text"
import { ThemeContext } from "../../styles/theme-provider"
import { isDefined } from "../../utils/common"
import { ErrorUI } from "../../components/common/error-ui"

const Collections = () => {
  const { collections, isLoading, error, refresh } = useCollections()
  const { theme } = useContext(ThemeContext)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    refresh()
    setRefreshing(false)
  }, [])

  useEffect(() => {
    if (isDefined(error)) {
      console.log("Error fetching collections: ", error)
    }
  }, [error])

  const renderCollection = (item: Collection) => {
    return (
      <View style={styles.cardContainer}>
        <CollectionCard
          collection={item}
          title={item.title}
          imgSrc={item.thumbnail}
        />
      </View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.bg }]}>
      <Stack.Screen
        options={{
          headerTitle: "Collections",
          headerShadowVisible: false,
        }}
      />
      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <ErrorUI error={error} onRetry={() => refresh()} />
      ) : (
        <FlatList
          data={collections}
          renderItem={({ item }) => renderCollection(item)}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.collectionList}
          numColumns={2}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  collectionList: {
    padding: 16,
  },
  cardContainer: {
    flex: 1,
    margin: 8,
  },
})

export default Collections