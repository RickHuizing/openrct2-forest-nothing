import {installedTrees} from "./trees";
import {openMenu} from "./Window";
import {getChance, updatePerTicks} from "./persistence";

export const DEBUG = false

function getHandyMen(): Staff[] {
    return map.getAllEntities('staff').filter(s => s.staffType == "handyman")
}

let update = 0

function doUpdate() {
    if (update++ >= updatePerTicks()) {
        if (installedTrees.length == 0) {
            update = -1000000
            return
        }
        _do_update()
        update = 0
    }
}

function _do_update() {
    let lastAction: GameActionArgs | undefined = undefined

    function executeIfNoError(result: GameActionResult) {
        function handleUnexpectedError(result: GameActionResult) {
            if (result.error != 0) {
                console.log(`TREE PLACE PLUGIN Failed to place item! Error: `)
                console.log(result)
            }
        }

        if (result.error == 0) {
            context.executeAction('smallsceneryplace', lastAction!, handleUnexpectedError)
        }

        if (DEBUG) console.log('DEBUG', result)
    }

    function randomSceneryBuildAction(handyman: Staff): SmallSceneryPlaceArgs {
        let object = installedTrees[context.getRandom(0, installedTrees.length)]
        let direction = context.getRandom(0, 4)
        let quadrant = context.getRandom(0, 4)
        if (DEBUG) {
            let gameObject = objectManager.getObject('small_scenery', object)
            console.log('place', gameObject.name, gameObject.identifier, `x: ${handyman.x} y: ${handyman.y}`)
            console.log(object, direction, quadrant)
        }
        return {
            // flags: 1 << 15,
            x: handyman.x, y: handyman.y, z: handyman.z,
            direction: direction, object: object, quadrant: quadrant,
            primaryColour: 1, secondaryColour: 1, tertiaryColour: 2
        }
    }

    getHandyMen().forEach(handyman => {
        if (context.getRandom(0, 1000) >= 1000 * getChance()) return
        lastAction = randomSceneryBuildAction(handyman)
        context.queryAction('smallsceneryplace', lastAction, executeIfNoError)
    })
}

function onClickMenuItem() {
    openMenu()
}


export function startup() {
    // Write code here that should happen on startup of the plugin.
    context.subscribe('interval.tick', doUpdate)

    // Register a menu item under the map icon:
    if (typeof ui !== "undefined") {
        ui.registerMenuItem("Forest Nothing", () => onClickMenuItem());
    }
}