import { useObservable, WritableObservable } from "micro-observables"
import type { ComponentChildren } from "preact"
import type { Reaction } from "./battle"
import { entries, percent } from "./common"
import Field from "./Field"
import OptionGroup from "./OptionGroup"
import type { Player, StatKey } from "./player-state"
import StatInput from "./StatInput"

export default function PlayerCard({
	title,
	player,
	survivalChance,
	victoryChance,
}: {
	title: ComponentChildren
	player: Player
	survivalChance: number
	victoryChance: number
}) {
	const reaction = useObservable(player.reaction)
	return (
		<div class="flex flex-col p-4 space-y-4 bg-white rounded-md shadow-md">
			<h1 class="text-lg">{title}</h1>

			<section class="grid grid-flow-col gap-4">
				{entries(player.stats).map(([key, value]) => (
					<StatField key={key} name={key} value={value} />
				))}
			</section>

			<section class="self-start">
				<OptionGroup<Reaction>
					name="attackerReaction"
					value={reaction}
					onChange={(reaction) => player.reaction.set(reaction)}
					options={[
						{ value: "defend", text: "Defend" },
						{ value: "evade", text: "Evade" },
					]}
				/>
			</section>

			<section>
				<p>
					<strong>{percent(survivalChance)}</strong> chance of survival
				</p>
				<p>
					<strong>{percent(victoryChance)}</strong> chance of winning
				</p>
			</section>
		</div>
	)
}

function StatField({
	name,
	value: valueObservable,
}: {
	name: StatKey
	value: WritableObservable<string>
}) {
	const value = useObservable(valueObservable)
	return (
		<Field label={name.toUpperCase()}>
			<StatInput
				value={value}
				onTextChange={(value) => valueObservable.set(value)}
			/>
		</Field>
	)
}
