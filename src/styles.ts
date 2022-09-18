import classNames from "classnames"

export const controlBorderClass = classNames(
	"border-2 border-stone-300 transition dark:border-stone-500 focus:border-orange-500 dark:focus:border-orange-500 focus-within:border-orange-500 dark:focus-within:border-orange-500",
)

export const textInputClass = classNames(
	controlBorderClass,
	"shadow-inner rounded-md focus:bg-black-30 leading-none w-full p-3 dark:bg-black/20 focus:outline-none",
)
