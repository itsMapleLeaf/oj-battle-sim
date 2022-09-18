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
		<Combobox<[string, Preset]>
			getItems={(value) =>
				matchSorter(Object.entries(characters), value, { keys: ["0"] })
			}
			getItemLabel={([name]) => name}
			onSelectedItemChange={([, preset]) => onChange(preset)}
		/>
	)
}
