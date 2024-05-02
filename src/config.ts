export type AppConfig = {
	flipDuration: number,
	waitDuration: number,
}

const defaultConfig: AppConfig = {
	flipDuration: 0.5,
	waitDuration: 5,
} as AppConfig;

export default defaultConfig;