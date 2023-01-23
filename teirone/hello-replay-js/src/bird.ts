import { makeSprite, t } from "@replay/core";

export const birdWidth = 50;
export const birdHeight = 50;

export const Bird = makeSprite({
    render() {
        return [
            t.rectangle({
                width: birdWidth,
                height: birdHeight,
                color: "yellow",
            }),
        ];
    },
});