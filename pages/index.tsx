import React, { useState } from "react"
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
	const attacker = useFormValues({
		...createStatGroup(),
		reaction: "defend" as Reaction,
	})

	const defender = useFormValues({
		...createStatGroup(),
		reaction: "defend" as Reaction,
	})

	const result = getBattleResult(
		attacker.values,
		defender.values,
		attacker.values.reaction,
		defender.values.reaction,
	)

	function swap() {
		attacker.set(defender.values)
		defender.set(attacker.values)
	}

	return (
		<main className="px-4 py-20">
			<form className="flex flex-col w-full max-w-md mx-auto space-y-4">
				<div className="flex flex-col p-4 space-y-4 bg-white rounded-md shadow-md">
					<h1 className="text-lg">Attacker</h1>
					<div className="grid grid-flow-col gap-4">
						<Field label="HP">
							<StatInput {...attacker.bindNumber("hp")} />
						</Field>
						<Field label="ATK">
							<StatInput {...attacker.bindNumber("atk")} />
						</Field>
						<Field label="DEF">
							<StatInput {...attacker.bindNumber("def")} />
						</Field>
						<Field label="EVD">
							<StatInput {...attacker.bindNumber("evd")} />
						</Field>
					</div>

					<div className="self-start">
						<OptionGroup<Reaction>
							name="attackerReaction"
							value={attacker.values.reaction}
							onChange={(reaction) => attacker.merge({ reaction })}
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
							<StatInput {...defender.bindNumber("hp")} />
						</Field>
						<Field label="ATK">
							<StatInput {...defender.bindNumber("atk")} />
						</Field>
						<Field label="DEF">
							<StatInput {...defender.bindNumber("def")} />
						</Field>
						<Field label="EVD">
							<StatInput {...defender.bindNumber("evd")} />
						</Field>
					</div>

					<div className="self-start">
						<OptionGroup<Reaction>
							name="defenderReaction"
							value={defender.values.reaction}
							onChange={(reaction) => defender.merge({ reaction })}
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

function useFormValues<T>(initialValues: T) {
	const [values, setValues] = useState(initialValues)

	function merge(partialValues: Partial<T>) {
		setValues((prev) => ({ ...prev, ...partialValues }))
	}

	function bindNumber<K extends keyof T>(key: K) {
		return {
			value: String(values[key]),
			onChange: (event: React.ChangeEvent<{ value: string }>) => {
				merge({ [key]: Number(event.target.value) || 0 } as any)
			},
		}
	}

	return { values, set: setValues, merge, bindNumber }
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
