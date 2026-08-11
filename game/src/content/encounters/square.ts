import type { InterventionId } from '../../game/systems/FeedingSystem';
import type { RecipientGroup } from '../../game/state/types';

// The Hungry Square: exactly three recipient groups, each with one distinct barrier.
// They are people with needs and voices, not puzzle objects.

export const SQUARE_GROUPS: RecipientGroup[] = [
  {
    id: 'north_edge',
    nameKey: 'square.group.north_edge.name',
    descKey: 'square.group.north_edge.desc',
    speakKey: 'square.groupWater',
    barrier: 'water',
    x: 300,
    y: 300,
  },
  {
    id: 'crowd',
    nameKey: 'square.group.crowd.name',
    descKey: 'square.group.crowd.desc',
    speakKey: 'square.groupCrowd',
    barrier: 'safe_access',
    x: 720,
    y: 470,
  },
  {
    id: 'elder',
    nameKey: 'square.group.elder.name',
    descKey: 'square.group.elder.desc',
    speakKey: 'square.groupElder',
    barrier: 'mobility',
    x: 1080,
    y: 320,
  },
];

export interface InterventionDef {
  id: InterventionId;
  labelKey: string;
  /** logical position of the diegetic action point in the scene */
  x: number;
  y: number;
}

// Diegetic action points placed around the yard rather than a menu.
export const INTERVENTION_POINTS: InterventionDef[] = [
  { id: 'assignWater', labelKey: 'square.act.assignWater', x: 200, y: 470 },
  { id: 'assignLine', labelKey: 'square.act.assignLine', x: 560, y: 300 },
  { id: 'carryPortion', labelKey: 'square.act.carryPortion', x: 1080, y: 470 },
  { id: 'placeVessel', labelKey: 'square.act.placeVessel', x: 640, y: 600 },
];

export const SERVING_POINT = { x: 640, y: 360, labelKey: 'square.act.beginServing' };
