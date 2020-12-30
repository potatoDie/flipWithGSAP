import { dimension } from './box.js';
import { sceneAnims, sheetAnims } from './anim.js';

const scene = document.getElementById("scene");

// Give original sheet a random color
sheetAnims.colorizeWait(document.querySelector('.sheet'))
    .then(
        () => foldOut(1)
    )

/**
 * Wrap div together with a clone in a new div. 
 * This new div will be the only direct child of the scene.
 * Calculate size of new div
 * The clone lies on top of the original
 */
function wrapDivWithClone() {
    let level = 0;

    // Select the highest level container
    let currentContainer = document.querySelector('#scene > .container');
    console.log(currentContainer);
    if (!currentContainer) {
        currentContainer = document.querySelector('#scene > .sheet');
    } else {
        // Increment data-level attribute
        level = parseInt(currentContainer.getAttribute('data-level')) + 1;
    }

    // Create new container
    const newContainer = document.createElement('div');
    newContainer.setAttribute('data-level', level);
    newContainer.className = 'container';

    // How big is currentContainer?
    const dim = dimension(currentContainer);

    // Set size of newContainer based on currentContainer
    // Twice as high or twice the width of current
    // adjust position el too, so it appears at the same place
    // Therefor it must be (absolutely) positioned
    console.log(level);
    if (level % 2) {
        newContainer.style.height = 2 * dim.height + "px";
        newContainer.style.width = dim.width + "px";

        currentContainer.style.top = (dim.height / 2) + "px"
    } else {
        newContainer.style.width = 2 * dim.width + "px";
        newContainer.style.height = dim.height + "px";

        currentContainer.style.left = (dim.width / 2) + "px"
    }

    newContainer.style.perspective = dim.width * 2 + "px";

    newContainer.appendChild(currentContainer);
    scene.appendChild(newContainer);

    const clone = currentContainer.cloneNode("deep")
    newContainer.appendChild(clone)

    // Query all new sheets (i.e. rectangles marked 'F' descendents of clone)
    const cleanSheets = clone.querySelectorAll('.sheet');

    sheetAnims.fadeIn(cleanSheets);
    if (level < 4) {
        sheetAnims.colorize(cleanSheets);
    }
}

/**
 * Create new level of sheets by creating a clone and flip the clone
 * Wait till it finishes before you fold out again
 */
async function foldOut(step) {
    if (step > 7) return;

    sceneAnims.scaleDown();

    wrapDivWithClone();

    sheetAnims.moveToLeftTop()

    // We could pass foldOut as a callback. But if we let flipCone return a promise
    // that resolves 'onComplete' we can keep foldOut to ourselves, so to speak.
    // flipCone remains ignorant
    const direction = (step % 2) ? 'horizontal' : 'vertical';

    await sheetAnims.flipClone(direction)
    foldOut(step + 1)
}