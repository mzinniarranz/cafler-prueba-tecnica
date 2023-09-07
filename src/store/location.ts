import { create } from "zustand";
interface State {
    showLocation: boolean;
    setShowLocation: (showLocation: boolean) => void;
}

export const useShowLocation = create<State>((set) => {
    return {
        showLocation: false,
        setShowLocation: (showLocation) => {
            set({ showLocation: !showLocation });
        },
    };
});
