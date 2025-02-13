import { css } from "@zuzjs/ui";

const Style = {
    // Input:  css(`bg:$input border:0 p:12 r:$radius c:$text w:100% s:$text-size`),
    // Button: css([
    //     `bg:$primary border:0 p:12,20 r:$radius c:$btn-text bold w:100% s:$text-size tdn tac anim:0.1s`,
    //     `&hover(bg:$primary-hover tdn) &disabled(bg:d4d9e2! c:a3a8b3! cursor:auto)`
    // ]),
    Link: css([
        `tdn &hover(tdu) c:$primary`
    ]),
    Gradients: {
        Primary: css(`bgi:gradient-to-92-$primary-2488c8`),
        Secondary: css(`bgi:gradient-to-right-0090f7-ba62fc-f2416b`),
    },
}

export default Style;