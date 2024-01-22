import {chanceNames, getSelectedIndex, setChanceByIndex} from "./persistence";
import {installedTrees} from "./trees";

export function openMenu() {
    if (typeof ui !== "undefined") {
        let window = ui.getWindow('Forrest Nothing')
        if (window != null) {
            window.bringToFront()
        } else {

            let padding = 5
            let x = padding
            let y = 12 + padding

            let labelWidth = 125
            let labelHeight = 12
            let labelWidget: LabelDesc = {
                type: "label",
                name: "label1",
                text: "handymen place trees: ",
                x: x,
                y: y,
                width: labelWidth,
                height: labelHeight,
                textAlign: 'left'
            }

            x += labelWidth + padding
            let dropdownWidth = 100
            let dropdownWidget: DropdownDesc = {
                type: 'dropdown',
                name: "dropdown1",
                x: x,
                y: y,
                width: dropdownWidth,
                height: labelHeight,
                items: chanceNames,
                onChange(index: number): void {
                    setChanceByIndex(index)
                    console.log(index)
                },
                selectedIndex: getSelectedIndex(),
                tooltip: ""
            }
            x = padding
            y += labelHeight + padding

            let labelWidget2: LabelDesc = {
                type: "label",
                name: "label2",
                text: `using ${installedTrees.length} small scenery items`,
                x: x,
                y: y,
                width: labelWidth + dropdownWidth,
                height: labelHeight,
                textAlign: 'left'
            }

            let widgets = [labelWidget, dropdownWidget, labelWidget2]

            let width = Math.max(...widgets.map(widget=> widget.x + widget.width))
            let height = Math.max(...widgets.map(widget=> widget.y + widget.height))


            ui.openWindow({
                classification: 'Forrest Nothing',
                // minWidth: 100,
                // minHeight: 125,
                width: width + padding,
                height: height + padding,
                title: 'Forrest Nothing',
                widgets: widgets,
            })
        }
    }

}