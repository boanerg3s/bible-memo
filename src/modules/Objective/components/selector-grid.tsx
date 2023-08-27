import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { View, ListRenderItem, ScrollView, StyleSheet } from "react-native";

import {
  SelectorGridItem,
  SelectorGridPlaceholder,
  SelectorGridItemDefinition,
} from "@/modules/Objective/components/selector-grid-item";

interface SelectorGridProps {
  flat?: boolean;
  numCols?: number;
  choseItem: (id: any) => void;
  data: SelectorGridItemDefinition[];
}

export const SelectorGrid = React.memo(
  (props: SelectorGridProps) => {
    const { choseItem, data, flat = false, numCols = 5 } = props;

    const dataWithPlaceholder = React.useMemo<SelectorGridItemDefinition[]>(() => {
      const keysLengthDivisionBy5 = data.length % numCols;
      const placeholderQty = keysLengthDivisionBy5 !== 0 ? Math.abs(keysLengthDivisionBy5 - numCols) : 0;
      const placeholderCreator = (): SelectorGridItemDefinition => ({ placeholder: true });
      const placeholders = Array.from({ length: placeholderQty }, placeholderCreator);
      return [...data, ...placeholders];
    }, [data, flat, numCols]);

    const renderItem: ListRenderItem<SelectorGridItemDefinition> = (renderProps) => {
      const { label, id, ref, placeholder, isActive } = renderProps.item;
      if (placeholder) return <SelectorGridPlaceholder />;

      return (
        <SelectorGridItem
          ref={ref!}
          flat={flat!}
          label={label!}
          isActive={isActive!}
          setItemAsChosen={() => choseItem(id)}
        />
      );
    };

    return (
      <View style={styles.contentContainer}>
        <ScrollView
          horizontal={true}
          style={styles.scrollview}
          nestedScrollEnabled={true}
          contentContainerStyle={{ flex: 1 }}
        >
          <FlatList
            style={styles.grid}
            numColumns={numCols}
            renderItem={renderItem}
            data={dataWithPlaceholder}
            removeClippedSubviews={true}
            keyExtractor={(item, index) => `${item.key}-${index}`}
          />
        </ScrollView>
      </View>
    );
  },
  (prev, next) => prev.choseItem === next.choseItem && prev.data.length === next.data.length
);

const styles = StyleSheet.create({
  scrollview: {
    marginTop: -10,
    paddingBottom: 15,
  },
  grid: {
    paddingHorizontal: 15,
  },
  contentContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
});
