export interface MoveResponse {
	turned: string;
	nextValid: string;
	played?: string;
}
/**
 * Request object representing a board and a piece to play on it.
 */
export interface MoveRequest {
	black: string; // e.g. "D3D4D5".
	white: string;
	colour: string;
	position: string; // e.g. E6
}
