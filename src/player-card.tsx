import { Signal, useComputed } from "@preact/signals"
import { OptionGroup } from "./option-group"
import type { Player } from "./player"
import { StatInput } from "./stat-input"

export function PlayerCard({
	title,
	player,
	victoryChance,
	survivalChance,
}: {
	title: string
	player: Signal<Player>
	victoryChance: Signal<number>
	survivalChance: Signal<number>
}) {
	return (
		<section class="bg-white dark:bg-stone-700 p-4 rounded-md shadow-md grid gap-4">
			<h2 class="text-lg">{title}</h2>
			<div class="grid grid-flow-col auto-cols-fr gap-4">
				<StatInput label="HP" valueSignal={player.value.hp} />
				<StatInput label="ATK" valueSignal={player.value.atk} />
				<StatInput label="DEF" valueSignal={player.value.def} />
				<StatInput label="EVD" valueSignal={player.value.evd} />
			</div>
			<OptionGroup
				name={`${title.toLowerCase()}-reaction`}
				options={[
					{ label: "Defend", value: "defend" },
					{ label: "Evade", value: "evade" },
				]}
				valueSignal={player.value.reaction}
			/>
			<div>
				<p>
					You have a <strong>{usePercent(victoryChance)}</strong> chance of
					winning.
				</p>
				<p>
					You have a <strong>{usePercent(survivalChance)}</strong> chance of
					surviving.
				</p>
			</div>
		</section>
	)
}

function usePercent(signal: Signal<number>) {
	return useComputed(() => Math.round(signal.value * 100) + `%`)
}
