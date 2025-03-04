import { Paper, PaperVariant } from "@/types";
import {
    dynamicObject,
    Table,
    TableProps
} from "@zuzjs/ui";

const paper : Paper<typeof Table, TableProps<dynamicObject>> = {
    title: `Data/Table`,
    component: Table,
    propsType: {
        schema: { 
            control: "arrayobject",
        },
        rows: { 
            control: "arrayobject"
        },
        header: { 
            control: "boolean" 
        },
        hoverable: { 
            control: "boolean" 
        }
    }
}

export default paper

export const Default : PaperVariant<TableProps<dynamicObject>> = {
    schema: [
        { id: `name`, value: `Name` },
        { id: `status`, value: `Status` },
    ],
    rows: [
        { name: `Kamran Wajdani`, status: `Active` }
    ],
    header: true,
    hoverable: true
}

// export const Small : PaperVariant<ButtonProps> = {
//     children: "Small",
//     variant: Variant.Small
// }

// export const Medium : PaperVariant<ButtonProps> = {
//     children: "Medium",
//     variant: Variant.Medium
// }

// export const Large : PaperVariant<ButtonProps> = {
//     children: "Large",
//     variant: Variant.Large
// }

// export const Loading : PaperVariant<ButtonProps> = {
//     children: "Large",
//     variant: Variant.Small,
//     state: ButtonState.Loading,
//     spinner: SPINNER.Wave
// }