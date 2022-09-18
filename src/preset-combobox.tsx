import { flip, offset, useFloating } from "@floating-ui/react-dom"
import { Transition } from "@headlessui/react"
import classNames from "classnames"
import { useCombobox } from "downshift"
import { matchSorter } from "match-sorter"
import { Fragment } from "preact"
import { ChevronDown, X } from "preact-feather"
import { useState } from "preact/hooks"
import useMeasure from "react-use-measure"
import characters from "./data/characters.json"
import { Portal } from "./portal"
import { textInputClass } from "./styles"

type Preset = typeof characters[string]

export function PresetCombobox({
	onChange,
}: {
	onChange: (stats: Preset) => void
}) {
	const [value, setValue] = useState("")
	const items = matchSorter(Object.keys(characters), value)

	const combobox = useCombobox({
		items,
		onInputValueChange: ({ inputValue = "" }) => {
			setValue(inputValue)

			const newItems = matchSorter(Object.keys(characters), inputValue)
			if (!combobox.selectedItem || !newItems.includes(combobox.selectedItem)) {
				combobox.setHighlightedIndex(0)
			}
		},
		onSelectedItemChange: ({ selectedItem }) => {
			const preset = selectedItem && characters[selectedItem]
			if (preset) onChange(preset)
		},
	})

	const floating = useFloating({
		placement: "bottom-start",
		strategy: "fixed",
		middleware: [offset(8), flip()],
	})

	const [rectRef, rect] = useMeasure()

	return (
		<>
			<div
				class="relative flex"
				{...combobox.getComboboxProps({ ref: floating.reference })}
			>
				<input
					class={textInputClass}
					placeholder="Select a preset..."
					// @ts-expect-error
					{...combobox.getInputProps({ ref: rectRef })}
				/>
				<div class="flex absolute right-0 inset-y-0">
					{!!value && (
						<button
							type="button"
							title="Show presets"
							class="p-2 flex items-center hover:bg-black/20 transition"
							onClick={() => {
								combobox.reset()
								combobox.openMenu()
							}}
						>
							<X size={16} />
						</button>
					)}
					<button
						type="button"
						title="Show presets"
						class="p-2 flex items-center hover:bg-black/20 transition"
						{...combobox.getToggleButtonProps()}
					>
						<ChevronDown size={16} />
					</button>
				</div>
			</div>
			<Portal>
				<div
					ref={floating.floating}
					style={{
						position: floating.strategy,
						left: floating.x,
						top: floating.y,
						width: rect.width,
					}}
				>
					<div {...combobox.getMenuProps()}>
						<Transition
							as={Fragment}
							show={combobox.isOpen}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<ul class="bg-white dark:bg-stone-600 shadow-lg rounded-md max-h-72 overflow-y-scroll transition">
								{items.map((item, index) => (
									<li
										key={item}
										value={item}
										class={classNames(
											"py-2 px-3 transition cursor-pointer",
											combobox.highlightedIndex === index && "bg-orange-500/20",
										)}
										{...combobox.getItemProps({ item, index })}
									>
										{item}
									</li>
								))}
							</ul>
						</Transition>
					</div>
				</div>
			</Portal>
		</>
	)
}
