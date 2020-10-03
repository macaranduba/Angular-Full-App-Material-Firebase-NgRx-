import { Entity } from "./entity.model";

export interface Recommendation {
	recommendation: string;
	entities: Entity[];
}
