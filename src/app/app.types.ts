export interface MoveResponse {
	turned: string;
	nextValid: string;
	played?: string;
}
export interface ProblemRequest {
	black: string; // "D3", "D4", "D5", ...
	white: string;
	solveFor: string; // black | white
	engine?: string; // Optimus Prime, Wall-E, watch this space...
}
/**
 * Request object representing a board and a piece to play on it.
 */
export interface MoveRequest {
	black: string; // "D3", "D4", "D5", ...
	white: string;
	colour: string;
	position: string; // e.g. e6
}
