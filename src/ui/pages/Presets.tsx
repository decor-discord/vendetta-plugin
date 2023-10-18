import { ReactNative, React } from '@vendetta/metro/common';
import { Preset as PresetInterface, getPresets } from '../../lib/api';
import Preset from '../components/Preset';

const { FlatList } = ReactNative;

export default function Presets() {
	const [presets, setPresets] = React.useState<PresetInterface[]>([]);

	React.useEffect(() => {
		getPresets().then((presets) => setPresets(presets));
	}, []);

	return <FlatList data={presets} renderItem={({ item }) => <Preset preset={item} />} />;
}
