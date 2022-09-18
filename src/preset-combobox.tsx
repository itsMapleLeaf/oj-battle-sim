import { matchSorter } from "match-sorter"
import { Combobox } from "./combobox"
import characters from "./data/characters.json"

type Preset = typeof characters[string]

export function PresetCombobox({
	onChange,
}: {
	onChange: (stats: Preset) => void
}) {
	return (
		<Combobox<string>
			getItems={(value) => matchSorter(Object.keys(characters), value)}
			getItemLabel={(item) => item}
			onSelectedItemChange={(item) => {
				const preset = characters[item]
				if (preset) onChange(preset)
			}}
		/>
	)
}
