import { Character, GroupCharacter } from "../types";

export const mainCharacter: Character = {
  id: "mainCharacter",
  name: "Proto Gonista",
  animator: {
    actorKey: "wandererMagician",
    currentState: "IDLE",
    id: "mainAnimator",
  }
}

export const mainGroupCharacter: GroupCharacter = {
  character: mainCharacter,
  initialSlotNumber: 3,
  currentSlot: "",
  position: {
    x: 0,
    y: 0
  },
  isPlayerGroup: true,
}