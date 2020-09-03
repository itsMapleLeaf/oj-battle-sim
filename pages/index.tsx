import React, { useCallback, useState } from "react"
import Field from "../components/Field"
import OptionGroup from "../components/OptionGroup"
import StatInput from "../components/StatInput"
import {
	createStatGroup,
	Fighter,
	getDefenseRoundResult,
	getEvadeRoundResult,
} from "../helpers/battle"
import { count } from "../helpers/common"

type Reaction = "defend" | "evade"

export default function IndexPage() {
	const [attacker, setAttacker] = useState({
		...createStatGroup(),
		reaction: "defend" as Reaction,
	})
	const updateAttacker = usePartialSetState(setAttacker)

	const [defender, setDefender] = useState({
		...createStatGroup(),
		reaction: "defend" as Reaction,
	})
	const updateDefender = usePartialSetState(setDefender)

	const result = getBattleResult(
		attacker,
		defender,
		attacker.reaction,
		defender.reaction,
	)

	function swap() {
		setAttacker(defender)
		setAttacker(attacker)
	}

	return (
		<main className="px-4 py-20">
			<form className="flex flex-col w-full max-w-md mx-auto space-y-4">
				<div className="flex flex-col p-4 space-y-4 bg-white rounded-md shadow-md">
					<h1 className="text-lg">Attacker</h1>
					<div className="grid grid-flow-col gap-4">
						<Field label="HP">
							<StatInput
								defaultValue={5}
								onValueChange={(hp) => updateAttacker({ hp })}
							/>
						</Field>
						<Field label="ATK">
							<StatInput
								defaultValue={0}
								onValueChange={(atk) => updateAttacker({ atk })}
							/>
						</Field>
						<Field label="DEF">
							<StatInput
								defaultValue={0}
								onValueChange={(def) => updateAttacker({ def })}
							/>
						</Field>
						<Field label="EVD">
							<StatInput
								defaultValue={0}
								onValueChange={(evd) => updateAttacker({ evd })}
							/>
						</Field>
					</div>

					<div className="self-start">
						<OptionGroup<Reaction>
							name="attackerReaction"
							value={attacker.reaction}
							onChange={(reaction) => updateAttacker({ reaction })}
							options={[
								{ value: "defend", text: "Defend" },
								{ value: "evade", text: "Evade" },
							]}
						/>
					</div>
				</div>

				<button
					type="button"
					className="flex flex-col self-center p-2 space-y-4 text-white transition-colors duration-200 bg-orange-600 rounded-md shadow-md hover:bg-orange-500"
					title="Switch"
					onClick={swap}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="w-8"
					>
						<path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
					</svg>
				</button>

				<div className="flex flex-col p-4 space-y-4 bg-white rounded-md shadow-md">
					<h1 className="text-lg">Defender</h1>
					<div className="grid grid-flow-col gap-4">
						<Field label="HP">
							<StatInput
								defaultValue={5}
								onValueChange={(hp) => updateDefender({ hp })}
							/>
						</Field>
						<Field label="ATK">
							<StatInput
								defaultValue={0}
								onValueChange={(atk) => updateDefender({ atk })}
							/>
						</Field>
						<Field label="DEF">
							<StatInput
								defaultValue={0}
								onValueChange={(def) => updateDefender({ def })}
							/>
						</Field>
						<Field label="EVD">
							<StatInput
								defaultValue={0}
								onValueChange={(evd) => updateDefender({ evd })}
							/>
						</Field>
					</div>

					<div className="self-start">
						<OptionGroup<Reaction>
							name="defenderReaction"
							value={defender.reaction}
							onChange={(reaction) => updateDefender({ reaction })}
							options={[
								{ value: "defend", text: "Defend" },
								{ value: "evade", text: "Evade" },
							]}
						/>
					</div>
				</div>

				<div className="p-4 space-y-1 bg-white rounded-md shadow-md">
					<p>
						Attacker wins <b>{percent(result.attackerWinRate)}</b> of the time.
					</p>
					<p>
						Defender wins <b>{percent(result.defenderWinRate)}</b> of the time.
					</p>
					<p>
						Both survive <b>{percent(result.nobodyWinRate)}</b> of the time.
					</p>
				</div>
			</form>
		</main>
	)
}

function usePartialSetState<T>(
	setState: React.Dispatch<React.SetStateAction<T>>,
) {
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
	attackerReaction: string,
	defenderReaction: string,
) {
	let wins: Array<"attacker" | "defender" | "nobody"> = []

	for (let i = 0; i < 10000; i++) {
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
