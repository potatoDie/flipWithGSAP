import { getRandomColor } from "./color.js";

gsap.defaults({
    ease: 'power2.inOut'
});

export const sceneAnims = {
    scaleDown() {
        const scaleProp = gsap.getProperty('#scene', 'scale')

        gsap.to('#scene', {
            scale: scaleProp * Math.sqrt(2) / 2,
            duration: 2
        })
    },
}

export const sheetAnims = {
    async flipClone(direction) {
        // Flip the clone in the outer div
        return new Promise(function (resolve, reject) {
            const animOptions = {
                transformOrigin: "99% 99%",
                duration: 1.5,
                onComplete: resolve
            };

            if (direction === 'horizontal') {
                animOptions.rotateY = 180;
            } else {
                animOptions.rotateX = -180;
            }

            gsap.to('#scene > .container > div:last-child', animOptions);
        })
    },
    moveToLeftTop() {
        // Animate position div and it's clone so after flip the whole map is centered
        gsap.to('#scene > .container > div', {
            left: 0,
            top: 0,
            duration: 1.5
        });
    },
    fadeIn(sheets) {
        gsap.fromTo(sheets, { opacity: 0 }, {
            opacity: 1,
            duration: .25,
            stagger: .05,
        })
    },
    colorize(sheets) {
        gsap.fromTo(sheets, {
            background: 'transparent',
        }, {
            background: () => getRandomColor(),
            color: () => getRandomColor(),
            duration: 2
        })
    },
    async colorizeWait(sheets) {
        return new Promise(function (resolve, reject) {
            gsap.to(sheets, {
                background: () => getRandomColor(),
                color: () => getRandomColor(),
                duration: 1,
                onComplete: resolve
            })
        });
    }
}