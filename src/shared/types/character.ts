import { CharacterAnimator } from ".";

export type SlotNumber = 0 | 1 | 2 | 3;

export type Character = {
  id: string;
  name: string;
  animator: CharacterAnimator;
}

export type GroupCharacter = {
  character: Character;
  initialSlotNumber: SlotNumber | null;
  currentSlot: string;
  isPlayerGroup: boolean;
  position: {
    x: number;
    y: number;
  };
}