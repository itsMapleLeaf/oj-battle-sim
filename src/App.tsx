import { StateUpdater, useCallback, useState } from "preact/hooks"
import { tw } from "twind"
import { Fighter, getDefenseRoundResult, getEvadeRoundResult } from "./battle"
import { count, mapValues, omit } from "./common"
import Field from "./Field"
import OptionGroup from "./OptionGroup"
import StatInput from "./StatInput"

type Reaction = "defend" | "evade"

const initialValues = {
	hp: "5",
	atk: "0",
	def: "0",
	evd: "0",
	reaction: "defend" as Reaction,
}

const toFighter = (values: typeof initialValues): Fighter =>
	mapValues(omit(values, ["reaction"]), (value) => Number(value) || 0)

export default function App() {
	const [attacker, setAttacker] = useState(initialValues)
	const updateAttacker = usePartialSetState(setAttacker)

	const [defender, setDefender] = useState(initialValues)
	const updateDefender = usePartialSetState(setDefender)

	const result = getBattleResult(
		toFighter(attacker),
		toFighter(defender),
		attacker.reaction,
		defender.reaction,
	)

	function swap() {
		setAttacker(defender)
		setDefender(attacker)
	}

	return (
		<main class={tw`px-4 py-20`}>
			<form class={tw`flex flex-col w-full max-w-md mx-auto space-y-4`}>
				<div
					class={tw`flex flex-col p-4 space-y-4 bg-white rounded-md shadow-md`}
				>
					<h1 class={tw`text-lg`}>Attacker</h1>

					<section class={tw`grid grid-flow-col gap-4`}>
						<Field label="HP">
							<StatInput
								value={attacker.hp}
								onTextChange={(hp) => updateAttacker({ hp })}
							/>
						</Field>
						<Field label="ATK">
							<StatInput
								value={attacker.atk}
								onTextChange={(atk) => updateAttacker({ atk })}
							/>
						</Field>
						<Field label="DEF">
							<StatInput
								value={attacker.def}
								onTextChange={(def) => updateAttacker({ def })}
							/>
						</Field>
						<Field label="EVD">
							<StatInput
								value={attacker.evd}
								onTextChange={(evd) => updateAttacker({ evd })}
							/>
						</Field>
					</section>

					<section class={tw`self-start`}>
						<OptionGroup<Reaction>
							name="attackerReaction"
							value={attacker.reaction}
							onChange={(reaction) => updateAttacker({ reaction })}
							options={[
								{ value: "defend", text: "Defend" },
								{ value: "evade", text: "Evade" },
							]}
						/>
					</section>

					<section>
						<p>
							<strong>{percent(result.nobodyWinRate)}</strong> chance of
							survival
						</p>
						<p>
							<strong>{percent(result.attackerWinRate)}</strong> chance of
							winning
						</p>
					</section>
				</div>

				<button
					type="button"
					class={tw`flex flex-col self-center p-2 space-y-4 text-white transition-colors duration-200 bg-orange-600 rounded-md shadow-md hover:bg-orange-500`}
					title="Swap"
					onClick={swap}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class={tw`w-8`}
					>
						<path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
					</svg>
				</button>

				<div
					class={tw`flex flex-col p-4 space-y-4 bg-white rounded-md shadow-md`}
				>
					<h1 class={tw`text-lg`}>Defender</h1>

					<section class={tw`grid grid-flow-col gap-4`}>
						<Field label="HP">
							<StatInput
								value={defender.hp}
								onTextChange={(hp) => updateDefender({ hp })}
							/>
						</Field>
						<Field label="ATK">
							<StatInput
								value={defender.atk}
								onTextChange={(atk) => updateDefender({ atk })}
							/>
						</Field>
						<Field label="DEF">
							<StatInput
								value={defender.def}
								onTextChange={(def) => updateDefender({ def })}
							/>
						</Field>
						<Field label="EVD">
							<StatInput
								value={defender.evd}
								onTextChange={(evd) => updateDefender({ evd })}
							/>
						</Field>
					</section>

					<section class={tw`self-start`}>
						<OptionGroup<Reaction>
							name="defenderReaction"
							value={defender.reaction}
							onChange={(reaction) => updateDefender({ reaction })}
							options={[
								{ value: "defend", text: "Defend" },
								{ value: "evade", text: "Evade" },
							]}
						/>
					</section>

					<section>
						<p>
							<strong>{percent(result.nobodyWinRate)}</strong> chance of
							survival
						</p>
						<p>
							<strong>{percent(result.defenderWinRate)}</strong> chance of
							winning
						</p>
					</section>
				</div>
			</form>
		</main>
	)
}

function usePartialSetState<T>(setState: StateUpdater<T>) {
	return useCallback(
		(partialUpdate: Partial<T>) => {
			setState((prev) => ({ ...prev, ...partialUpdate }))
		},
		[setState],
	)
}

function getBattleResult(
	attacker: Fighter,
	defender: Fighter,
	attackerReaction: Reaction,
	defenderReaction: Reaction,
) {
	let wins: Array<"attacker" | "defender" | "nobody"> = []

	for (let i = 0; i < 100000; i++) {
		const round1 =
			defenderReaction === "defend"
				? getDefenseRoundResult(attacker, defender)
				: getEvadeRoundResult(attacker, defender)

		if (round1.defenderHealth <= 0) {
			wins.push("attacker")
			continue
		}

		const round2 =
			attackerReaction === "defend"
				? getDefenseRoundResult(defender, attacker)
				: getEvadeRoundResult(defender, attacker)

		wins.push(round2.defenderHealth <= 0 ? "defender" : "nobody")
	}

	return {
		attackerWinRate: count(wins, "attacker") / wins.length,
		defenderWinRate: count(wins, "defender") / wins.length,
		nobodyWinRate: count(wins, "nobody") / wins.length,
	}
}

function percent(value: number) {
	return `${Math.round(value * 100)}%`
}
