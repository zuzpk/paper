import { Paper, PaperVariant } from "@/types";
import { Button, ButtonProps, ButtonState, Size, SPINNER, Variant } from "@zuzjs/ui";

const paper : Paper<typeof Button, ButtonProps> = {
    title: `Inputs/Button`,
    component: Button,
    propsType: {
        icon: {
            control: "input",
            options: ""
        },
        iconSize: {
            control: "select",
            options: [Size.Small, Size.Medium, Size.Large]
        },
        withLabel: {
            control: "boolean"
        },
        disabled: {
            control: "boolean"
        },
        state: {
            control: "select",
            options: [ButtonState.Loading, ButtonState.Normal]
        },
        spinner: {
            control: "select",
            options: [SPINNER.Simple, SPINNER.Wave],
            default: SPINNER.Simple
        },
        variant : {
            control: "select",
            options: [Variant.Small, Variant.Medium, Variant.Large]
        },
    }
}

export default paper

export const Default : PaperVariant<ButtonProps> = {
    children: "Default",
    variant: Variant.Default,
    icon: `printer`
}

export const Small : PaperVariant<ButtonProps> = {
    children: "Small",
    variant: Variant.Small
}

export const Medium : PaperVariant<ButtonProps> = {
    children: "Medium",
    variant: Variant.Medium
}

export const Large : PaperVariant<ButtonProps> = {
    children: "Large",
    variant: Variant.Large
}

export const LoadingState : PaperVariant<ButtonProps> = {
    children: "Large",
    variant: Variant.Small,
    state: ButtonState.Loading,
    spinner: SPINNER.Wave
}