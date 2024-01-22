import {DEBUG} from "./startup";

export let treeIdentifiers: string[] = objectManager
    .getAllObjects('scenery_group')
    .filter(g =>
        g.identifier == 'rct2.scenery_group.scgtrees' ||
        g.identifier == 'rct2.scenery_group.scgshrub'
    )
    .reduce((result: string[], group) => result.concat(group.items), [])
    .filter(identifier => {
        return identifier != 'rct2.scenery_small.tef'// elephant fountain
            && identifier != 'rct2.scenery_small.twf' // geometric fountain
            && identifier != 'rct2.scenery_small.tstd' // dolphin statue
            && identifier != 'rct2.scenery_small.tdf' // dolphin fountain
            && identifier != 'rct2.scenery_small.tsh' // Horse Statue
            && identifier != 'rct2.scenery_small.thrs' // Horseman Statue
            // && identifier != 'rct2.scenery_small.tgs' // giraffe statue
            // && identifier != 'rct2.scenery_small.tus' // Unicorn Statue'
    })

export let installedTrees = treeIdentifiers == undefined ? [] : objectManager
    .getAllObjects('small_scenery')
    .filter(o => treeIdentifiers!.indexOf(o.identifier) > -1)
    .map(o => o.index)


if (DEBUG) {
    console.log(treeIdentifiers.length)
    console.log(installedTrees.length)
    installedTrees.forEach(object => {
        let gameObject = objectManager.getObject('small_scenery', object)
        console.log(`&& identifier != '${gameObject.identifier}' // ${gameObject.name}`)
    })
}
