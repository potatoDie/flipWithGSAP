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
        const rotateY = `rotate3d(0, 1, 0, 180deg)`;
        // Force rotation go the right way. You could also use gsap properties rotationX and -Y instead of transform
        const rotateX = `rotate3d(1, 0, 0, -179.999deg)`;

        // Flip the clone in the outer div
        return new Promise(function (resolve, reject) {
            gsap.to('#scene > div > div:last-child', {
                transformOrigin: "99% 99%",
                transform: direction === 'horizontal' ? rotateY : rotateX,
                duration: 2.5,
                onComplete: resolve
            })
        })
    },
    moveToLeftTop() {
        // Animate position div and it's clone so after flip the whole map is centered
        gsap.to('#scene > div > div', {
            left: 0,
            top: 0,
            duration: 1.5
        });
    },
    fadeIn(sheets) {
        console.log(sheets);
        gsap.fromTo(sheets, { opacity: 0 }, {
            opacity: 1,
            duration: 1
            // duration: (index, target, targets) => 2 + index / targets.length + Math.random(),
            // stagger: (index, target, targets) => (index + 2) / targets.length,
            //     repeat: -1,
            //     yoyo: true,
            //     repeatDelay: 2 + step,
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