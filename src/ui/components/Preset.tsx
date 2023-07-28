import { Forms } from '@vendetta/ui/components';
import { Preset } from '../../lib/api';
import { findByProps } from '@vendetta/metro';
import { NavigationNative, ReactNative } from '@vendetta/metro/common';
import DecorationCard from './DecorationCard';
import { useUserDecorationsStore } from '../stores/UserDecorationsStore';

const { FormTitle } = Forms;
const { View, FlatList } = ReactNative;
const { TextStyleSheet, Text } = findByProps('TextStyleSheet');

export default function Preset({ preset }: { preset: Preset }) {
	const select = useUserDecorationsStore((state) => state.select);
	const navigation = NavigationNative.useNavigation();

	return (
		<View>
			<View>
				<FormTitle title={preset.name} />
				{preset.description && (
					<Text style={[TextStyleSheet['text-sm/medium'], { paddingHorizontal: 16, paddingBottom: 8 }]}>{preset.description}</Text>
				)}
			</View>

			<FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				data={preset.decorations}
				renderItem={({ item }) => (
					<DecorationCard
						decoration={item}
						onPress={() => {
							select(item);
							navigation.pop();
						}}
					/>
				)}
				ItemSeparatorComponent={() => <View style={{ width: 4 }} />}
				snapToInterval={74}
				decelerationRate="fast"
				contentContainerStyle={{ paddingHorizontal: 8 }}
			/>
		</View>
	);
}
