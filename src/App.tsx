import { StateUpdater, useCallback, useState } from "preact/hooks"
import { tw } from "twind"
import { createPlayer } from "./player-state"
import PlayerCard from "./PlayerCard"

export default function App() {
	const [attacker, setAttacker] = useState(createPlayer)
	const [defender, setDefender] = useState(createPlayer)

	function swap() {
		setAttacker(defender)
		setDefender(attacker)
	}

	return (
		<main class={tw`px-4 py-20`}>
			<form class={tw`flex flex-col w-full max-w-md mx-auto space-y-4`}>
				<PlayerCard
					title="Attacker"
					player={attacker}
					survivalChance={0.5}
					victoryChance={0.5}
				/>

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

				<PlayerCard
					title="Defender"
					player={defender}
					survivalChance={0.5}
					victoryChance={0.5}
				/>
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
